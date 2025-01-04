import './App.css'
import AdminBoard from './components/admins/AdminBoard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/admins/Login'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<Login />}></Route>
          <Route path='admin/dasboard' element={<AdminBoard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
