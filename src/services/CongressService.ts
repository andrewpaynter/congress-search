import axios from "axios"
import ChartData from "../models/chartData"
import Congressperson from "../models/congressperson"
const { CONGRESS_API_PATH } = process.env

class CongressService {
  // http = axios.create({
  //   baseURL: 'http://localhost:8000/api' 
  //   //CONGRESS_API_PATH
  // })

  async getCongressData(chartData: ChartData) {
    const response = await axios.get<Congressperson[]>(
      'http://localhost:8000/api/congress',
      {params: chartData}
      )
    return response.data
  }
}

export default new CongressService()