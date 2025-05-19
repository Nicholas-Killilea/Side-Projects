import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminReviewList() {
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAllReviews = async () => {
      setLoading(true);
      try {
        // Create endpoint 
        const response = await axios.get('/admin/reviews/all');
        setAllReviews(response.data || []);
      } catch (err) {
        console.error("Error fetching all reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllReviews();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>All User Reviews</h1>
        <div>Loading reviews...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>All User Reviews</h1>
        <div>Error loading reviews: {error}</div>
      </div>
    );
  }

  // Group reviews by user
  const reviewsByUser = allReviews.reduce((acc, review) => {
    if (!acc[review.userId]) {
      acc[review.userId] = {
        username: review.username,
        reviews: []
      };
    }
    acc[review.userId].reviews.push(review);
    return acc;
  }, {});

  return (
    <div>
      <h1>All User Reviews</h1>
      
      {Object.keys(reviewsByUser).length === 0 ? (
        <p>No reviews to display.</p>
      ) : (
        <div>
          {Object.entries(reviewsByUser).map(([userId, userData]) => (
            <section key={userId} className="mb-6">
              <h2 className="text-xl font-bold mb-2">{userData.username}'s Reviews</h2>
              <div className="pl-4 border-l-4 border-gray-200">
                {userData.reviews.map((game, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-50 rounded">
                    <p className="font-semibold">
                      {game.gameName}
                      {game.hasRating && <span className="ml-2">Rating: {game.userRating}/5</span>}
                    </p>
                    {game.userReview && <p className="mt-1 text-gray-700">{game.userReview}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}