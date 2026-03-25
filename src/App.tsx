import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Pokemon from './pages/pokemon'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/pokemon' element={<Pokemon/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
