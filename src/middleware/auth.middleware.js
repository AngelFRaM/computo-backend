import jwt from 'jsonwebtoken';
import EmpleadoRepository from '../repositories/empleado.repository.js';
import dotenv from 'dotenv';
dotenv.config();

const empleadoRepository = new EmpleadoRepository();

export const verifyToken = async (req, res, next) => {
  const headerToken = req.headers['authorization'];
  if (!headerToken) {
    return res.status(401).json({ error: 'Token Requerido!' });
  }

  try {
    const token = headerToken.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const empleado = await empleadoRepository.getById(decoded.id);
    if (!empleado || empleado.activeToken !== token) {
      return res.status(404).json({ message: 'Sesion invalida!' });
    }
    req.user = decoded;
    next();
  } catch (error) {
      return res.status(403).json({ error: 'Prohibido!' });
  }
}

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acceso denegado!' });
    }
    next();
  }
}