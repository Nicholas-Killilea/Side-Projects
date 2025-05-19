import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import ReviewCard from './ReviewCard'; 
import axios from 'axios';
import './UserReviews.css'; // Import the CSS we created

export default function UserReviews({ admin = false }) {
  const user = useContext(UserContext);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const handleReviewDeleted = (reviewId) => {
    // Remove the deleted review from the state
    setUserReviews(userReviews.filter(review => review.id !== reviewId));
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (!admin && !user?.id) {
        setLoading(false);
        return;
      }
  
      setLoading(true);
      try {
        // Choose endpoint based on admin prop
        const endpoint = admin ? '/games/reviews' : `/users/reviews/${user.id}`;
        const response = await axios.get(endpoint);
        console.log(`Fetched ${admin ? 'all' : 'user'} reviews (raw):`, response.data);
        
        // Transform the data similarly for both cases
        const enrichedReviews = (response.data || []).map((review) => {
          const imageUrl = review.gameImageUrl || null;
          if (!imageUrl) {
            console.warn(`No gameImageUrl for review ${review.id}:`, review);
          }
          return {
            id: review.id,
            gameName: review.gameName || 'Unknown Game',
            gameImageUrl: imageUrl,
            background_image: imageUrl, // Add this for consistency
            reviewText: review.reviewText || 'No review content',
            gameId: review.gameId,
            userId: review.userId,
            username: review.username, // From the new endpoint
            apiId: review.apiId || 0,
            avgRating: review.avgRating || 0
          };
        });
        
        console.log('Enriched reviews:', enrichedReviews);
        setUserReviews(enrichedReviews);
      } catch (err) {
        console.error(`Error fetching ${admin ? 'all' : 'user'} reviews:`, err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviews();
  }, [user?.id, admin]);

  if (loading) {
    return (
      <div className="Container">
        <h1>{admin ? 'All User Reviews' : `${user?.username}'s Reviews`}</h1>
        <div className="loading-spinner">Loading reviews...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Container">
        <h1>{admin ? 'All User Reviews' : `${user?.username}'s Reviews`}</h1>
        <div className="error-message">Error loading reviews: {error}</div>
      </div>
    );
  }

  return (
    <div className="Container">
      <div className='reviews-title'>
      <h1>{admin ? 'All User Reviews' : 'Your Reviews'}</h1>
      </div>
      
      {userReviews.length === 0 ? (
        <p className="no-ratings-message">{admin ? 'No reviews have been submitted yet.' : 'You haven\'t written any reviews yet.'}</p>
      ) : (
        <div className="ratings-list">
          {userReviews.map((review) => (
            <ReviewCard 
              key={review.id || Math.random().toString()}
              review={review} 
              showUsername={admin} 
              onReviewDeleted={handleReviewDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}