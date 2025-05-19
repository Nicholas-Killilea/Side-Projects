// Update this in the handleOptionSelect method in your GameTile2.js, gameDetails and searchPage.

// const handleOptionSelect = (option) => {
//     // First check if user is logged in
//     if (!user?.id) {
//       setError('Please log in to add games to your lists.');
//       return;
//     }
  
//     // Clear previous messages
//     setError(null);
//     setSuccessMessage(null);
  
//     // Map option names to endpoint names and states for consistency
//     const optionDetails = {
//       'Wish-list': { endpoint: 'wishlist', stateVar: isInWishlist },
//       'Playing': { endpoint: 'playing', stateVar: isInPlaying },
//       'Finished': { endpoint: 'finished', stateVar: isInFinished }
//     };
  
//     const { endpoint, stateVar } = optionDetails[option] || {};
  
//     if (!endpoint) {
//       setError('Invalid option selected.');
//       return;
//     }
  
//     // Check if the game is already in the selected list
//     // We'll rely on the backend to handle this check now, so we remove the client-side check
    
//     const gameData = {
//       id: parseInt(game.id, 10),
//       name: game.name || 'Unknown Game',
//       background_image: game.background_image || 'https://via.placeholder.com/300x300?text=No+Image',
//       rating: game.rating
//     };
  
//     axios.post(`http://localhost:9000/users/games/user/${endpoint}`, gameData, {
//       withCredentials: true
//     })
//       .then(response => {
//         console.log(`Game added to ${endpoint} successfully:`, response.data);
//         setSelectedOption(option);
  
//         // Update the status flags to reflect the new state
//         if (endpoint === 'wishlist') {
//           setIsInWishlist(true);
//         } else if (endpoint === 'playing') {
//           setIsInPlaying(true);
//         } else if (endpoint === 'finished') {
//           setIsInFinished(true);
//         }
  
//         // Show success message
//         setSuccessMessage(`Game added to your ${option} list!`);
//       })
//       .catch(err => {
//         console.error(`Error adding game to ${endpoint}:`, err);
        
//         // Extract meaningful error message from the response if available
//         let errorMsg = `Failed to add game to ${endpoint}. Please try again.`;
        
//         if (err.response && err.response.data) {
//           // Most Spring Boot error responses will have message in the data
//           errorMsg = err.response.data.message || err.response.data || errorMsg;
//         }
        
//         setError(errorMsg);
        
//         // If the message indicates the game is already in this list,
//         // we should update our UI state to reflect that
//         if (errorMsg.includes(`already in your ${option.toLowerCase()}`)) {
//           if (endpoint === 'wishlist') {
//             setIsInWishlist(true);
//           } else if (endpoint === 'playing') {
//             setIsInPlaying(true);
//           } else if (endpoint === 'finished') {
//             setIsInFinished(true);
//           }
//         }
//       });
//   };