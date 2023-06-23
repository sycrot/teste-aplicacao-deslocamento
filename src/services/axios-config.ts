import axios from "axios";
const URL = 'https://api-deslocamento.herokuapp.com/'

const app = axios.create({
  baseURL: URL
})

export default app