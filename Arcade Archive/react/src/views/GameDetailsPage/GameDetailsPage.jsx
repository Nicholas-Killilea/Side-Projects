import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { UserContext } from '../../context/UserContext';
import MyUserReview from '../../components/UserReviews/MyUserReview';
import UserStarRating from '../../components/GameTile/UserStarRating';
import axios from 'axios';
import './GameDetailsPage.css';
import IconButton from '../../components/Icons/IconButton';

// Component for displaying a single review on GameDetailsPage
const GameDetailReviewCard = ({ review, showUsername = false }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <img
          src={review.gameImageUrl || 'https://via.placeholder.com/100x100?text=No+Image'}
          alt={review.gameName}
          className="game-image"
        />
        <div className="header-text">
          <h2 className="game-title">{review.gameName}</h2>
          {showUsername && review.username && (
            <p className="review-username">Reviewed by: {review.username}</p>
          )}
        </div>
      </div>
      <p className="review-text">{review.reviewText}</p>
    </div>
  );
};

function GameDetailsPage() {
  const location = useLocation();
  const { gameId } = useParams();
  const [game, setGame] = useState(location.state?.game || {});
  const [gameDescription, setGameDescription] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);
  const [userReviewData, setUserReviewData] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch game description
  useEffect(() => {
    const getGameDescription = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const apiUrl = import.meta.env.VITE_API_URL;
        const newUrl = `${apiUrl}games/${gameId}?key=${apiKey}`;
        const response = await fetch(newUrl);

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        setGameDescription(data.description_raw || data.description || '');
        setGame((prev) => ({ ...prev, ...data }));
      } catch (err) {
        // Handle error silently as per original code
      }
    };

    if (gameId) {
      getGameDescription();
    }
  }, [gameId]);

  // Fetch reviews and user rating
  useEffect(() => {
    const fetchReviewsAndRating = async () => {
      if (!game?.id && !gameId) {
        return;
      }

      setReviewsLoading(true);
      setReviewsError(null);
      setLoading(true);
      setError(null);

      try {
        const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};

        // Fetch reviews
        const reviewsResponse = await fetch('http://localhost:9000/games/reviews', { headers });
        if (!reviewsResponse.ok) {
          throw new Error(`Failed to fetch reviews: ${reviewsResponse.status}`);
        }
        const allReviews = await reviewsResponse.json();

        const numGameId = Number(game?.id) || 0;
        const numParamId = Number(gameId) || 0;

        const gameReviews = allReviews
          .filter((review) => {
            const reviewGameId = Number(review.gameId) || 0;
            const reviewApiId = Number(review.apiId) || 0;
            const matches =
              reviewGameId === numGameId ||
              reviewGameId === numParamId ||
              reviewApiId === numGameId ||
              reviewApiId === numParamId ||
              String(reviewGameId) === gameId;
            return matches;
          })
          .map((review) => ({
            id: review.id,
            gameId: review.gameId,
            username: review.username || 'Anonymous',
            reviewText: review.review_text || review.reviewText || review.userReview || review.content || 'No review content',
            gameName: review.gameName || game.name || 'Unknown Game',
            gameImageUrl: review.gameImageUrl || game.background_image || 'https://via.placeholder.com/100x100?text=No+Image',
            apiId: review.apiId,
            userId: review.userId,
            avgRating: review.avgRating || 0,
          }));

        // Set user review
        if (user?.id) {
          const userReview = gameReviews.find((review) => {
            const isUserReview = review.userId === user.id;
            const matchesGame =
              review.apiId === numGameId ||
              review.gameId === numGameId ||
              review.apiId === numParamId ||
              review.gameId === numParamId;
            return isUserReview && matchesGame;
          });
          setUserReviewData(userReview || null);
        }

        // Fetch user rating
        if (user?.id) {
          const response = await axios.get(`http://localhost:9000/users/rating/${user.id}`, { headers });
          const rating = response.data.find((r) => r.apiId === Number(game.id || gameId));
          setUserRating(rating ? rating.rating : null);
        }

        // Exclude user's review from all reviews
        const otherReviews = user?.id ? gameReviews.filter((review) => review.userId !== user.id) : gameReviews;
        setReviews(otherReviews);
      } catch (err) {
        setReviewsError(
          err.response?.status === 404 ? 'No reviews found for this game.' : `Failed to load reviews: ${err.message}`
        );
        setError('Failed to load ratings. You can still rate the game.');
      } finally {
        setReviewsLoading(false);
        setLoading(false);
      }
    };

    fetchReviewsAndRating();
  }, [game?.id, gameId, user?.id, user?.token]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    console.log(`Selected option: ${option}`);

    if (!user?.id) {
      setError('Please log in to add games to your lists.');
      return;
    }

    const gameData = {
      id: parseInt(game.id, 10),
      name: game.name || 'Unknown Game',
      background_image: game.background_image || 'https://via.placeholder.com/300x300?text=No+Image',
      rating: game.rating
    };

    const endpoint = option === 'Wish-list' ? 'wishlist' : option === 'Playing' ? 'playing' : 'finished';

    axios.post(`http://localhost:9000/users/games/user/${endpoint}`, gameData, {
      withCredentials: true
    })
      .then(response => {
        console.log(`Game added to ${endpoint} successfully:`, response.data);
      })
      .catch(err => {
        console.error(`Error adding game to ${endpoint}:`, err);
        setError(`Failed to add game to ${endpoint}. Please try again.`);
      });
  };

  // Handle review submission or update
  const handleReviewSubmitted = async () => {
    setReviewsLoading(true);
    setReviewsError(null);

    try {
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      const response = await fetch('http://localhost:9000/games/reviews', { headers });
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`);
      }
      const allReviews = await response.json();

      const numGameId = Number(game?.id) || 0;
      const numParamId = Number(gameId) || 0;

      const gameReviews = allReviews
        .filter((review) => {
          const reviewGameId = Number(review.gameId) || 0;
          const reviewApiId = Number(review.apiId) || 0;
          const matches =
            reviewGameId === numGameId ||
            reviewGameId === numParamId ||
            reviewApiId === numGameId ||
            reviewApiId === numParamId ||
            String(reviewGameId) === gameId;
          return matches;
        })
        .map((review) => ({
          id: review.id,
          gameId: review.gameId,
          username: review.username || 'Anonymous',
          reviewText: review.review_text || review.reviewText || review.userReview || review.content || 'No review content',
          gameName: review.gameName || game.name || 'Unknown Game',
          gameImageUrl: review.gameImageUrl || game.background_image || 'https://via.placeholder.com/100x100?text=No+Image',
          apiId: review.apiId,
          userId: review.userId,
          avgRating: review.avgRating || 0,
        }));

      if (user?.id) {
        const userReview = gameReviews.find((review) => {
          const isUserReview = review.userId === user.id;
          const matchesGame =
            review.apiId === numGameId ||
            review.gameId === numGameId ||
            review.apiId === numParamId ||
            review.gameId === numParamId;
          return isUserReview && matchesGame;
        });
        setUserReviewData(userReview || null);
      }

      const otherReviews = user?.id ? gameReviews.filter((review) => review.userId !== user.id) : gameReviews;
      setReviews(otherReviews);
    } catch (err) {
      setReviewsError(
        err.response?.status === 404 ? 'No reviews found for this game.' : `Failed to load reviews: ${err.message}`
      );
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleStarClick = async (rating) => {
    if (!user?.id) {
      setError('Please log in to rate this game.');
      return;
    }

    const validatedRating = parseInt(rating, 10);
    if (isNaN(validatedRating) || validatedRating < 1 || validatedRating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }

    setLoading(true);
    setError(null);

    const gameIdNum = parseInt(game.id || gameId, 10);
    const payload = {
      id: gameIdNum,
      name: game.name || 'Unknown Game',
      background_image: game.background_image || 'https://via.placeholder.com/100x100?text=No+Image',
      rating: parseFloat(game.rating) || 0,
      userRating: validatedRating
    };

    const headers = user.token ? { Authorization: `Bearer ${user.token}` } : {};

    try {
      if (isNaN(gameIdNum)) {
        throw new Error('Invalid game ID');
      }

      const hasRated = userRating !== null;
      const method = hasRated ? 'put' : 'post';
      const response = await axios[method](`http://localhost:9000/games/rate`, payload, { headers });
      setUserRating(validatedRating);
    } catch (err) {
      let errorMessage = 'Failed to save rating.';
      if (err.response) {
        const message = err.response.data?.message || err.response.data || err.response.statusText;
        if (err.response.status === 400 && message.includes('Rating must be between 1 and 5')) {
          errorMessage = 'Rating must be between 1 and 5.';
        } else if (err.response.status === 401) {
          errorMessage = 'Unauthorized: Please log in again.';
        } else if (err.response.status === 500 && message.includes('duplicate key value')) {
          errorMessage = 'Rating already exists. Updating...';
          try {
            const putResponse = await axios.put(`http://localhost:9000/games/rate`, payload, { headers });
            setUserRating(validatedRating);
            return;
          } catch (putError) {
            errorMessage = `Failed to update rating: ${putError.response?.status || ''} - ${putError.response?.data?.message || putError.message}`;
          }
        } else {
          errorMessage = `Server error: ${err.response.status} - ${message}`;
        }
      } else {
        errorMessage = `Error: ${err.message}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Render average star rating
  const renderAvgStarRating = (rating = 0) => {
    const numRating = Number(rating) || 0;
    const boundedRating = Math.min(5, Math.max(0, numRating));
    const isHalfStar = Math.abs((boundedRating % 1) - 0.5) < 0.05;
    const fullStars = isHalfStar ? Math.floor(boundedRating) : Math.round(boundedRating);

    return (
      <div className="star-rating" aria-label={`Average Rating: ${boundedRating} out of 5`}>
        {[...Array(5)].map((_, i) => {
          let icon;
          let className = 'star';
          if (i < fullStars) {
            icon = fasStar;
            className += ' filled';
          } else if (i === fullStars && isHalfStar) {
            icon = faStarHalfAlt;
            className += ' half-filled';
          } else {
            icon = farStar;
            className += ' empty';
          }
          return (
            <FontAwesomeIcon
              key={i}
              icon={icon}
              className={className}
              style={{ color: '#FFD43B' }}
            />
          );
        })}
        <span className="rating-text">{boundedRating.toFixed(1)} / 5</span>
      </div>
    );
  };

  // Format release date to "Month Day, Year"
  const formatReleaseDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Unknown';
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Unknown';
    }
  };

  // If no game data
  if (!game || !game.id) {
    return (
      <div className="gameDetailsPage">
        <h1>Game Not Found</h1>
        <p>Sorry, we couldn't find details for this game. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <div className="gameDetailsPage">
      <div className="game-banner-container">
        <img
          src={game.background_image || game.background_image_additional || 'https://placehold.co/1200x500?text=No+Image'}
          alt={game.name}
          className="game-banner"
        />
        <div className="game-title-overlay">
          <h1>{game.name}</h1>
        </div>
      </div>
      <div className="genre-banner">
        <span>{game.genres?.map((g) => g.name).join(', ') || 'N/A'}</span>
      </div>
      <div className="game-info">
        <div className="game-info-row">
          {renderAvgStarRating(game.rating)}
          <p className="release-date">
            <strong>Released:</strong> {formatReleaseDate(game.released)}
          </p>
        </div>
        <p className="game-description">{gameDescription || 'No description available.'}</p>
      </div>

      {user?.id ? (
        <div className="game-details__options-container">
          {/* Wishlist button with tooltip */}
          <div className="game-details__icon-button-wrapper">
            <IconButton
              type="wishlist"
              onClick={() => handleOptionSelect('Wish-list')}
              className={selectedOption === 'Wish-list' ? 'selected' : ''}
            />
            <span className="game-details__tooltip">
              {selectedOption === 'Wish-list' ? 'In Wishlist' : 'Add to Wishlist'}
            </span>
          </div>

          {/* Playing button with tooltip */}
          <div className="game-details__icon-button-wrapper">
            <IconButton
              type="playing"
              onClick={() => handleOptionSelect('Playing')}
              className={selectedOption === 'Playing' ? 'selected' : ''}
            />
            <span className="game-details__tooltip">
              {selectedOption === 'Playing' ? 'Currently Playing' : 'Add to Currently Playing'}
            </span>
          </div>

          {/* Finished button with tooltip */}
          <div className="game-details__icon-button-wrapper">
            <IconButton
              type="finished"
              onClick={() => handleOptionSelect('Finished')}
              className={selectedOption === 'Finished' ? 'selected' : ''}
            />
            <span className="game-details__tooltip">
              {selectedOption === 'Finished' ? 'Completed' : 'Add to Finished'}
            </span>
          </div>
        </div>
      ) : (
        <p className="no-login-message">Please log in to add this game to your lists.</p>
      )}

      {/* Separate confirmation message that appears below without moving buttons */}
      {selectedOption && user?.id && (
        <div className="game-details__selected-option-confirmation">
          Added to List: {selectedOption}
        </div>
      )}

      <div className="MyUserReview">
        <div className="my-review-header">
          <h1>My Review</h1>
          {user?.id && (
            <div className="user-rating-container">
              <UserStarRating
                apiId={game.id || gameId}
                userRating={userRating}
                handleStarClick={handleStarClick}
                hoverRating={hoverRating}
                setHoverRating={setHoverRating}
                loading={loading}
                isLoggedIn={!!user?.id}
              />
              <span className="rating-text">
                {loading ? 'Saving...' : userRating !== null ? `My Rating: ${userRating} / 5` : 'Rate this game'}
              </span>
              {error && <div className="rating-error">{error}</div>}
            </div>
          )}
        </div>
        {user?.id ? (
          <MyUserReview
            review={userReviewData}
            game={game}
            token={user.token}
            onReviewSubmitted={handleReviewSubmitted}
          />
        ) : (
          <p className="no-login-message">Please log in to write a review.</p>
        )}
      </div>
      <div className="GameDetailReviewsCard">
        <h1>All Reviews</h1>
        {reviewsLoading && <p className="reviews-loading">Loading reviews...</p>}
        {reviewsError && <p className="reviews-error">{reviewsError}</p>}
        {!reviewsLoading && !reviewsError && reviews.length === 0 && (
          <p className="no-reviews">No reviews yet for this game.</p>
        )}
        {!reviewsLoading &&
          !reviewsError &&
          reviews.map((review) => (
            <GameDetailReviewCard
              key={review.id}
              review={review}
              showUsername={true}
            />
          ))}
      </div>
    </div>
  );
}

export default GameDetailsPage;