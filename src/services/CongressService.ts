import axios from "axios"
import ChartData from "../models/chartData"
import Congressperson from "../models/congressperson"
import {stringify} from 'query-string'

class CongressService {
  // http = axios.create({
  //   baseURL: 'http://localhost:8000/api' 
  //   //CONGRESS_API_PATH
  // })

  async getCongressData(chartData: ChartData) {
    let url: string = `http://localhost:8000/api/congress?${stringify(chartData)}`
    console.log(url)
    const response = await axios.get<Congressperson[]>(url)
    return response.data
  }
}

export default new CongressService()