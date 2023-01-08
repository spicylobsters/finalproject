import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import GeekLayout from './pages/Layout'
import Login from '@/pages/Login'
import 'antd/dist/reset.css'
import { AuthRoute } from './components/AuthRoute'
import './App.css'
import Home from './pages/Home'
import Article from './pages/Article'
import Publish from './pages/Publish'


function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<AuthRoute><GeekLayout /></AuthRoute>}>

            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
