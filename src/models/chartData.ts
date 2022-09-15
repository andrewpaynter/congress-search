export default interface ChartData {
  currPage: number,
  limit: number,
  offset: number,
  sortBy: 'name' | 'title' | 'party' | 'state' | 'yearsServed',
  sortReverse: boolean,
  filter: string
}