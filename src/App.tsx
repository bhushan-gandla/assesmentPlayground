import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import CheckList from './pages/checkList'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/checklist' element={<CheckList/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
