import { db } from '../config/firebase.js';

const collection = db.collection('empleados');

export default class EmpleadoRepository {
	static async findByUser(usuario){
		const user = await collection.where('usuario', '==', usuario).get();
		return user.empty ? null : { id: user.docs[0].id, ...user.docs[0].data() };
	}
	static async findByFullName(nombre, apaterno, amaterno) {
		const user = await collection
			.where('nombre', '==', nombre)
			.where('apaterno', '==', apaterno)
			.where('amaterno', '==', amaterno)
			.get();
			return user.empty ? null : { id: user.docs[0].id, ...user.docs[0].data() };
	}
	static async create(id, data) {
		return collection.doc(id).set(data);
	}
	static async update(id, data) {
		return collection.doc(id).update(data);
	}
	static async getAll() {
		const empleados = await collection.where('isActive', '==', true).get();
		return empleados.docs.map((empleado) => ({ id: empleado.id, ...empleado.data() }));
	}

	static async getById(id) {
		const empleados = await collection.doc(id).get();
		return doc.exists ? { id: empleados.id, ...empleados.data() } : null;
}
}