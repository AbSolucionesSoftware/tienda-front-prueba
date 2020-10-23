import React, { useState, useEffect } from 'react';
import { Button, Form, Divider, notification, Spin, Input, Row, Col } from 'antd';
import clienteAxios from '../../../../config/axios';

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};

const tailLayout = {
	wrapperCol: { offset: 10 }
};

export default function DatosCliente(props) {
	const [ loading, setLoading ] = useState(false);
	const [ form ] = Form.useForm();
	const { token, clienteID } = props;
	const [ controlBoton, setControlBoton ] = useState(true);

	async function obtenerDatosUser() {
		setLoading(true);
		await clienteAxios
			.get(`/cliente/${clienteID}`, {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                if(res.data.direccion.length !== 0){
                    form.setFieldsValue({
                        nombre: res.data.nombre,
                        apellido: res.data.apellido,
                        email: res.data.email,
                        telefono: res.data.telefono,
                        calle_numero: res.data.direccion[0].calle_numero,
                        entre_calles: res.data.direccion[0].entre_calles,
                        cp: res.data.direccion[0].cp,
                        colonia: res.data.direccion[0].colonia,
                        ciudad: res.data.direccion[0].ciudad,
                        estado: res.data.direccion[0].estado,
                        pais: res.data.direccion[0].pais
                    });
                }else{
                    form.setFieldsValue({
                        nombre: res.data.nombre,
                        apellido: res.data.apellido,
                        email: res.data.email,
                        telefono: res.data.telefono,
                        calle_numero: '',
                        entre_calles: '',
                        cp: '',
                        colonia: '',
                        ciudad: '',
                        estado: '',
                        pais: ''
                    });
                }
				
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}

	async function editarDatos(valores) {
		if (controlBoton) {
			setControlBoton(false);
		} else {
            setLoading(true);
			await clienteAxios
				.put(`/cliente/${clienteID}`, valores, {
					headers: {
						Authorization: `bearer ${token}`
					}
				})
				.then((res) => {
					localStorage.setItem('token', res.data.token);
                    setLoading(false);
			        setControlBoton(true);
					notification.success({
						message: 'Hecho!',
						description: res.data.message,
						duration: 2
					});
				})
				.catch((res) => {
					setLoading(false);
					if (res.response.status === 404 || res.response.status === 500) {
						notification.error({
							message: 'Error',
							description: `${res.response.data.message}`,
							duration: 2
						});
					} else {
						notification.error({
							message: 'Error',
							description: 'Error de conexion',
							duration: 2
						});
					}
				});
		}
	}

	useEffect(() => {
		obtenerDatosUser();
	}, []);

	return (
		<Spin spinning={loading} className="border">
			<Form {...layout} form={form} onFinish={editarDatos}>
				<Row>
					<Col>
						<Form.Item label="Nombre" name="nombre" >
							<Form.Item
								rules={[ { required: true, message: 'Nombre obligatorio' } ]}
								noStyle
								name="nombre"
							>
								<Input name="nombre" placeholder="Nombre" disabled={controlBoton} />
							</Form.Item>
						</Form.Item>
						<Form.Item label="Apellido" name="apellido" >
							<Form.Item
								rules={[ { required: true, message: 'Apellidos obligatorios' } ]}
								noStyle
								name="apellido"
							>
								<Input name="apellido" placeholder="Apellidos" disabled={controlBoton} />
							</Form.Item>
						</Form.Item>
					</Col>
					<Col>
						<Form.Item label="Email" name="email" >
							<Form.Item
								rules={[ { required: true, message: 'Correo electronico obligatorio' } ]}
								noStyle
								name="email"
							>
								<Input name="email" placeholder="Correo electronico" disabled />
							</Form.Item>
						</Form.Item>
						<Form.Item label="Teléfono" name="telefono" >
							<Form.Item
								rules={[ { required: true, message: 'Telefono obligatorio' } ]}
								noStyle
								name="telefono"
							>
								<Input name="telefono" placeholder="telefono" disabled={controlBoton} />
							</Form.Item>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Divider>Datos de envío</Divider>
					<Col>
						<Form.Item label="Calle y número" name="calle_numero" >
							<Form.Item
								rules={[ { required: true, message: 'Direccion obligatoria' } ]}
								noStyle
								name="calle_numero"
							>
								<Input name="calle_numero" placeholder="Calle y numero de calle" disabled={controlBoton} />
							</Form.Item>
						</Form.Item>
						<Form.Item label="Entre calles" name="entre_calles" >
							<Form.Item
								rules={[ { required: true, message: 'Referencia obligatoria' } ]}
								noStyle
								name="entre_calles"
							>
								<Input name="entre_calles" placeholder="Calles de referencia" disabled={controlBoton} />
							</Form.Item>
						</Form.Item>
						<Form.Item label="Código postal" name="cp" >
							<Form.Item
								rules={[ { required: true, message: 'Codigo postal obligatorio' } ]}
								noStyle
								name="cp"
							>
								<Input name="cp" placeholder="Codigo Postal" disabled={controlBoton} />
							</Form.Item>
						</Form.Item>
						<Form.Item label="Colonia" name="colonia" >
							<Form.Item
								rules={[ { required: true, message: 'Colonia obligatoria' } ]}
								noStyle
								name="colonia"
							>
								<Input name="colonia" placeholder="Colonia" disabled={controlBoton} />
							</Form.Item>
						</Form.Item>
					</Col>
					<Col>
						<Form.Item label="Ciudad" name="ciudad" >
							<Form.Item
								rules={[ { required: true, message: 'Localidad obligatoria' } ]}
								noStyle
								name="ciudad"
							>
								<Input name="ciudad" placeholder="Localidad" disabled={controlBoton} />
							</Form.Item>
						</Form.Item>
						<Form.Item label="Estado" name="estado" >
							<Form.Item
								rules={[ { required: true, message: 'Estado obligatoria' } ]}
								noStyle
								name="estado"
							>
								<Input name="estado" placeholder="Estado" disabled={controlBoton} />
							</Form.Item>
						</Form.Item>
						<Form.Item label="País" name="pais" >
							<Form.Item rules={[ { required: true, message: 'País obligatoria' } ]} noStyle name="pais">
								<Input name="pais" placeholder="País" disabled={controlBoton} />
							</Form.Item>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item {...tailLayout}>
					<Button htmlType="submit" type="default" size="large" style={{ width: 150 }} >
						{controlBoton ? 'Editar datos' : 'Guardar'}
					</Button>
				</Form.Item>
			</Form>
		</Spin>
	);
}
