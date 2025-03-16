import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { DecodedToken } from '../../common/jwt.js';



function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as DecodedToken;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
    return
  }
}

export default authenticateJWT;