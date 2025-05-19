import { Link, NavLink } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './MainNav.module.css';

export default function MainNav() {
  const user = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  
  // Check if the user has admin role
  const isAdmin = user?.authorities?.some(auth => auth.name === 'ROLE_ADMIN');

  // For debugging
  useEffect(() => {
    if (user) {
      console.log('Current user:', user);
      console.log('User authorities:', user.authorities);
      console.log('Is admin?', isAdmin);
    }
  }, [user, isAdmin]);

  // Add animation effect on load
  useEffect(() => {
    const navElement = document.getElementById('main-nav');
    navElement.style.opacity = '0';
    navElement.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      navElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      navElement.style.opacity = '1';
      navElement.style.transform = 'translateY(0)';
    }, 300);
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navElement = document.getElementById('main-nav');
      if (window.scrollY > 20) {
        navElement.classList.add(styles.scrolled);
      } else {
        navElement.classList.remove(styles.scrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if mobile view on mount and window resize
  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Close dropdown menu when switching to desktop
      if (!mobile && menuOpen) {
        setMenuOpen(false);
      }
    }
    
    // Set initial state
    handleResize();
    
    // Add listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          !event.target.closest(`.${styles.menuToggle}`)) {
        setMenuOpen(false);
      }
    }

    // Only add the event listener if the menu is open
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Toggle dropdown menu
  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  // Close menu after clicking a link
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav id="main-nav" className={styles.navContainer}>
      {/* Desktop Navigation */}
      {!isMobile && (
        <div className={styles.navList}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <div className={styles.navLink}>
              <NavLink to="/">Home</NavLink>
            </div>
            
            <div className={styles.navLink}>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </div>
            
            {/* Only show admin link if user has admin role */}
            {isAdmin && (
              <div className={styles.navLink}>
                <NavLink to="/admin">Admin</NavLink>
              </div>
            )}
          </div>
          
          {/* Center Section - Title */}
          <div className={styles.centerSection}>
            <Link to="/" className={styles.titleLink}>
              <h1 className={styles.siteTitle}>ARCADE ARCHIVE</h1>
            </Link>
          </div>
          
          {/* Right Section */}
          <div className={styles.rightSection}>
            {user ? (
              <div className={`${styles.navLink} ${styles.authLink}`}>
                <Link to="/logout">Logout</Link>
              </div>
            ) : (
              <>
                <div className={`${styles.navLink} ${styles.authLink}`}>
                  <NavLink to="/register">Register</NavLink>
                </div>

                <div className={`${styles.navLink} ${styles.authLink}`}>
                  <NavLink to="/login">Login</NavLink>
                </div>
              </>
            )}
                      
            <div className={`${styles.navLink} ${styles.searchIcon}`}>
              <NavLink to="/search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </NavLink>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Navigation */}
      {isMobile && (
        <>
          {/* Hamburger menu button */}
          <button 
            type="button"
            className={styles.menuToggle} 
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
          
          {/* Center title */}
          <Link to="/" className={styles.titleLink}>
            <h1 className={styles.mobileTitle}>ARCADE ARCHIVE</h1>
          </Link>
          
          {/* Search icon on right */}
          <div className={`${styles.navLink} ${styles.searchIcon}`}>
            <NavLink to="/search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </NavLink>
          </div>
          
          {/* Dropdown menu */}
          <div 
            ref={dropdownRef}
            className={`${styles.dropdownMenu} ${menuOpen ? styles.open : ''}`}
          >
            <div className={styles.navLink}>
              <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            </div>
            
            <div className={styles.navLink}>
              <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
            </div>
            
            {/* Only show admin link if user has admin role */}
            {isAdmin && (
              <div className={styles.navLink}>
                <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>
              </div>
            )}
            
            {user ? (
              <div className={styles.navLink}>
                <Link to="/logout" onClick={closeMenu}>Logout</Link>
              </div>
            ) : (
              <>
                <div className={styles.navLink}>
                  <NavLink to="/register" onClick={closeMenu}>Register</NavLink>
                </div>
                
                <div className={styles.navLink}>
                  <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
                </div>
              </>
            )}
            
            <div className={styles.navLink}>
              <NavLink to="/search" onClick={closeMenu}>
                Search <FontAwesomeIcon icon={faMagnifyingGlass} />
              </NavLink>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}