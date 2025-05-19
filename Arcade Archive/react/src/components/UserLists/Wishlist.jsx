import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../Icons/IconButton";

export default function WishList({ games }) {
  const navigate = useNavigate();
  const [localGames, setLocalGames] = useState(games || []);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [messageTimeout, setMessageTimeout] = useState(null);

  // Update local games when props change
  useEffect(() => {
    console.log("WishList received games:", games);
    setLocalGames(games || []);
  }, [games]);

  // Clear success message after 3 seconds
  useEffect(() => {
    return () => {
      if (messageTimeout) clearTimeout(messageTimeout);
    };
  }, [messageTimeout]);

  const handleRemoveGame = async (gameId, gameName, event) => {
    // Stop event propagation to prevent any parent handlers from triggering
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    // Set loading state for this specific game
    setLoading(prev => ({ ...prev, [gameId]: true }));
    
    try {
      // Make DELETE request to remove the game from wishlist
      await axios.delete(`/users/wishlist/${gameId}`);
      
      // Update local state after successful deletion
      setLocalGames(prevGames => prevGames.filter(game => game.game_id !== gameId));
      
      // Show success message
      setSuccessMessage(`"${gameName}" successfully removed from wishlist`);
      
      // Clear success message after 3 seconds
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
      setMessageTimeout(timeout);
      
      // Clear any previous errors
      setError(null);
    } catch (err) {
      console.error('Error removing game from wishlist:', err);
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
  const handleDetailsClick = (game, event) => {
    // Stop event propagation to prevent any parent handlers from triggering
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    // Log the full game object to inspect its properties
    console.log("Navigating with game object:", game);
    
    // Access the api_id property correctly based on API response
    const apiId = game.api_id;
    
    console.log(`Using API ID for navigation: ${apiId}`);
    
    if (apiId) {
      navigate(`/details/${apiId}`, {
        state: {
          game: {
            id: apiId,
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
        <p className="empty-list-message">Your wishlist is empty.</p>
      ) : (
        <div>
          {localGames.map((game, i) => (
            <div 
              key={i} 
              className="game-list-item"
              // Add extra padding at the bottom of the list to ensure buttons are visible
              style={i === localGames.length - 1 ? { marginBottom: '60px' } : {}}
            >
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
              <div 
                className="game-list-actions"
                // Ensure buttons are clickable with higher z-index
                style={{ position: 'relative', zIndex: 5 }}
              >
                <IconButton 
                  type="trash" 
                  onClick={(e) => handleRemoveGame(game.game_id, game.name, e)}
                  className={loading[game.game_id] ? "disabled" : ""}
                />
                <button 
                  className="game-list-button details"
                  onClick={(e) => handleDetailsClick(game, e)}
                  // Add pointer-events style to ensure button remains clickable
                  style={{ pointerEvents: 'auto' }}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
          
          {/* Add a spacer div at the bottom to ensure the last item is fully visible and interactive */}
          <div style={{ height: '60px', width: '100%' }}></div>
        </div>
      )}
    </div>
  );
}