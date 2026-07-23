import express from 'express';
import { supabase } from '../utils/supabase.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
router.use(verifyToken);

router.get('/suggestions', async (req, res) => {
  try {
    const { data: suggestions, error } = await supabase.from('suggestions').select('*');
    if (error) throw error;
    
    const total = suggestions.length;
    
    // Simple aggregation
    const deptCounts = {};
    const gameCounts = {};
    
    suggestions.forEach(s => {
      if (s.department_name) {
        deptCounts[s.department_name] = (deptCounts[s.department_name] || 0) + 1;
      }
      if (s.game_1) gameCounts[s.game_1] = (gameCounts[s.game_1] || 0) + 1;
      if (s.game_2) gameCounts[s.game_2] = (gameCounts[s.game_2] || 0) + 1;
    });
    
    const topDepartment = Object.entries(deptCounts).sort((a, b) => b[1] - a[1])[0] || null;
    const topGames = Object.entries(gameCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(g => ({ game: g[0], count: g[1] }));
    
    // Map database snake_case fields to frontend camelCase
    const mappedSuggestions = suggestions.map(s => ({
      id: s.id,
      departmentName: s.department_name,
      game1: s.game_1,
      game2: s.game_2,
      ipHash: s.ip_hash,
      createdAt: s.created_at
    }));

    res.json({ 
      data: mappedSuggestions, 
      total, 
      topDepartment: topDepartment ? topDepartment[0] : 'N/A', 
      topGames, 
      suggestions: mappedSuggestions 
    });
  } catch (error) {
    console.error('Suggestions fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

router.get('/nominations', async (req, res) => {
  try {
    const { category } = req.query;
    let query = supabase.from('nominations').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data: nominations, error } = await query;
    if (error) throw error;
    
    // Map database snake_case to frontend keys expected by NominationsLeaderboard
    const mappedNominations = nominations.map(n => ({
      id: n.id,
      category: n.category,
      name: n.nominated_person, // Frontend expects 'name'
      ipHash: n.ip_hash,
      createdAt: n.created_at
    }));

    res.json({ data: mappedNominations });
  } catch (error) {
    console.error('Nominations fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch nominations' });
  }
});

// Match frontend API path '/admin/duplicates'
router.get('/duplicates', async (req, res) => {
  try {
    const { data: nominations, error } = await supabase.from('nominations').select('category, nominated_person');
    if (error) throw error;
    
    const counts = {};
    nominations.forEach(n => {
      const key = `${n.category}::${n.nominated_person}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    
    // Convert exact duplicates into the format expected by DuplicateAlerts.jsx
    const duplicates = Object.entries(counts)
      .filter(([_, count]) => count > 1)
      .map(([key, count]) => {
        const [category, nominatedPerson] = key.split('::');
        return { 
          category, 
          originalName: nominatedPerson, 
          matchName: nominatedPerson, 
          confidence: 100,
          count 
        };
      })
      .sort((a, b) => b.count - a.count);
      
    res.json({ data: duplicates });
  } catch (error) {
    console.error('Duplicates fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch duplicates' });
  }
});

// Fallback compatibility route
router.get('/nominations/duplicates', async (req, res) => {
  try {
    const { data: nominations, error } = await supabase.from('nominations').select('category, nominated_person');
    if (error) throw error;
    
    const counts = {};
    nominations.forEach(n => {
      const key = `${n.category}::${n.nominated_person}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    
    const duplicates = Object.entries(counts)
      .filter(([_, count]) => count > 1)
      .map(([key, count]) => {
        const [category, nominatedPerson] = key.split('::');
        return { category, nominatedPerson, count };
      })
      .sort((a, b) => b.count - a.count);
      
    res.json(duplicates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch duplicates' });
  }
});

router.get('/businesses', async (req, res) => {
  try {
    const { search } = req.query;
    let query = supabase.from('businesses').select('*');
    
    if (search) {
      query = query.or(`student_name.ilike.%${search}%,business_description.ilike.%${search}%`);
    }
    
    const { data: businesses, error } = await query;
    if (error) throw error;
    
    const mappedBusinesses = businesses.map(b => ({
      id: b.id,
      name: b.student_name,
      description: b.business_description,
      ipHash: b.ip_hash,
      createdAt: b.created_at
    }));

    res.json({ data: mappedBusinesses });
  } catch (error) {
    console.error('Businesses fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
});

router.post('/export', async (req, res) => {
  try {
    const [sugRes, nomRes, busRes] = await Promise.all([
      supabase.from('suggestions').select('*'),
      supabase.from('nominations').select('*'),
      supabase.from('businesses').select('*')
    ]);
    
    if (sugRes.error || nomRes.error || busRes.error) {
      throw new Error('Database fetch error');
    }
    
    let csv = 'Type,ID,Field1,Field2,Field3,CreatedAt\n';
    
    sugRes.data.forEach(s => {
      csv += `Suggestion,${s.id},${s.department_name || ''},${s.game_1 || ''},${s.game_2 || ''},${s.created_at || ''}\n`;
    });
    nomRes.data.forEach(n => {
      csv += `Nomination,${n.id},${n.category || ''},${n.nominated_person || ''},,${n.created_at || ''}\n`;
    });
    busRes.data.forEach(b => {
      csv += `Business,${b.id},${b.student_name || ''},"${(b.business_description || '').replace(/"/g, '""')}",,${b.created_at || ''}\n`;
    });
    
    res.header('Content-Type', 'text/csv');
    res.attachment('export.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export data' });
  }
});

router.post('/reset', async (req, res) => {
  try {
    if (!req.body.confirm) {
      return res.status(400).json({ error: 'Confirmation required' });
    }
    
    await Promise.all([
      supabase.from('suggestions').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
      supabase.from('nominations').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
      supabase.from('businesses').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    ]);
    
    res.json({ success: true, message: 'All data has been reset' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset data' });
  }
});

export default router;
