import * as echarts from 'echarts'
import { useRef, useEffect } from 'react'

function Bar ({ title, xData, yData, style }) {
  const newRef = useRef()

  const chartInit = () => {
    const myChart = echarts.init(newRef.current)
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: yData
        }
      ]
    })
  }

  useEffect(() => { chartInit() }, [])

  return <div>
    <div ref={newRef} style={style}>


    </div>
  </div>
}

export default Bar