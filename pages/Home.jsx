import { useEffect, useState } from 'react';
import { AllRecipes } from '../component/AllRecipes';
import SearchBar from '../component/SerachBar';
import axios from 'axios';


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('https://cookbackend-umfm.onrender.com/recipe/all');
        if (res.data.status === 'success') {
          setRecipes(res.data.data.recipes);
          setFiltered(res.data.data.recipes);
        }
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    const filteredData = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filteredData);
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <main className="container mx-auto px-4 py-6">
        
        <SearchBar onSearch={handleSearch} placeholder="Search for recipes..." />
        <AllRecipes recipes={filtered} />
        
      </main>
    </div>
  );
};

export default Home;
