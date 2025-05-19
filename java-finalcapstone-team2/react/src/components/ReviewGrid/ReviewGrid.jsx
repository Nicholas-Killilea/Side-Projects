import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from '../../context/UserContext';
import ReviewCard from "../UserReviews/ReviewCard";

function ReviewGrid({userId}) {
    const user = useContext(UserContext);
    const [reviews, setReviews] = useState([]); // Initialize with an empty array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //THIS IS FOR GETTING REVIEWS FOR THIS GAME BY USER ID

            // useEffect(() => {
            //     const fetchUserReviews = async () => {
            //         if (!user?.id) return; // Ensure user is logged in

            //         setLoading(true);
            //         try {
            //             const response = await axios.get(`/games/review`); //NEED ENDPOINT to get list of reviews by GAME ID
            //             setReviews(response.data); 
            //         } catch (err) {
            //             console.error("Error fetching user reviews:", err);
            //             setError("Failed to load reviews.");
            //         } finally {
            //             setLoading(false);
            //         }
            //     };

            //     fetchUserReviews();
            // }, []); 

    //THIS IS FOR GETTING ALL REVIEWS FOR THIS GAME

            // useEffect(() => {
            //     const fetchUserReviews = async () => {
            //         if (!user?.id) return; // Ensure user is logged in

            //         setLoading(true);
            //         try {
            //             const response = await axios.get(`/games/review`); //NEED ENDPOINT to get list of reviews by GAME ID
            //             setReviews(response.data); 
            //         } catch (err) {
            //             console.error("Error fetching user reviews:", err);
            //             setError("Failed to load reviews.");
            //         } finally {
            //             setLoading(false);
            //         }
            //     };

            //     fetchUserReviews();
            // }, []); 

    

        if(userId){
            return (
                <div>
                    <h2>{user?.username}'s Reviews</h2>
        
                    {loading && <p>Loading reviews...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
        
                    {reviews.length > 0 ? (
                        <div className="review-grid">
                            {reviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p>You haven't left any reviews yet.</p>
                    )}
                </div>
            );
        }else{
            return (
                <div>
                    <h2>ALL Reviews</h2>
        
                    {loading && <p>Loading reviews...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
        
                    {reviews.length > 0 ? (
                        <div className="review-grid">
                            {reviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p>There are no reviews yet</p>
                    )}
                </div>
            );
        }
   
}

export default ReviewGrid;
