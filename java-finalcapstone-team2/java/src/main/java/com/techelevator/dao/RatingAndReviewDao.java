package com.techelevator.dao;

import com.techelevator.model.UserRatings;
import com.techelevator.model.UserReviews;

import java.util.List;
import java.util.Map;

public interface RatingAndReviewDao {

//    List <UserRatings> getRatings (int userId);
//    List <UserReviews> getReviews (int userId);
//    UserRatings getRatingByUserId(int userId);
    boolean updateUserRating(int userId, int gameId, int rating);
    boolean addUserRating(int rating, int gameId, int userId);
    boolean addReview(int gameId, int userId, String review);
    boolean updateReview(int gameId, int userId, String review);
    Integer getUserRatingForGame(int userId, int gameId);
    String getUserReviewForGame(int userId, int gameId);

    List<Map<String, Object>> getUserGames(int userId);
    List<Map<String, Object>> getUserRatings(int userId);
    List<Map<String, Object>> getUserRatingsWithApiId(int userId);
    List<Map<String, Object>> getUserReviews(int userId);
    List<Map<String, Object>> getAllReviews();
    boolean deleteReviewById(int reviewId);
    List<Map<String, Object>> getAllRatings();

}