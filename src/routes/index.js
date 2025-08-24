import { Router } from 'express';
import empleadoRoutes from './empleado.routes.js';

const router = Router();

router.get('/', (req, res) => {
	res.json({message: 'Servidor funcionando correctamente'});
});
router.use('/empleado', empleadoRoutes);

export default router;