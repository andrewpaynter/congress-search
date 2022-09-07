import axios from "axios"
import ChartData from "../models/chartData"
import Congressperson from "../models/congressperson"
const { CONGRESS_API_PATH } = process.env

class CongressService {
  http = axios.create({
    baseURL: CONGRESS_API_PATH
  })

  async getCongressData(chartData: ChartData) {
    const response = await this.http.get<Congressperson[]>('/congress')
    return response.data
  }
}

export default new CongressService()