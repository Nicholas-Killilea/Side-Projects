import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext'; 
import axios from 'axios';
import WishList from './Wishlist';
import PlayingList from './PlayingList';
import FinishedList from './FinishedList';
import './UserLists.css';

export default function UserList() {
  const user = useContext(UserContext);
  const [wishListGames, setWishListGames] = useState([]);
  const [playingListGames, setPlayingListGames] = useState([]);
  const [finishedListGames, setFinishedListGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data if user is logged in
    if (user) {
      fetchAllUserLists();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchAllUserLists = async () => {
    try {
      setLoading(true);
      // Run all three data fetching functions in parallel
      await Promise.all([
        getWishListData(),
        getPlayingListData(),
        getFinishedListData()
      ]);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user lists');
      setLoading(false);
      console.error('Error fetching user lists:', err);
    }
  };

  async function getWishListData() {
    let newWishList = [];

    try {
      const response = await axios.get('http://localhost:9000/users/games/user/wishlist');
      console.log("Wishlist API response:", response.data);
      newWishList = response.data;
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      throw err;
    }
  
    const gameIds = newWishList.map(item => item.game_id);

    if (gameIds.length === 0) {
      setWishListGames([]);
      return;
    }
  
    // Create an array to hold the merged game objects
    const mergedGameObjects = [];
    
    // For each game in the wishlist
    for (const wishlistItem of newWishList) {
      try {
        // Fetch additional game details
        const gameResponse = await axios.get(`http://localhost:9000/games/${wishlistItem.game_id}`);
        console.log(`Additional game data for ID ${wishlistItem.game_id}:`, gameResponse.data);
        
        // Create a merged object by combining the wishlist item with the game details
        // Important: original data properties are preserved
        const mergedGameObject = {
          ...wishlistItem,           // Keep all original properties from wishlist
          ...gameResponse.data,      // Add additional properties from game details
          // Ensure critical properties from original data are not overwritten
          api_id: wishlistItem.api_id || gameResponse.data.api_id
        };
        
        mergedGameObjects.push(mergedGameObject);
      } catch (err) {
        console.error(`Error fetching details for game ${wishlistItem.game_id}:`, err);
        // Add the original wishlist item even if additional details couldn't be fetched
        mergedGameObjects.push(wishlistItem);
      }
    }
    
    console.log("Final merged wishlist data:", mergedGameObjects);
    setWishListGames(mergedGameObjects);
  }

  async function getPlayingListData() {
    let newPlayingList = [];

    try {
      const response = await axios.get('http://localhost:9000/users/games/user/playing');
      console.log("Playing list API response:", response.data);
      newPlayingList = response.data;
    } catch (err) {
      console.error('Error fetching playing list:', err);
      throw err;
    }

    const gameIds = newPlayingList.map(item => item.game_id);

    if (gameIds.length === 0) {
      setPlayingListGames([]);
      return;
    }

    // Create an array to hold the merged game objects
    const mergedGameObjects = [];
    
    // For each game in the playing list
    for (const playingItem of newPlayingList) {
      try {
        // Fetch additional game details
        const gameResponse = await axios.get(`http://localhost:9000/games/${playingItem.game_id}`);
        console.log(`Additional game data for ID ${playingItem.game_id}:`, gameResponse.data);
        
        // Create a merged object by combining the playing item with the game details
        // Important: original data properties are preserved
        const mergedGameObject = {
          ...playingItem,           // Keep all original properties from playing list
          ...gameResponse.data,     // Add additional properties from game details
          // Ensure critical properties from original data are not overwritten
          api_id: playingItem.api_id || gameResponse.data.api_id
        };
        
        mergedGameObjects.push(mergedGameObject);
      } catch (err) {
        console.error(`Error fetching details for game ${playingItem.game_id}:`, err);
        // Add the original playing item even if additional details couldn't be fetched
        mergedGameObjects.push(playingItem);
      }
    }
    
    console.log("Final merged playing data:", mergedGameObjects);
    setPlayingListGames(mergedGameObjects);
  }

  async function getFinishedListData() {
    let newFinishedList = [];

    try {
      const response = await axios.get('http://localhost:9000/users/games/user/finished');
      console.log("Finished list API response:", response.data);
      newFinishedList = response.data;
    } catch (err) {
      console.error('Error fetching finished list:', err);
      throw err;
    }

    const gameIds = newFinishedList.map(item => item.game_id);

    if (gameIds.length === 0) {
      setFinishedListGames([]);
      return;
    }

    // Create an array to hold the merged game objects
    const mergedGameObjects = [];
    
    // For each game in the finished list
    for (const finishedItem of newFinishedList) {
      try {
        // Fetch additional game details
        const gameResponse = await axios.get(`http://localhost:9000/games/${finishedItem.game_id}`);
        console.log(`Additional game data for ID ${finishedItem.game_id}:`, gameResponse.data);
        
        // Create a merged object by combining the finished item with the game details
        // Important: original data properties are preserved
        const mergedGameObject = {
          ...finishedItem,           // Keep all original properties from finished list
          ...gameResponse.data,      // Add additional properties from game details
          // Ensure critical properties from original data are not overwritten
          api_id: finishedItem.api_id || gameResponse.data.api_id
        };
        
        mergedGameObjects.push(mergedGameObject);
      } catch (err) {
        console.error(`Error fetching details for game ${finishedItem.game_id}:`, err);
        // Add the original finished item even if additional details couldn't be fetched
        mergedGameObjects.push(finishedItem);
      }
    }
    
    console.log("Final merged finished data:", mergedGameObjects);
    setFinishedListGames(mergedGameObjects);
  }

  if (!user) {
    return <div className="text-center py-8">Please log in to view your game lists</div>;
  }

  if (loading) {
    return <div className="text-center py-8">Loading your game lists...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="list-section">
        <h2 className="text-xl font-bold mb-4">WishList</h2>
        <WishList games={wishListGames} />
      </div>
      
      <div className="list-section">
        <h2 className="text-xl font-bold mb-4">Currently Playing</h2>
        <PlayingList games={playingListGames} />
      </div>
      
      <div className="list-section">
        <h2 className="text-xl font-bold mb-4">Finished Games</h2>
        <FinishedList games={finishedListGames} />
      </div>
    </div>
  );
}