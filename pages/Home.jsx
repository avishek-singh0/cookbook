
import { RecipeList } from '../component/RecipeList';
import { useEffect ,useState } from 'react';
import { Navbar } from '../component/Navbar';
// import { SearchBar } from '../component/SearchBar';
import { AllRecipes } from '../component/AllRecipes';



 const Home = () => {


  return (
    <div className="min-h-screen bg-gray-800">
     
      
      <main className="container mx-auto px-4 py-6">
       
        <AllRecipes/>

      </main>
    </div>
  );
};

export default Home;