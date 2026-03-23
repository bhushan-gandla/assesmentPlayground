import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import NewsFeed from './pages/newsFeed'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/newsFeed' element={<NewsFeed/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
