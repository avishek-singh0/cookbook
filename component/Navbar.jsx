import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-green-600">
              CookBook
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/fav" 
              className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium"
            >
              Favorites
            </Link>
            <Link 
              to="/my-recipes" 
              className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium"
            >
              My Recipes
            </Link>
             <Link 
              to="/add" 
              className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium"
            >
             Create Receipe
            </Link>
            <Link 
              to="/" 
              className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium"
            >
             Home
            </Link>
          <button
  onClick={() => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  }}
  className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium"
>
  Logout
</button>

          </div>
        </div>
      </div>
    </nav>
  );
};