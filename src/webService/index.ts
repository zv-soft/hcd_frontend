import axios from 'axios'

let webService = axios.create({
  baseURL:import.meta.env.VITE_API_URL
})

// let webService = axios.create({
//   baseURL:'https://uniandes.nomadadigitaldev.com.ar/api/v1/'
// })

export default webService