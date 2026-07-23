import express from 'express';
import { supabase } from '../utils/supabase.js';
import { verifyToken } from '../middleware/auth.js';
import { analyzeDuplicates, extractThemes, analyzeTrends } from '../utils/claude.js';

const router = express.Router();
router.use(verifyToken);

router.post('/analyze', async (req, res) => {
  try {
    const { data: nominations, error } = await supabase.from('nominations').select('category, nominated_person');
    if (error) throw error;
    
    const [duplicatesRes, trendsRes] = await Promise.all([
      analyzeDuplicates(nominations),
      analyzeTrends(nominations)
    ]);
    
    res.json({ duplicates: duplicatesRes, trends: trendsRes });
  } catch (error) {
    res.status(500).json({ error: 'AI analysis failed' });
  }
});

router.get('/duplicates', async (req, res) => {
  try {
    const { data: nominations, error } = await supabase.from('nominations').select('category, nominated_person');
    if (error) throw error;
    
    const result = await analyzeDuplicates(nominations);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch duplicates' });
  }
});

router.get('/themes', async (req, res) => {
  try {
    const { data: suggestions, error: err1 } = await supabase.from('suggestions').select('department_name, game_1, game_2');
    const { data: businesses, error: err2 } = await supabase.from('businesses').select('student_name, business_description');
    
    if (err1 || err2) throw new Error('Database error');
    
    const [suggestionThemes, businessThemes] = await Promise.all([
      extractThemes(suggestions, 'suggestions'),
      extractThemes(businesses, 'businesses')
    ]);
    
    res.json({ suggestionThemes, businessThemes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch themes' });
  }
});

export default router;
