import EmpleadoService from '../services/empleado.service.js';

const empleadoService = new EmpleadoService();

class EmpleadoController {
	async create (req, res) {
		try {
			const data = req.body;
			const empleado = await empleadoService.create(data);
			res.status(201).json(empleado);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
	async getAll (req, res) {
		try {
			const empleados = await empleadoService.getAll();
			res.status(201).json(empleados);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
	async getById (req, res) {
		try {
			const { id } = req.params;
			const empleado = await empleadoService.getById(id);
			if (!empleado) {
				return res.status(404).json({ error: 'Empleado no encontrado' });
			}
			res.status(201).json(empleado);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
	async update (req, res) {
		try {
			const { id } = req.params;
			const data = req.body;
			const empleado = await empleadoService.update(id, data);
			if (!empleado) {
				return res.status(404).json({ error: 'Empleado no encontrado' });
			}
			res.status(201).json(empleado);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
	async delete (req, res) {
		try {
			const { id } = req.params;
			await empleadoService.delete(id);
			res.status(201).json({ message: 'Empleado eliminado' });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
	async login (req, res) {
		try {
			const { usuario, password } = req.body;
			const token = await empleadoService.login(usuario, password);
			res.status(201).json(token);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
	async logout (req, res) {
		try {
			const userId = req.user.id;
			await empleadoService.logout(token);
			res.status(201).json({ message: 'Sesión cerrada' });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
}
export default new EmpleadoController();