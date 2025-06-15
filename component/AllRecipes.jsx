import { RecipeList } from './RecipeList';

export const AllRecipes = ({ recipes, loading, error }) => {
  if (loading) return <div className="text-center py-10 text-white">Loading recipes...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (recipes.length === 0) return <div className="text-center py-10 text-white">No recipes found.</div>;

  return (
    <div>
      <RecipeList recipes={recipes} title="All Recipes" />
    </div>
  );
};
