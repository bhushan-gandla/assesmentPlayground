import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Throttle from './pages/throttle'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/throttle' element={<Throttle/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
