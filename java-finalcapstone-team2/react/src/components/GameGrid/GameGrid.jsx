/* eslint-disable no-case-declarations */
import GameTile2 from '../GameTile/GameTile2';
import styles from './GameGrid.module.css';
import { useState, useEffect } from 'react';

function GameGrid({search, searchCategory}) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredGames, setFilteredGames] = useState([]);
    
    // Initial load of games
    useEffect(() => {
        const fetchGames = async () => {
          try {
            // Access environment variables
            const apiKey = import.meta.env.VITE_API_KEY;
            const apiUrl = import.meta.env.VITE_API_URL;
            
            // Build the complete URL with the API key
            const url = `${apiUrl}games?key=${apiKey}&page_size=40`;
            
            // Make the API call
            const response = await fetch(url);
            
            // Check if the response is successful
            if (!response.ok) {
              throw new Error(`API request failed with status: ${response.status}`);
            }
            
            const data = await response.json();
            setGames(data.results || []);
            setLoading(false);
          } catch (err) {
            console.error("Error fetching games:", err);
            setError(err.message);
            setLoading(false);
          }
        };

        fetchGames();
    }, []);

    // update games when search changes
    useEffect(() => {
      const fetchSearchedGames = async () => {
        setLoading(true);
        
        try {
          if (search && search !== '') {
            // Access environment variables
            const apiKey = import.meta.env.VITE_API_KEY;
            const apiUrl = import.meta.env.VITE_API_URL;
            let url;
            
            switch(searchCategory) {
              case 'Genre':
                // For genre search - using the slug/id for the genre
                url = `${apiUrl}games?key=${apiKey}&genres=${search}`;
                break;
              case 'Year':
                // For year search - assuming search is a year like "2020"
                const startDate = `${search}-01-01`;
                const endDate = `${search}-12-31`;
                url = `${apiUrl}games?key=${apiKey}&dates=${startDate},${endDate}`;
                break;
              case 'Publisher':
                // For publisher search - encode the publisher name
                const encodedPublisher = encodeURIComponent(search);
                url = `${apiUrl}games?key=${apiKey}&publishers=${encodedPublisher}`;
                break;
              case 'Title':
              default:
                // Default to title search
                url = `${apiUrl}games?search=${search}&key=${apiKey}`;
                break;
            }
            
            console.log(`${searchCategory} search URL:`, url);
            
            // Make the API call
            const searchResponse = await fetch(url);
            
            if (!searchResponse.ok) {
              throw new Error(`Search API request failed with status: ${searchResponse.status}`);
            }
            
            const data = await searchResponse.json();
            console.log("Search results:", data);
            
            setFilteredGames(data.results || []);
          } else {
            // If search is empty, show all games
            setFilteredGames(games);
          }
          
          setLoading(false);
        } catch (error) {
          console.error("Error fetching searched games:", error);
          // fallback for better user experience
          if (searchCategory === 'Title') {
            const filtered = games.filter(game => 
              game.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredGames(filtered);
          } else {
            setFilteredGames([]); // Empty results for failed specialized searches
          }
        }
      };
    
      // Only fetch if games are loaded or if there's a search
      if (games.length > 0 || search) {
        fetchSearchedGames();
      }
    }, [search, searchCategory, games]);

    // Render loading state
    if (loading) return <div className={styles.loading}>Loading games...</div>;
    
    // Render error state
    if (error) return <div className={styles.error}>Error: {error}</div>;

    // Main render
    return (
      <div className={styles.gameGrid}>
          {filteredGames && filteredGames.length > 0 ? (
              filteredGames.map((game, index) => (
                <GameTile2 key={game.id || index} game={game}/>
              ))
          ) : (
              <div className={styles.noGames}>
                No games found matching your search.
              </div>
          )}
      </div>
    );
}

export default GameGrid;