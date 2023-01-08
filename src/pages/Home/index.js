import Bar from "@/components/Bar"

const Home = () => {

  return <div>
    <Bar
      style={{ width: '500px', height: '400px' }}
      xData={['vue', 'angular', 'react']}
      yData={[50, 60, 70]}
      title='三大框架满意度' />
    <Bar
      style={{ width: '300px', height: '200px' }}
      xData={['vue', 'angular', 'react']}
      yData={[50, 60, 70]}
      title='三大框架满意度2' />
  </div>
}
export default Home