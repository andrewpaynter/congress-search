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
    const config = {
      headers: {
        "Access-Control-Allow-Origin" : 'https://congress-searcher.herokuapp.com/'
      }
    }
    const response = await axios.get<Congressperson[]>(url, config)
    this.finalPage = response.headers.finalitem === 'true'
    return response.data
  }
}

export default new CongressService()