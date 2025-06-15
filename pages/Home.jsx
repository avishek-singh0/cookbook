import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../component/SerachBar';
import { AllRecipes } from '../component/AllRecipes';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://cookbackend-umfm.onrender.com/recipe/all');
        if (response.data.status === 'success') {
          setRecipes(response.data.data.recipes);
          setFiltered(response.data.data.recipes);
        } else {
          throw new Error(response.data.message || 'Failed to fetch recipes');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    const result = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <main className="container mx-auto px-4 py-6">
        <SearchBar onSearch={handleSearch} placeholder="Search for recipes..." />
        <AllRecipes recipes={filtered} loading={loading} error={error} />
      </main>
    </div>
  );
};

export default Home;
