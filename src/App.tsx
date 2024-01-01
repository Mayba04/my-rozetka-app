import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/home/HomePage';
import NoMatchPage from './components/404/NoMatchPage';
import MainMenu from './components/menu/MainMenu';
import CreateCategory from './components/Category/AddCategoryForm';
import EditCategory from './components/Category/EditCategoryPage';
import RegisterUser from './components/Auth/RegisterPage';

const App = () => {
  return (
    <>
      <MainMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/edit-category/:categoryId" element={<EditCategory />} />
        <Route path='/sign-up' element={<RegisterUser/>}/>
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </>
  );
};

export default App;
