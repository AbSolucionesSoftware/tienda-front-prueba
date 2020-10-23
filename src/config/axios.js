import axios from 'axios'

const clienteAxios = axios.create({
    baseURL : "https://cafi-back.herokuapp.com/api"
})

export default clienteAxios