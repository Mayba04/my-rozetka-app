import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/home/HomePage'
import NoMatchPage from './components/404/NoMatchPage'
import MainMenu from './components/menu/MainMenu'
import CreateCategory from './components/Category/AddCategoryForm'



const App = () => {
  return (
    <>
     <MainMenu />
     <Routes>
      <Route path="/">
        <Route index element={<HomePage/>}/>
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="*" element={<NoMatchPage/>}/>
      </Route>
     </Routes>
    </>
  )
}

export default App
