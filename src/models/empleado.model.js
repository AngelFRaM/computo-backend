export default class EmpleadoModel {
	constructor(data) {
		this.id = id;
		this.nombre = data.nombre;
		this.apaterno = data.apaterno;
		this.amaterno = data.amaterno;
		this.direccion = data.direccion;
		this.telefono = data.telefono;
		this.ciudad = data.ciudad;
		this.estado = data.estado;
		this.email = data.email;
		this.usuario = data.usuario;
		this.password = data.password;
		this.rol = data.rol || 'empleado';
		this.isActive = data.isActive ?? true;
		this.activeToken = null;
	}
}