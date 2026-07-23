import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback_secret';
export const ADMIN_SESSION_DURATION = 1800; // 30 min in seconds

export function generateToken(payload) {
  return jwt.sign(payload, SESSION_SECRET, { expiresIn: ADMIN_SESSION_DURATION });
}

export function verifyToken(req, res, next) {
  try {
    let token = req.cookies?.session_token;
    
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, SESSION_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
