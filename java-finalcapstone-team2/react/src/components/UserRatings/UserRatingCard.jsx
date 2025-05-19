import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import './UserRatingCard.css';

function UserRatingCard({ rating }) {
  const navigate = useNavigate();
  const { name, userRating, background_image, username, gameId, apiId } = rating;

  
  // Use a fallback image if none is provided
  const imageUrl = background_image || 'https://via.placeholder.com/100x56?text=No+Image';
  
  // Ensure rating is valid (between 1 and 5)
  const validRating = userRating >= 1 && userRating <= 5 ? userRating : 0;

  // Navigate to game details page when card is clicked
  function handleClick() {
    // IMPORTANT: The RAWG API ID should be used for navigation, not the internal DB ID
    // The API ID is what the GameDetailsPage component expects for fetching game data
    const gameApiId = apiId || 0;
    console.log(rating);
    
    console.log("Card clicked - navigating to game:", name);
    console.log("Using apiId:", apiId, "gameId:", gameId);
    
    if (apiId) {
      // Navigate using the RAWG API ID
      navigate(`/details/${apiId}`, { 
        state: { 
          game: {
            // Pass all available data to ensure nothing is lost
            id: apiId,
            gameId: gameId,  // Include internal DB ID
            name: name,
            background_image: background_image,
            userRating: userRating
          } 
        }
      });
    } else if (gameId) {
      // If no API ID, use the internal game ID but add a special flag
      console.warn("No API ID available, falling back to internal gameId:", gameId);
      navigate(`/details/${gameId}`, { 
        state: { 
          game: {
            id: gameId,
            isInternalId: true,  // Flag to indicate this is an internal ID
            name: name,
            background_image: background_image,
            userRating: userRating
          } 
        }
      });
    } else {
      console.error("No valid game ID available for navigation");
    }
  }

  return (
    <div className="game-rating-card" onClick={handleClick}>
      <div className="game-rating-image-container">
        <img 
          src={imageUrl} 
          alt={name || 'Game image'} 
          className="game-rating-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/100x56?text=No+Image';
          }}
        />
      </div>
      
      <div className="game-rating-content">
        <h3 className="game-rating-title">{name || 'Unknown Game'}</h3>
        {username && <p className="game-rating-username">Rated by: {username}</p>}
        
        {/* Display IDs for debugging if needed */}
        {/*<p className="game-rating-debug">API ID: {apiId || 'N/A'}, Game ID: {gameId || 'N/A'}</p>*/}
      </div>
      
      <div className="game-rating-stars">
        {[1, 2, 3, 4, 5].map(star => (
          <FontAwesomeIcon
            key={star}
            icon={star <= validRating ? fasStar : farStar}
            className={star <= validRating ? 'star-filled' : 'star-empty'}
          />
        ))}
      </div>
    </div>
  );
}

export default UserRatingCard;