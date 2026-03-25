import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import TaskManager from './pages/taskManager'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/taskManager' element={<TaskManager/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
