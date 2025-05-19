import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import UserRatingCard from './UserRatingCard';
import './UserRatings.css';

function UserRatings({ admin = false }) {
  const user = useContext(UserContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if no user ID is available (user not logged in) and not in admin mode
    if (!admin && !user?.id) {
      setLoading(false);
      return;
    }

    const fetchRatings = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Choose endpoint based on admin prop - following the same pattern as UserReviews
        const endpoint = admin 
          ? 'http://localhost:9000/games/ratings' // Endpoint for all ratings
          : `http://localhost:9000/users/rating/${user.id}`; // Endpoint for user ratings
          
        const response = await axios.get(endpoint);
        
        // Process the response data
        const processedRatings = response.data.map(rating => ({
          id: rating.id,
          name: rating.gameName || 'Unknown Game',
          background_image: rating.gameImageUrl,
          userRating: rating.rating,
          username: rating.username,
          userId: rating.userId,
          gameId: rating.gameId,
          apiId: rating.apiId || 0,
          avgRating: rating.avgRating || 0
        }));
        
        // Update state with processed ratings
        setRatings(processedRatings);
      } catch (err) {
        console.error('Error fetching ratings:', err);
        setError('Failed to load ratings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [user?.id, admin]);

  // Loading state
  if (loading) {
    return (
      <div className="game-ratings-container">
        <h2 className="game-ratings-title">
          {admin ? 'All User Ratings' : 'Your Game Ratings'}
        </h2>
        <div className="game-ratings-loading">
          <div className="loading-spinner"></div>
          <p>Loading ratings...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="game-ratings-container">
        <h2 className="game-ratings-title">
          {admin ? 'All User Ratings' : 'Your Game Ratings'}
        </h2>
        <div className="game-ratings-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (ratings.length === 0) {
    return (
      <div className="game-ratings-container">
        <h2 className="game-ratings-title">
          {admin ? 'All User Ratings' : `${user.username}'s Game Ratings`}
        </h2>
        <div className="game-ratings-empty">
          <p>
            {admin 
              ? 'No ratings have been submitted yet.' 
              : 'You haven\'t rated any games yet. Start rating games to see your ratings here!'}
          </p>
        </div>
      </div>
    );
  }

  // Render ratings list
  return (
    <div className="game-ratings-container">
      <h2 className="game-ratings-title">
        {admin ? 'All User Ratings' : `${user.username}'s Game Ratings`}
      </h2>
      
      <div className="game-ratings-grid">
        {ratings.map(rating => (
          <UserRatingCard key={rating.id} rating={rating} />
        ))}
      </div>
    </div>
  );
}

export default UserRatings;