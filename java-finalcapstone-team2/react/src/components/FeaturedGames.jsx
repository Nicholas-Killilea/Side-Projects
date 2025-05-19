import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './FeaturedGames.css';

const fetchGamesByMetacriticScore = async (minScore = 80, maxScore = 100, pageSize = 10, page = 1) => {
  try {
    // Access environment variables
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;
    
    // Build the complete URL with query parameters
    const url = `${apiUrl}games?key=${apiKey}&ordering=-metacritic&metacritic=${minScore},${maxScore}&page_size=${pageSize}&page=${page}`;
    
    console.log('Fetching games from:', url);
    
    // Make the API call
    const response = await fetch(url);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    console.log(`Fetched ${data.results?.length || 0} games by metacritic score`);
    return data;
  } catch (error) {
    console.error("Error fetching games by metacritic score:", error);
    throw error;
  }
};

function FeatureGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await fetchGamesByMetacriticScore(85, 100, 10); // Fetch more games to ensure we have enough with images
        
        // Filter out games without background images
        const gamesWithImages = data.results.filter(game => game.background_image);
        
        // Limit to first 5 games with images
        const limitedGames = gamesWithImages.slice(0, 5);
        
        setGames(limitedGames);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadGames();
  }, []);
  
  const handleGameClick = (game) => {
    navigate(`/details/${game.id}`, { state: { game } });
    window.scrollTo(0, 0);
  };
  
  if (loading) return <div>Loading top-rated games...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="featured-games-row">
      {games.map((game) => (
        <div 
          key={game.id} 
          className='trendingCard'
          style={{
            backgroundImage: `url(${game.background_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer'
          }}
          onClick={() => handleGameClick(game)}
        >
          <div className="trendingContent">
            <h3>{game.name}</h3>
            {game.metacritic && (
              <div className='trendingRating'>
                <FontAwesomeIcon icon={faStar} className='trendingStarIcon' />
                <span>{game.metacritic}/100 (Metascore)</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeatureGames;