import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import './ReviewCard.css';
import IconButton from "../Icons/IconButton";

export default function ReviewCard({ review, showUsername = false, onReviewDeleted }) {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReviewText, setEditedReviewText] = useState(review.reviewText || '');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false); 

  const handleUpdateReview = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const payload = {
        id: review.gameId,
        name: review.gameName,
        background_image: review.gameImageUrl,
        rating: review.avgRating || 0,
        userReview: editedReviewText
      };
      const response = await axios.put('/games/review', payload);
      if (response.status === 200 || response.status === 201) {
        setUpdateSuccess(true);
        setIsEditing(false);
        // If you have a way to refresh the parent component, call it here
      }
    } catch (error) {
      console.error('Error updating review:', error);
      setError(error.response?.data?.message || 'Failed to update review');
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteReview = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use review.id instead of review.gameId
      const response = await axios.delete(`/games/review/${review.id}`);
      
      if (response.status === 200 || response.status === 204) {
        setDeleteSuccess(true); // Show success message
        
        // Give user time to see the message before removing the review
        setTimeout(() => {
          if (onReviewDeleted) {
            onReviewDeleted(review.id); // Use review.id here too
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      setError(error.response?.data?.message || 'Failed to delete review');
      setDeleteConfirm(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditedReviewText(review.reviewText || '');
    setError(null);
    setUpdateSuccess(false);
  };
  const handleDeleteClick = () => {
    setDeleteConfirm(true);
  };
  const cancelDelete = () => {
    setDeleteConfirm(false);
  };


  
  return (
    <div 
      className="review-card" 
      style={{ 
        backgroundImage: `url(${review.gameImageUrl || "https://via.placeholder.com/900x400?text=No+Image"})`
      }}
    >
      {/* Top section with title */}
      <div className="review-header">
        <div className="header-text">
          <h2 className="game-title">{review.gameName}</h2>
          {showUsername && review.username && (
            <p className="review-username">Reviewed by: {review.username}</p>
          )}
        </div>
      </div>
      
      {/* Middle section with content */}
      <div className="review-content">
        {isEditing ? (
          <textarea
            className="edit-field"
            value={editedReviewText}
            onChange={(e) => setEditedReviewText(e.target.value)}
            placeholder="Write your review here..."
            disabled={isLoading}
          />
        ) : deleteConfirm ? (
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this review?</p>
          </div>
        ) : (
          <p className="review-text">{review.reviewText}</p>
        )}
      </div>
      
      <div className="button-container">
  {isEditing ? (
    <>
      <button
        className="button cancel-button"
        onClick={handleCancel}
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        className="button save-button"
        onClick={handleUpdateReview}
        disabled={isLoading || !editedReviewText.trim()}
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </>
  ) : deleteConfirm ? (
    <>
      <button
        className="button cancel-button"
        onClick={cancelDelete}
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        className="button delete-button"
        onClick={handleDeleteReview}
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Confirm Delete'}
      </button>
    </>
  ) : (
    <>
      {/* Replace the edit button with IconButton */}
      <IconButton
        type="edit"
        onClick={() => setIsEditing(true)}
        className={isLoading ? "disabled" : ""}
      />
      
      {/* Replace the delete button with IconButton */}
      <IconButton
        type="trash"
        onClick={handleDeleteClick}
        className={isLoading ? "disabled" : ""}
      />
    </>
  )}
</div>
      
      {/* Status messages */}
      {updateSuccess && (
        <p className="status-message success-message">
          Review updated successfully!
        </p>
      )}
      {deleteSuccess && (
        <p className="status-message success-message">
          Review successfully deleted!
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






