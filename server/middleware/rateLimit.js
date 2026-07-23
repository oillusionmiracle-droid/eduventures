const rateLimitStore = new Map();

// Clean up expired entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 15 * 60 * 1000);

export function rateLimiter(req, res, next) {
  const ipHash = req.ipHash || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxSubmissions = 10;

  if (rateLimitStore.has(ipHash)) {
    const record = rateLimitStore.get(ipHash);
    if (now < record.resetTime) {
      if (record.count >= maxSubmissions) {
        return res.status(429).json({ error: "Too many submissions. Please try again later." });
      }
      record.count += 1;
    } else {
      rateLimitStore.set(ipHash, { count: 1, resetTime: now + windowMs });
    }
  } else {
    rateLimitStore.set(ipHash, { count: 1, resetTime: now + windowMs });
  }

  next();
}
