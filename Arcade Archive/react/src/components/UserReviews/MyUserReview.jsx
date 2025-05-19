import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import './MyUserReview.css';

export default function MyUserReview({ review, game, token, showUsername = false, onReviewSubmitted }) {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(!review); // Start editing if no review
  const [editedReviewText, setEditedReviewText] = useState(review?.reviewText || '');

  // This useEffect ensures the component stays in sync with props
  useEffect(() => {
    // Update state when review prop changes
    if (review) {
      setEditedReviewText(review.reviewText || '');
      setIsEditing(false); // Don't show editing form if we have a review
    } else {
      setIsEditing(true); // Show editing form if no review
    }
  }, [review]);

  const handleSubmitReview = async () => {
    if (!editedReviewText.trim()) {
      setError('Review text cannot be empty.');
      return;
    }
    if (!game?.id && !review?.gameId) {
      setError('Game data is missing.');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      setUpdateSuccess(false);
      const payload = {
        id: review?.gameId || Number(game.id), // Use review.gameId if available, else game.id
        name: review?.gameName || game.name || 'Unknown Game',
        background_image: review?.gameImageUrl || game.background_image || 'https://via.placeholder.com/100x100?text=No+Image',
        rating: review?.avgRating || parseFloat(game.rating) || 0,
        userReview: editedReviewText
      };
      console.log('Sending payload:', payload);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      let response;
      if (review) {
        // Update existing review
        response = await axios.put('http://localhost:9000/games/review', payload, { headers });
        console.log('Review updated successfully:', response.data);
      } else {
        // Create new review
        response = await axios.post('http://localhost:9000/games/review', payload, { headers });
        console.log('Review submitted successfully:', response.data);
      }
      // Consider any 2xx response as successful, regardless of response format
      if (response.status >= 200 && response.status < 300) {
        setUpdateSuccess(true);
        setIsEditing(false);
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      } else {
        throw new Error('Server returned an unexpected response');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      console.log('Error response:', error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      } : 'No response data');
      setError(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (!review) {
      // If it's a new review form, just reset the form
      setEditedReviewText('');
    } else {
      // If editing existing review, revert to original text
      setIsEditing(false);
      setEditedReviewText(review.reviewText || '');
    }
    setError(null);
    setUpdateSuccess(false);
  };

  // Debug information
  console.log('MyUserReview rendering:', {
    hasReview: !!review,
    reviewText: review?.reviewText,
    isEditing,
    editedReviewText
  });

  return (
    <div 
      className="review-card"
      style={{
        backgroundImage: `url(${review?.gameImageUrl || game?.background_image || 'https://via.placeholder.com/100x100?text=No+Image'})`
      }}
    >
      <div className="review-header">
        <img
          src={review?.gameImageUrl || game?.background_image || 'https://via.placeholder.com/100x100?text=No+Image'}
          alt={review?.gameName || game?.name}
          className="game-image"
        />
        <div className="header-text">
          <h2 className="game-title">{review?.gameName || game?.name}</h2>
          {showUsername && review?.username && (
            <p className="review-username">Reviewed by: {review.username}</p>
          )}
        </div>
      </div>
      {isEditing ? (
        <>
          <textarea
            className="edit-field"
            value={editedReviewText}
            onChange={(e) => setEditedReviewText(e.target.value)}
            placeholder="Write your review here..."
            disabled={isLoading}
          />
          <div className="button-container">
            <button
              className="button cancel-button"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="button save-button"
              onClick={handleSubmitReview}
              disabled={isLoading || !editedReviewText.trim()}
            >
              {isLoading ? 'Submitting...' : review ? 'Save Changes' : 'Submit Review'}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="review-text">{editedReviewText}</p>
          <div className="button-container">
            <button
              className="button edit-button"
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
            >
              Edit Review
            </button>
          </div>
        </>
      )}
      {updateSuccess && (
        <p className="status-message success-message">
          {review ? 'Review updated successfully!' : 'Review submitted successfully!'}
        </p>
      )}
      {error && (
        <p className="status-message error-message">
          {error}
        </p>
      )}
    </div>
  );
}