import crypto from 'crypto';

export function hashIP(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip;
  if (ip) {
    const hash = crypto.createHash('sha256').update(ip).digest('hex');
    req.ipHash = hash;
  } else {
    req.ipHash = 'unknown';
  }
  next();
}
