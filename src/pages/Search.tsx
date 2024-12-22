import { Link } from 'react-router-dom';

const genres = [
  {
    name: 'Rock',
    image: 'https://images.unsplash.com/photo-1506499254543-b362909bf3b8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    path: '/rock'
  },
  {
    name: 'Metal',
    image: 'https://images.unsplash.com/photo-1715416442405-0af19bc03101?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    path: '/metal'
  },
  {
    name: 'Pop',
    image: 'https://images.unsplash.com/photo-1559799536-95e03ae1db1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    path: '/pop'
  },
  {
    name: 'Jazz',
    image: 'https://plus.unsplash.com/premium_photo-1723291262199-7b25c3290262?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    path: '/jazz'
  },
  {
    name: 'Hip Hop',
    image: 'https://images.unsplash.com/photo-1557607317-39acc61e9ac7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    path: '/hiphop'
  }
];

const Search = () => {
  return (
    <div className="flex flex-wrap justify-center p-4 mt-40 lg:ml-60">
      {genres.map((genre) => (
        <Link 
          key={genre.name} 
          to={genre.path} 
          className="border border-gray-500 rounded-lg w-48 m-2 text-center transform transition-transform duration-200 hover:scale-105 bg-[#3f3d3d]"
        >
          <img src={genre.image} alt={genre.name} className="w-full rounded-t-lg" />
          <h3 className="text-lg font-semibold p-2 text-white">{genre.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Search;
