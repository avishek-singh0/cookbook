import { useState } from 'react';

export default function SearchBar({ placeholder = "Search...", onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-6">
      <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <input
          type="text"
          className="flex-grow p-3 focus:outline-none"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}
