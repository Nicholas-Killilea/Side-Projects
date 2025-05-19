import { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { UserContext } from '../../context/UserContext';
import UserStarRating from './UserStarRating';
import './GameTile2.css';
import IconButton from '../../components/Icons/IconButton';

function GameTile2({ game }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [avgRating, setAvgRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Track which list the game is in
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInPlaying, setIsInPlaying] = useState(false);
  const [isInFinished, setIsInFinished] = useState(false);

  // console.log('GameTile2 state:', { gameId: game.id, userRating, hoverRating, loading, error });
  // console.log('THIS IS THE GAME THAT GETS PASSED INTO GameTile2: ',game);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      setError(null);
      setUserRating(null); // Clear rating on fetch

      try {
        // const rawgRating = parseFloat(game.rating) || 0;
        const rawgRating = game.rating;
        setAvgRating(rawgRating);

        if (user?.id) {
          const headers = user.token ? { Authorization: `Bearer ${user.token}` } : {};
          const response = await axios.get(`http://localhost:9000/users/rating/${user.id}`, { headers });
          // console.log('User ratings response:', response.data);
          const rating = response.data.find((r) => r.apiId === game.id);
          setUserRating(rating ? rating.rating : null);
          // console.log(`Fetched rating for game ${game.id}:`, rating ? rating.rating : null);
        }

      } catch (err) {
        console.error('Error fetching ratings:', err);
        setError('Failed to load ratings. You can still rate the game.');
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [game.id, user?.id, user?.token]);

  // Check which lists the game is in when component mounts or user changes
  useEffect(() => {
    const checkGameLists = async () => {
      if (!user?.id || !game?.id) return;

      try {
        // Check wishlist
        const wishlistResponse = await axios.get(`http://localhost:9000/users/games/user/wishlist`, {
          withCredentials: true
        });
        const inWishlist = wishlistResponse.data.some(item => item.id === parseInt(game.id, 10));
        setIsInWishlist(inWishlist);

        // Check playing
        const playingResponse = await axios.get(`http://localhost:9000/users/games/user/playing`, {
          withCredentials: true
        });
        const inPlaying = playingResponse.data.some(item => item.id === parseInt(game.id, 10));
        setIsInPlaying(inPlaying);

        // Check finished
        const finishedResponse = await axios.get(`http://localhost:9000/users/games/user/finished`, {
          withCredentials: true
        });
        const inFinished = finishedResponse.data.some(item => item.id === parseInt(game.id, 10));
        setIsInFinished(inFinished);

        // Set the selected option based on which list the game is in
        if (inWishlist) setSelectedOption('Wish-list');
        else if (inPlaying) setSelectedOption('Playing');
        else if (inFinished) setSelectedOption('Finished');

      } catch (err) {
        console.error('Error checking game lists:', err);
      }
    };

    checkGameLists();
  }, [game.id, user?.id]);

  const handleOptionSelect = (option) => {
    // First check if user is logged in
    if (!user?.id) {
      setError('Please log in to add games to your lists.');
      return;
    }

    // Clear previous messages
    setError(null);
    setSuccessMessage(null);

    // Map option names to endpoint names and states for consistency
    const optionDetails = {
      'Wish-list': { endpoint: 'wishlist', stateVar: isInWishlist },
      'Playing': { endpoint: 'playing', stateVar: isInPlaying },
      'Finished': { endpoint: 'finished', stateVar: isInFinished }
    };

    const { endpoint, stateVar } = optionDetails[option] || {};

    if (!endpoint) {
      setError('Invalid option selected.');
      return;
    }

    // Check if the game is already in the selected list
    if (stateVar) {
      setError(`This game is already in your ${option} list.`);
      return;
    }

    // Check if the game is in any other list
    if (isInWishlist || isInPlaying || isInFinished) {
      let currentList = '';
      if (isInWishlist) currentList = 'Wish-list';
      else if (isInPlaying) currentList = 'Playing';
      else if (isInFinished) currentList = 'Finished';

      setError(`This game is already in your ${currentList} list.`);
      return;
    }

    const gameData = {
      id: parseInt(game.id, 10),
      name: game.name || 'Unknown Game',
      background_image: game.background_image || 'https://via.placeholder.com/300x300?text=No+Image',
      rating: game.rating
    };

    axios.post(`http://localhost:9000/users/games/user/${endpoint}`, gameData, {
      withCredentials: true
    })
      .then(response => {
        console.log(`Game added to ${endpoint} successfully:`, response.data);
        setSelectedOption(option);

        // Update the status flags to reflect the new state
        if (endpoint === 'wishlist') {
          setIsInWishlist(true);
        } else if (endpoint === 'playing') {
          setIsInPlaying(true);
        } else if (endpoint === 'finished') {
          setIsInFinished(true);
        }

        // Show success message
        setSuccessMessage(`Game added to your ${option} list!`);
      })
      .catch(err => {
        console.error(`Error adding game to ${endpoint}:`, err);
        setError(`Failed to add game to ${endpoint}. Please try again.`);
      });
  };

  const handleDetailsClick = (e) => {
    e.preventDefault();
    navigate(`/details/${game.id || ''}`, { state: { game } });
    window.scrollTo(0, 0);
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

    const gameId = parseInt(game.id, 10);
    const payload = {
      id: gameId,
      name: game.name || 'Unknown Game',
      background_image: game.background_image || 'https://via.placeholder.com/300x300?text=No+Image',
      rating: parseFloat(game.rating) || 0,
      userRating: validatedRating
    };

    const headers = user.token ? { Authorization: `Bearer ${user.token}` } : {};

    try {
      if (isNaN(gameId)) {
        throw new Error('Invalid game ID');
      }

      console.log('Sending rating payload:', payload);
      const hasRated = userRating !== null;
      const method = hasRated ? 'put' : 'post';
      console.log(`Using method: ${method.toUpperCase()}`);

      const response = await axios[method](`http://localhost:9000/games/rate`, payload, { headers });

      console.log(`Rating ${hasRated ? 'updated' : 'saved'}:`, response.data);

      setUserRating(validatedRating);
    } catch (err) {
      console.error('Error processing rating:', err);
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
            console.log('Rating updated:', putResponse.data);
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

  const renderAvgRating = () => {
    const rating = avgRating;
    const fractionalPart = rating % 1;
    const isHalfStar = Math.abs(fractionalPart - 0.5) < 0.05;
    const fullStars = isHalfStar ? Math.floor(rating) : Math.round(rating);

    return (
      <div className="game-card__avg-rating" aria-label={`Average Rating: ${rating.toFixed(1)} out of 5`}>
        {[...Array(5)].map((_, i) => {
          let icon;
          let className = 'game-card__avg-star';
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
            />
          );
        })}
        <span className="game-card__avg-rating-text">
          {rating === 0 ? 'No rating available' : `(${rating.toFixed(1)} / 5)`}
        </span>
      </div>
    );
  };

  const gameName = game.name || 'Unknown Game';
  const gameImage = game.background_image || 'https://via.placeholder.com/300x300?text=No+Image';
  const gameId = game.id || '';
  const genres = game.genres && game.genres.length > 0 ? game.genres.map(g => g.name).join(', ') : 'Unknown Genre';

  const getGameCardClass = () => {
    if (userRating === 5) {
      return 'game-card game-card--rated-five';
    } else if (userRating <= 2 && userRating > 0) {
      return 'game-card game-card--rated-low';
    }
    return 'game-card';
  };

  const getScoreClass = () => {
    if (userRating === 5) {
      return 'game-card__score game-card__score--rated-five';
    } else if (userRating <= 2 && userRating > 0) {
      return 'game-card__score game-card__score--rated-low';
    }
    return 'game-card__score';
  };

  return (
    <div className={getGameCardClass()} onClick={handleDetailsClick}>
      <div className="game-card__image-container">
        <img className="game-card__image" src={gameImage} alt={gameName} />
        {/* <div className="game-card__genre-banner">{genres}</div> */}
        {/* <div className="game-card__genre-banner">{gameName}</div> */}
        <h2 className="game-card__title game-card__title--default">{gameName}</h2>
      </div>
      <div className="game-card__details">
        <h3 className="game-card__new-title">{genres}</h3>
        {avgRating !== null && renderAvgRating()}
        <div className="game-card__blurred-section">
          <div className={!user?.id ? "game-card__blurred-content" : ""}>
            <UserStarRating
              apiId={gameId}
              userRating={userRating}
              handleStarClick={handleStarClick}
              hoverRating={hoverRating}
              setHoverRating={setHoverRating}
              loading={loading}
              isLoggedIn={!!user?.id}
            />
            {error && <div className="game-card__error">{error}</div>}
            {successMessage && <div className="game-card__success">{successMessage}</div>}
            <span className="game-card__rating-text">
              {loading ? 'Saving...' : userRating !== null ? `My Rating: ${userRating} / 5` : 'Rate this game'}
            </span>

            {/* Game list options section */}
            <div className="game-card__options">
              {/* Choose the layout you want: horizontal (original) or vertical (new option) */}
              <div className="game-card__options-container">
                {/* Wishlist button with tooltip */}
                <div className="game-card__icon-button-wrapper">
                  <IconButton
                    type="wishlist"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking button
                      handleOptionSelect('Wish-list');
                    }}
                    className={`game-card__icon-button ${isInWishlist ? 'game-card__option-button--selected' : ''}`}
                    disabled={isInWishlist || isInPlaying || isInFinished}
                  />
                  <span className="game-card__tooltip">
                    {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                  </span>
                </div>

                {/* Playing button with tooltip */}
                <div className="game-card__icon-button-wrapper">
                  <IconButton
                    type="playing"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking button
                      handleOptionSelect('Playing');
                    }}
                    className={`game-card__icon-button ${isInPlaying ? 'game-card__option-button--selected' : ''}`}
                    disabled={isInWishlist || isInPlaying || isInFinished}
                  />
                  <span className="game-card__tooltip">
                    {isInPlaying ? 'Currently Playing' : 'Add to Currently Playing'}
                  </span>
                </div>

                {/* Finished button with tooltip */}
                <div className="game-card__icon-button-wrapper">
                  <IconButton
                    type="finished"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking button
                      handleOptionSelect('Finished');
                    }}
                    className={`game-card__icon-button ${isInFinished ? 'game-card__option-button--selected' : ''}`}
                    disabled={isInWishlist || isInPlaying || isInFinished}
                  />
                  <span className="game-card__tooltip">
                    {isInFinished ? 'Completed' : 'Add to Finished'}
                  </span>
                </div>
              </div>

              {selectedOption && (
                <div className="game-card__selected-option">
                  Added to List: {selectedOption}
                </div>
              )}
            </div>

            {/* <NavLink
              className="game-card__details-button"
              to={`/details/${gameId}`}
              state={{ game }}
              onClick={handleDetailsClick}
            >
              Details
            </NavLink> */}
          </div>
          {!user?.id && (
            <div className="game-card__login-overlay">
              <p>Login required to rate, track, and view details</p>
              <button
                className="game-card__login-button"
                // onClick={() => navigate('/login')}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/login');
                }}
              >
                Login Now
              </button>
            </div>
          )}
        </div>
      </div>
      {userRating !== null && (
        <span className={getScoreClass()}>
          {userRating}/5
        </span>
      )}
    </div>
  );
}

GameTile2.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    background_image: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default GameTile2;