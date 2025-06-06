import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    instructions: '',
    thumbnail: '',
    ingredients: ''
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const containerRef = useRef(null);  // ref for container wrapping input + suggestions

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...recipe,
      ingredients: recipe.ingredients.split(',').map(i => i.trim())
    };

    try {
      await axios.post('https://cookbackend-umfm.onrender.com/recipe/create', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Recipe created!');
      setRecipe({ name: '', instructions: '', thumbnail: '', ingredients: '' });
      setSuggestions([]);
    } catch (err) {
      console.error('Error creating recipe:', err);
      alert('Failed to create recipe.');
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (recipe.name.trim().length < 1) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe.name}`);
        const recipes = res.data.data.recipes;
        setSuggestions(recipes.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [recipe.name]);

  const handleSuggestionClick = (title) => {
    setRecipe((prev) => ({ ...prev, name: title }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // This will handle clicks outside the input + suggestions container to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-md space-y-3 mb-6">
      <h2 className="text-white font-semibold text-lg">Add New Recipe</h2>
      <div className="grid md:grid-cols-4 gap-3 relative" ref={containerRef}>
        <div className="relative col-span-1">
          <input
            type="text"
            placeholder="Name of the Recipe"
            value={recipe.name}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            required
            className="p-2 w-full rounded border border-black text-black"
            onFocus={() => setShowSuggestions(true)}
            // Remove onBlur handler entirely
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white text-black border border-gray-300 w-full rounded mt-1 max-h-40 overflow-y-auto">
              {suggestions.map((s) => (
                <li
                  key={s.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onMouseDown={() => handleSuggestionClick(s.title)}
                >
                  {s.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="text"
          placeholder="Instructions"
          value={recipe.instructions}
          onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
          required
          className="p-2 rounded border border-black text-black"
        />
        <input
          type="url"
          placeholder="Thumbnail URL"
          value={recipe.thumbnail}
          onChange={(e) => setRecipe({ ...recipe, thumbnail: e.target.value })}
          required
          className="p-2 rounded border border-black text-black"
        />
        <input
          type="text"
          placeholder="Ingredients (comma-separated)"
          value={recipe.ingredients}
          onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
          required
          className="p-2 rounded border border-black text-black"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
      >
        Create
      </button>
    </form>
  );
};

export default CreateRecipe;
