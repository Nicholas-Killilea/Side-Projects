import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../Icons/IconButton";

export default function FinishedList({ games }) {
  const navigate = useNavigate();
  const [localGames, setLocalGames] = useState(games || []);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [messageTimeout, setMessageTimeout] = useState(null);

  // Update local games when props change
  useEffect(() => {
    console.log("FinishedList received games:", games);
    setLocalGames(games || []);
  }, [games]);

  // Clear success message after 3 seconds
  useEffect(() => {
    return () => {
      if (messageTimeout) clearTimeout(messageTimeout);
    };
  }, [messageTimeout]);

  const handleRemoveGame = async (gameId, gameName) => {
    // Set loading state for this specific game
    setLoading(prev => ({ ...prev, [gameId]: true }));
    
    try {
      // Make DELETE request to remove the game from finished list
      await axios.delete(`/users/finished/${gameId}`);
      
      // Update local state after successful deletion
      setLocalGames(prevGames => prevGames.filter(game => game.game_id !== gameId));
      
      // Show success message
      setSuccessMessage(`"${gameName}" successfully removed from finished list`);
      
      // Clear success message after 3 seconds
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
      setMessageTimeout(timeout);
      
      // Clear any previous errors
      setError(null);
    } catch (err) {
      console.error('Error removing game from finished list:', err);
      setError('Failed to remove game. Please try again.');
      
      // Clear error message after 3 seconds
      const timeout = setTimeout(() => {
        setError(null);
      }, 3000);
      
      setMessageTimeout(timeout);
    } finally {
      // Clear loading state
      setLoading(prev => ({ ...prev, [gameId]: false }));
    }
  };

  // Handle "Details" button click to navigate to game details page
  const handleDetailsClick = (game) => {
    // Log the full game object to inspect its properties
    console.log("Navigating with game object:", game);
    
    // Access the api_id property correctly based on API response
    const apiId = game.api_id;
    
    console.log(`Using API ID for navigation: ${apiId}`);
    
    if (apiId) {
      navigate(`/details/${apiId}`, {
        state: {
          game: {
            id: apiId, // Using apiId for both the URL and state
            name: game.name,
            background_image: game.image_url,
            rating: game.avg_rating
          }
        }
      });
    } else {
      console.error("No API ID available for game:", game);
      setError("Cannot navigate to game details: missing API ID");
    }
  };

  return (
    <div className="games-list-container">
      {/* Success and error messages */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {localGames.length === 0 ? (
        <p className="empty-list-message">Your finished list is empty.</p>
      ) : (
        <div>
          {localGames.map((game, i) => {
            // Log each game in the map to see its structure
            console.log(`Game ${i} in finished list:`, game);
            
            return (
              <div key={i} className="game-list-item">
                <img 
                  src={game.image_url || "https://via.placeholder.com/100x56?text=No+Image"} 
                  alt={game.name} 
                  className="game-list-image" 
                />
                <div className="game-list-details">
                  <h3 className="game-list-title">{game.name}</h3>
                  <div className="game-list-meta">
                    {game.avg_rating && (
                      <span className="game-list-rating">
                        Avg Rating: {game.avg_rating}/5
                      </span>
                    )}
                  </div>
                </div>
                <div className="game-list-actions">
                  <IconButton 
                    type="trash" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveGame(game.game_id, game.name);
                    }}
                    className={loading[game.game_id] ? "disabled" : ""}
                  />
                  <button 
                    className="game-list-button details"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleDetailsClick(game);
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}