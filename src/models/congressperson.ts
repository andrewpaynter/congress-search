export default interface Congressperson {
  id: number,
  image?: string,
  name: string,
  title: 'Senator' | 'Congressman' | 'Congresswoman',
  party: string,
  state: string,
  yearsServed: number,
}