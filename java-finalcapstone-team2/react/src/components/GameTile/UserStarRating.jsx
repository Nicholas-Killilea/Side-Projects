import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import './UserStarRating.css';

function UserStarRating({ apiId, userRating, handleStarClick, hoverRating, setHoverRating, loading, isLoggedIn }) {
  // console.log('UserStarRating render:', { apiId, userRating, hoverRating, loading, isLoggedIn });

  const renderStars = () => {
    const stars = [];
    const displayRating = userRating !== null && userRating !== undefined ? userRating : hoverRating || 0;

    for (let i = 1; i <= 5; i++) {
      const icon = i <= displayRating ? fasStar : farStar;
      const className = `user-star ${i <= displayRating ? 'filled' : 'empty'}`;

      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={icon}
          className={className}
          onMouseEnter={() => !loading && isLoggedIn && setHoverRating(i)}
          onMouseLeave={() => !loading && isLoggedIn && setHoverRating(0)}
          onClick={(e) => {
            // Stop event propagation to prevent parent tile click
            e.stopPropagation();
            if (!loading && isLoggedIn) {
              handleStarClick(i);
            }
          }}
          // onClick={() => !loading && isLoggedIn && handleStarClick(i)}
          style={{ cursor: loading || !isLoggedIn ? 'default' : 'pointer', color: '#ffd700' }}
          aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="user-star-rating" aria-label="User rating" onClick={(e) => e.stopPropagation()}>
      {renderStars()}
    </div>
  );
}

UserStarRating.propTypes = {
  apiId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  userRating: PropTypes.number,
  handleStarClick: PropTypes.func.isRequired,
  hoverRating: PropTypes.number.isRequired,
  setHoverRating: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default UserStarRating;