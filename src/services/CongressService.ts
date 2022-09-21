import axios from "axios"
import ChartData from "../models/chartData"
import Congressperson from "../models/congressperson"
import {stringify} from 'query-string'

class CongressService {
  finalPage: boolean

  constructor() {
    this.finalPage = false
  }
  async getCongressData(chartData: ChartData) {
    let url: string = `https://congress-searcher-api.herokuapp.com/api/congress?${stringify(chartData)}`
    const response = await axios.get<Congressperson[]>(url, {withCredentials: true})
    this.finalPage = response.headers.finalitem === 'true'
    return response.data
  }
}

export default new CongressService()