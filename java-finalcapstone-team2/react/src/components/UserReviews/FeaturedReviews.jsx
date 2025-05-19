import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FeaturedReviews.css';

export default function FeaturedReviews() {
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Get all reviews from the backend
        const response = await axios.get('http://localhost:9000/games/reviews');
        
        if (response.data.length === 0) {
          setFeaturedReviews([]);
          return;
        }
        
        // Get a random selection of reviews
        const randomizedReviews = getRandomReviews(response.data, 3);
        
        setFeaturedReviews(randomizedReviews);
      } catch (err) {
        console.error('Error fetching featured reviews:', err);
        setError('Failed to load featured reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Function to get random reviews
  const getRandomReviews = (reviews, count) => {
    // Make a copy of the array to avoid modifying the original
    const reviewsCopy = [...reviews];
    
    // If we have fewer reviews than requested, return all of them
    if (reviewsCopy.length <= count) {
      return reviewsCopy;
    }
    
    const selectedReviews = [];
    
    // Select 'count' number of random reviews
    for (let i = 0; i < count; i++) {
      // Get a random index
      const randomIndex = Math.floor(Math.random() * reviewsCopy.length);
      
      // Add the review at that index to our selection
      selectedReviews.push(reviewsCopy[randomIndex]);
      
      // Remove that review from the array to avoid duplicates
      reviewsCopy.splice(randomIndex, 1);
    }
    
    return selectedReviews;
  };

  if (loading) {
    return <div className="featured-reviews-loading">Loading featured reviews...</div>;
  }

  if (error) {
    return <div className="featured-reviews-error">{error}</div>;
  }

  if (featuredReviews.length === 0) {
    return <div className="featured-reviews-empty">No reviews available yet.</div>;
  }

  return (
    <div className="featured-reviews-container">
      <h2 className="featured-reviews-title">Featured Reviews</h2>
      
      <div className="featured-reviews-grid">
        {featuredReviews.map((review) => (
          <div 
            key={review.id} 
            className="featured-review-card"
            style={{
              backgroundImage: `url(${review.gameImageUrl || "https://via.placeholder.com/400x250?text=No+Image"})`,
            }}
          >
            <div className="featured-review-overlay">
              <h3 className="featured-review-game">{review.gameName}</h3>
              
              <div className="featured-review-content">
                <p className="featured-review-excerpt">
                  {review.reviewText && review.reviewText.length > 150 
                    ? `${review.reviewText.substring(0, 150)}...` 
                    : review.reviewText}
                </p>
                
                <div className="featured-review-footer">
                  <span className="featured-review-author">By: {review.username}</span>
                  <Link 
                    to={`/details/${review.apiId}`} 
                    className="featured-review-link"
                    state={{ game: { id: review.apiId } }}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}