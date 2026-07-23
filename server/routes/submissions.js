import express from 'express';
import crypto from 'crypto';
import { supabase } from '../utils/supabase.js';
import { validateSubmission, sanitizeInput } from '../utils/validators.js';
import { hashIP } from '../middleware/ipHash.js';
import { rateLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/', hashIP, rateLimiter, async (req, res) => {
  try {
    const { suggestions, nominations, business } = req.body;
    const ipHash = req.ipHash;
    
    const validation = validateSubmission(req.body);
    if (!validation.isValid) {
      console.log('Validation failed for submission:', validation.errors, 'Body received:', JSON.stringify(req.body, null, 2));
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }
    
    const isMock = !process.env.SUPABASE_URL || process.env.SUPABASE_URL.includes('xxxxx') || process.env.SUPABASE_URL.includes('placeholder');
    
    if (!isMock) {
      // Insert suggestions
      if (suggestions && (suggestions.departmentName || suggestions.game1 || suggestions.game2)) {
        const { error } = await supabase.from('suggestions').insert({
          ip_hash: ipHash,
          department_name: sanitizeInput(suggestions.departmentName),
          game_1: sanitizeInput(suggestions.game1),
          game_2: sanitizeInput(suggestions.game2)
        });
        if (error) throw new Error('DB Error suggestions: ' + error.message);
      }
      
      // Insert nominations
      if (nominations && nominations.length > 0) {
        const sanitizedNoms = nominations
          .filter(n => n.nominatedPerson && n.nominatedPerson.trim().length > 0)
          .map(n => ({
            ip_hash: ipHash,
            category: n.category,
            nominated_person: sanitizeInput(n.nominatedPerson)
          }));
          
        if (sanitizedNoms.length > 0) {
          const { error } = await supabase.from('nominations').insert(sanitizedNoms);
          if (error && error.code !== '23505') throw new Error('DB Error nominations: ' + error.message);
        }
      }
      
      // Insert business
      if (business && (business.studentName || business.businessDescription)) {
        const { error } = await supabase.from('businesses').insert({
          ip_hash: ipHash,
          student_name: sanitizeInput(business.studentName),
          business_description: sanitizeInput(business.businessDescription)
        });
        if (error) throw new Error('DB Error business: ' + error.message);
      }
    } else {
      console.log('[Demo Mode] Submission received:', { suggestions, nominations, business });
    }
    
    res.status(201).json({ success: true, message: "Submission recorded" });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Failed to record submission', details: error.message || error.toString(), stack: error.stack });
  }
});

export default router;
