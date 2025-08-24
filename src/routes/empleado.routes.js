import { Router } from 'express';
import empleadoController from '../controllers/empleado.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

// Rutas para empleados
router.post('/login', (req, res) => empleadoController.login(req, res));
router.post('/create', (req, res) => empleadoController.create(req, res));
router.post('/logout', verifyToken, (req, res) => empleadoController.logout(req, res));
router.get('/', verifyToken, (req, res) => empleadoController.getAll(req, res));
router.put('/update/:id', verifyToken, requireRole(['admin']), (req, res) => empleadoController.update(req, res));
router.delete('/delete/:id', verifyToken, requireRole(['admin']), (req, res) => empleadoController.delete(req, res));

export default router;