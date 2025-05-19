// src/components/Icons/IconButton.jsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrashAlt,
  faPen,
  faHeart,
  faGamepad,
  faFlagCheckered // Change to the checkered flag icon
} from '@fortawesome/free-solid-svg-icons';
import './IconButton.css';

const IconButton = ({ type, onClick, className }) => {
  // Map of icon types to their corresponding FontAwesome icons
  const iconMap = {
    trash: faTrashAlt,
    edit: faPen,
    wishlist: faHeart,
    playing: faGamepad,
    finished: faFlagCheckered // Update to use checkered flag
  };

  // Rest of your component stays the same
  const labelMap = {
    trash: 'Delete',
    edit: 'Edit Review',
    wishlist: 'Add to Wishlist',
    playing: 'Currently Playing',
    finished: 'Completed'
  };

  return (
    <button 
      onClick={onClick}
      className={`icon-button ${type} ${className || ''}`}
      aria-label={labelMap[type]}
    >
      <FontAwesomeIcon icon={iconMap[type]} />
    </button>
  );
};

export default IconButton;