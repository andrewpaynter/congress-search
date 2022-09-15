import ChartData from "../models/chartData";

interface SearchBarProps {
  chartData: ChartData,
  setChartData: React.Dispatch<React.SetStateAction<ChartData>>,
  CongressService: {finalPage: boolean},
}

const PageOptions = ({chartData, setChartData, CongressService}:SearchBarProps) => {
  const nextPage  = () => {
    if (!CongressService.finalPage)
      setChartData({
        ...chartData, 
        currPage: chartData.currPage + 1,
        offset: (chartData.currPage) * chartData.limit
      })
  }
  const prevPage  = () => {
    if (chartData.currPage > 1)
      setChartData({
        ...chartData, 
        currPage: chartData.currPage - 1,
        offset: (chartData.currPage - 2) * chartData.limit
      })
  }
  const handleLimitChange = (value: string) => {
    setChartData({
      ...chartData, 
      limit: parseInt(value, 10)})
  }
  return (
    <div className='h-12 mt-4 flex justify-between'>
        <select 
          className='text-xl'
          name='Results Per Page'
          value={chartData.limit}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => handleLimitChange(e.target.value)}
          >
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <div className='flex items-center'>
          {(chartData.currPage > 1) ? 
            <button 
              className='bg-slate-200 p-2 rounded-md h-full hover:bg-blue-300 mr-2' 
              onClick={prevPage} >
            Back
            </button> : null}
          <h2 className='mr-2 text-2xl'>{chartData.currPage}</h2>
          {!CongressService.finalPage ? 
          <button 
            className='bg-slate-200 p-2 rounded-md h-full hover:bg-blue-300' 
            onClick={nextPage}>
          Next
          </button> : null}
        </div>
      </div>
  );
};

export default PageOptions;