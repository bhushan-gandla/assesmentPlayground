import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import InfiniteScroll from './pages/infiniteScroll'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/infinteScroll' element={<InfiniteScroll/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
