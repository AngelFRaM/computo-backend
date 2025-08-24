import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from "uuid";
import dotenv from "dotenv";
dotenv.config();

import EmpleadoRepository from "../repositories/empleado.repository.js";
import EmpleadoModel from "../models/empleado.model.js";

const empleadoRepository = new EmpleadoRepository(EmpleadoModel);

export default class EmpleadoService {
	async createEmpleado(data) {
		const existsUser = await empleadoRepository.findByUser(data.usuario);
		if (existsUser) {
			throw new Error("El usuario ya existe.");
		}
		const existFullName = await empleadoRepository.findByFullName(data.nombre, data.apaterno, data.amaterno);
		if (existFullName) {
			throw new Error("El nombre completo ya está en uso.");
		}
		data.password = await bcrypt.hash(data.password, 10);

		const newEmpleado = new EmpleadoModel(data);
		const id = uuidv4();

		return empleadoRepository.create(id, newEmpleado);
	}

	async login(usuario, password) {
		const empleado = await empleadoRepository.findByUser(usuario);
		if (!existsUser) {
			throw new Error("Usuario no existe.");
		}
		const passwordValid = await bcrypt.compare(password, empleado.password);
		if (!passwordValid) {
			throw new Error("Contraseña incorrecta.");
		}

		if (existsUser.activeToken) {
			try {
				jwt.verify(empleado.activeToken, process.env.JWT_SECRET);
				throw new Error("El usuario ya ha iniciado sesión.");
			} catch (error) {
				console.error("Error al verificar el token:", error);
			}
		}
		const token = jwt.sign({
			id: existsUser.id,
			nombre: existsUser.nombre,
			apaterno: existsUser.apaterno,
			amaterno: existsUser.amaterno,
			rol: existsUser.rol
		}, process.env.JWT_SECRET, { expiresIn: '1h' });

		await empleadoRepository.update(existsUser.id, { activeToken: token });
		return { token };
	}
	getAll() {
		return empleadoRepository.getAll();
	}
	getById(id) {
		return empleadoRepository.getById(id);
	}
	update(id, data) {
		return empleadoRepository.update(id, data);
	}
	delete(id) {
		return empleadoRepository.update(id, { isActive: false });
	}
	logout(id) {
		return empleadoRepository.update(id, { activeToken: null });
	}
}