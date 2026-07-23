import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken, ADMIN_SESSION_DURATION } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    const hash = process.env.ADMIN_PASSWORD_HASH;
    
    if (!password || !hash) {
      return res.status(401).json({ error: 'Invalid credentials or setup missing' });
    }
    
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken({ role: 'admin' });
    
    res.cookie('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: ADMIN_SESSION_DURATION * 1000,
      sameSite: 'strict'
    });
    
    res.json({ success: true, message: 'Logged in successfully' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('session_token');
  res.json({ success: true, message: 'Logged out successfully' });
});

router.post('/setup', async (req, res) => {
  try {
    if (process.env.ADMIN_PASSWORD_HASH) {
      return res.status(403).json({ error: 'Admin hash is already set in .env' });
    }
    
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    
    const hash = await bcrypt.hash(password, 10);
    res.json({ 
      success: true, 
      message: 'Hash generated. Please add this to your .env file as ADMIN_PASSWORD_HASH',
      hash 
    });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
