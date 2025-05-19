import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import GameGrid from '../../components/GameGrid/GameGrid';
import FeaturedReviews from '../../components/UserReviews/FeaturedReviews';
import styles from './HomeView.module.css';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGamepad, faThumbsUp, faList, faSearch, faTrophy } from '@fortawesome/free-solid-svg-icons';
import FeatureGames from '../../components/FeaturedGames';


export default function HomeView() {
  const user = useContext(UserContext);
  const [userStats, setUserStats] = useState({
    gamesRated: 0,
    totalReviews: 0,
    topRatedGame: null,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch user stats when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        // Get user ratings
        const ratingsResponse = await axios.get(`/users/ratings/${user.id}`);
        const ratings = ratingsResponse.data || [];
        
        // Get user reviews
        const reviewsResponse = await axios.get(`/users/reviews/${user.id}`);
        const reviews = reviewsResponse.data || [];
        
        // Get user games
        const gamesResponse = await axios.get(`/users/games/user/${user.id}`);
        const games = gamesResponse.data || [];
        
        // Find top rated game
        let topRated = null;
        if (ratings.length > 0) {
          topRated = ratings.reduce((prev, current) => 
            (prev.rating > current.rating) ? prev : current
          );
        }
        
        // Combine activities (both ratings and reviews)
        const recentActivity = [
          ...ratings.map(r => ({ 
            type: 'rating', 
            game: r.gameName, 
            value: r.rating, 
            date: new Date().toLocaleDateString(), // Would ideally come from backend
            imageUrl: r.gameImageUrl
          })),
          ...reviews.map(r => ({ 
            type: 'review', 
            game: r.gameName, 
            value: r.reviewText.substring(0, 60) + '...', 
            date: new Date().toLocaleDateString(), // Would ideally come from backend
            imageUrl: r.gameImageUrl
          }))
        ];
        
        // Sort by most recent first (would need timestamp from backend)
        recentActivity.sort((a, b) => 0).slice(0, 3);
        
        setUserStats({
          gamesRated: ratings.length,
          totalReviews: reviews.length,
          topRatedGame: topRated,
          recentActivity: recentActivity.slice(0, 3) // Only show 3 most recent
        });
        
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  if (!user) {
    return (
      <div className={`${styles.homeContainer} ${styles.loggedOut}`}>
        <div className={`${styles.welcomeContainer}`}>
        <div className={styles.logoWrapper}>
  <img 
    src="/images/arcade-logo.png" 
    alt="Arcade Archive" 
    className={styles.logoImage} 
  />
</div>
          <p className={styles.welcomeMessage}>Track, rate, and discover your next favorite game!</p>
        </div>
        
        <div className={styles.benefits}>
          <p>Not a member?</p>
          <Link to="/register">New? Register here!</Link>
    
          <h2>Keep your gaming experience organized</h2>
          <h2>8000+ games to choose from</h2>
          <h2>See ratings and reviews from fellow gamers</h2>
        </div>
        
        <div>
          <FeaturedReviews></FeaturedReviews>
        </div>

        <div>
          <h2 className={styles.featuredGamesTitle}>Featured Games</h2>
        </div>

        <GameGrid />
        
        <div className={styles.searchSection}>
          <h2 className={styles.searchTitle}>Looking for something specific?</h2>
          <p className={styles.searchText}>
            Our comprehensive search allows you to find games by title, genre, and release year.
          </p>
          <NavLink to="/search" className={styles.searchLink}>
            Go to Search Page
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.homeContainer} ${styles.loggedIn}`}>
      {/* welcome section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.pageTitle}>Welcome back, {user.username}!</h1>
          <p className={styles.welcomeMessage}>
            Ready to discover new games or update your collection?
          </p>
        </div>
      </section>

      {/* User stats dashboard */}
      <section className={styles.statsDashboard}>
        <div className={styles.statCard}>
          <FontAwesomeIcon icon={faStar} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <h3>Games Rated</h3>
            <p className={styles.statValue}>{userStats.gamesRated}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <FontAwesomeIcon icon={faThumbsUp} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <h3>Reviews Written</h3>
            <p className={styles.statValue}>{userStats.totalReviews}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <FontAwesomeIcon icon={faTrophy} className={styles.statIcon} />
          <div className={styles.statInfo}>
            <h3>Your Top Game</h3>
            <p className={styles.statValue}>{userStats.topRatedGame ? userStats.topRatedGame.gameName : 'None yet'}</p>
          </div>
        </div>
      </section>

      {/* Quick access section */}
      <section className={styles.quickAccessSection}>
        <h2 className={styles.sectionTitle}>Quick Access</h2>
        <div className={styles.quickAccessGrid}>
          <NavLink to="/dashboard" className={styles.quickAccessCard}>
            <FontAwesomeIcon icon={faList} className={styles.quickAccessIcon} />
            <span>My Ratings & Reviews</span>
          </NavLink>
          
          <NavLink to="/search" className={styles.quickAccessCard}>
            <FontAwesomeIcon icon={faSearch} className={styles.quickAccessIcon} />
            <span>Search Games</span>
          </NavLink>
          
          <NavLink to="/dashboard" className={styles.quickAccessCard}>
            <FontAwesomeIcon icon={faGamepad} className={styles.quickAccessIcon} />
            <span>My Lists</span>
          </NavLink>
        </div>
      </section>

      {/* Recent activity feed */}
      {userStats.recentActivity.length > 0 && (
        <section className={styles.recentActivitySection}>
          <h2 className={styles.sectionTitle}>Your Recent Activity</h2>
          <div className={styles.activityFeed}>
            {userStats.recentActivity.map((activity, index) => (
              <div key={index} className={styles.activityCard}>
                <img 
                  src={activity.imageUrl || "https://via.placeholder.com/80x45?text=Game"} 
                  alt={activity.game}
                  className={styles.activityImage}
                />
                <div className={styles.activityContent}>
                  <h3>{activity.game}</h3>
                  <p>
                    {activity.type === 'rating' 
                      ? `You rated ${activity.value}/5 stars` 
                      : `You wrote: "${activity.value}"`}
                  </p>
                  <span className={styles.activityDate}>{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
          <NavLink to="/dashboard" className={styles.viewAllLink}>
            View All Activity
          </NavLink>
        </section>
      )}

      {/* Trending games section */}
      <section className={styles.trendingSection}>
        <h2 className={styles.sectionTitle}>Highest Rated </h2>
        <div className={styles.trendingGrid}>
          <FeatureGames></FeatureGames>
        </div>
      </section>

      {/* Game discovery section */}
      <section className={styles.discoverySection}>
        <h2 className={styles.sectionTitle}>Discover Games</h2>
        <GameGrid />
      </section>
    </div>
  );
}