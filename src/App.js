import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import Login from '@/pages/Login'
import 'antd/dist/reset.css'

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
