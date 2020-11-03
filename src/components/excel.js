import { Upload, Button } from 'antd';
import React from 'react';
import * as XLSX from 'xlsx';
import clienteAxios from '../config/axios';

class GetDataFromExcelJusTInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hoja: '',
			hojas: [],
			file: false,
			fileList: [
				{
					uid: '-1',
					name: 'xxx.png',
					status: 'done',
					url: 'http://www.baidu.com/xxx.png'
				}
			]
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.enviarDatos = this.enviarDatos.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		const this2 = this;
		this.setState({
			[name]: value
		});
		let hojas = [];
		if (name === 'file') {
			let reader = new FileReader();
			reader.readAsArrayBuffer(target.files[0]);
			reader.onloadend = (e) => {
				var data = new Uint8Array(e.target.result);
				var workbook = XLSX.read(data, { type: 'array' });

				workbook.SheetNames.forEach(function(sheetName) {
					// Here is your object
					var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
					hojas.push({
						data: XL_row_object,
						sheetName
					});
				});
				this2.setState({
					selectedFileDocument: target.files[0],
					hojas
				});
			};
		}
		console.log(hojas);
	}

	enviarDatos() {
    const token = localStorage.getItem('token');
		clienteAxios
			.post(
				'/productos/inventario/excel/',
				this.state
					.hojas[0] , {
				headers: {
					Authorization: `bearer ${token}`
				}
			}
			)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		const { handleInputChange } = this;

		const { enviarDatos } = this;

		return (
			<div className="mr-5">
				<input
            class=""
            required
            type="file"
            name="file"
            id="file"
            onChange={handleInputChange}
            placeholder="Archivo de excel"
          />
         {/*  <label class="custom-file-label" for="file" data-browse="Buscar">
            Selecciona un archivo...
          </label> */}
          <Button type="primary" htmlType="button" className="d-inline mr-5" onClick={enviarDatos}>
            Enviar
          </Button>
			</div>
		);
	}
}

export default GetDataFromExcelJusTInput;
