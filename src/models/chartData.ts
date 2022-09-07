import Congressperson from "./congressperson";

export default interface ChartData {
  currPage: number,
  limit: number,
  offset: number,
  sortBy: keyof Congressperson,
  filter: string
}