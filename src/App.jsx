// src/App.jsx or wherever you define routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../component/PrivateRoute';
import Home from '../pages/Home';
import { LoginPage } from '../pages/Login';
import { SignupPage } from '../pages/Signup';
import { Navbar } from '../component/Navbar';
// import { Favorites } from '../component/Favorites';
import { RecipeList } from '../component/RecipeList';
import { AllRecipes } from '../component/AllRecipes';
import  MyRecipes  from '../component/MyRecipes';
import { MainLayout } from '../layout/MainLayout';
import Favourite from '../component/Favourite';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage />} />

         
   <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
  <Route path="/" element={<Home />} />
  <Route path="/my-recipes" element={<MyRecipes />} />
  <Route path="/all-recipes" element={<AllRecipes />} />
  <Route path="/fav" element={<Favourite />} />
</Route>




      </Routes>
    </Router>
  );
}

export default App;
