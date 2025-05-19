
package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.*;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;

import javax.swing.plaf.synth.Region;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JdbcUserRatingAndReviewDao implements RatingAndReviewDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcUserRatingAndReviewDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public boolean addUserRating(int rating, int gameId, int userId) {
        //Evaluate this code to see if it works

            try {
                String insertSql = "INSERT INTO user_games (user_id, game_id, star_rating) VALUES (?, ?, ?)";
                if(jdbcTemplate.update(insertSql,userId, gameId, rating)>0) {
                    return true;
                }
                else {
                    return false;
                    }

            } catch (Exception e) {
                System.err.println("Error inserting rating: " + e.getMessage());
                throw e;
            }
    }

    @Override
    public boolean updateUserRating(int userId, int gameId, int rating) {
        try {
            String insertSql = "UPDATE user_games set star_rating=? where user_id=? and game_id=?";
            if(jdbcTemplate.update(insertSql,rating, userId, gameId)>0){
                return true;
            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.err.println("Error inserting rating: " + e.getMessage());
            throw e;
        }

    }

    @Override
    public  boolean addReview(int gameId, int userId, String review)
    {
        //Evaluate this code to see if it works

        try {
            String insertSql = "INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (?, ?, ?)";
            if(jdbcTemplate.update(insertSql,userId, gameId, review)>0) {
                return true;
            }
            else {
                return false;
            }

        } catch (Exception e) {
            System.err.println("Error inserting rating: " + e.getMessage());
            throw e;
        }

    }

    @Override
    public  boolean updateReview(int gameId, int userId, String review)
    {
        //Evaluate this code to see if it works

        try {
            String insertSql = "UPDATE user_reviews set review_text = ? where user_id=? and Game_id=?";
            if(jdbcTemplate.update(insertSql, review, userId, gameId)>0) {
                return true;
            }
            else {
                return false;
            }

        } catch (Exception e) {
            System.err.println("Error inserting rating: " + e.getMessage());
            throw e;
        }

    }

    @Override
    public List<Map<String, Object>> getUserRatings(int userId) { // I swear I'll change it to an object. I promise.
        List<Map<String, Object>> userRatings = new ArrayList<>();

        String sql = "SELECT ug.user_game_id, ug.user_id, ug.game_id, ug.star_rating, " +
                "g.name as game_name, g.image_url as game_image_url, g.avg_rating " +
                "FROM user_games ug " +
                "JOIN games g ON ug.game_id = g.game_id " +
                "WHERE ug.user_id = ? AND ug.star_rating IS NOT NULL " +
                "ORDER BY ug.user_game_id DESC";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                Map<String, Object> rating = new HashMap<>();
                rating.put("id", results.getInt("user_game_id"));
                rating.put("userId", results.getInt("user_id"));
                rating.put("gameId", results.getInt("game_id"));
                rating.put("rating", results.getInt("star_rating"));
                rating.put("gameName", results.getString("game_name"));
                rating.put("gameImageUrl", results.getString("game_image_url"));
                rating.put("avgRating", results.getDouble("avg_rating"));

                userRatings.add(rating);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (Exception e) {
            throw new DaoException("Error retrieving user ratings", e);
        }

        return userRatings;
    }

    @Override
    public List<Map<String, Object>> getUserRatingsWithApiId(int userId) {
        List<Map<String, Object>> userRatings = new ArrayList<>();

        String sql = "SELECT ug.user_game_id, ug.user_id, ug.game_id, ug.star_rating, " +
                "g.name as game_name, g.image_url as game_image_url, g.avg_rating, g.api_id " +
                "FROM user_games ug " +
                "JOIN games g ON ug.game_id = g.game_id " +
                "WHERE ug.user_id = ? AND ug.star_rating IS NOT NULL " +
                "ORDER BY ug.user_game_id DESC";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                Map<String, Object> rating = new HashMap<>();
                rating.put("id", results.getInt("user_game_id"));
                rating.put("userId", results.getInt("user_id"));
                rating.put("gameId", results.getInt("game_id"));
                rating.put("rating", results.getInt("star_rating"));
                rating.put("gameName", results.getString("game_name"));
                rating.put("gameImageUrl", results.getString("game_image_url"));
                rating.put("avgRating", results.getDouble("avg_rating"));
                rating.put("apiId", results.getInt("api_id"));

                userRatings.add(rating);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (Exception e) {
            throw new DaoException("Error retrieving user ratings", e);
        }

        return userRatings;
    }

    @Override
    public List<Map<String, Object>> getAllRatings() {
        List<Map<String, Object>> allRatings = new ArrayList<>();

        String sql = "SELECT ug.user_game_id, ug.user_id, ug.game_id, ug.star_rating, " +
                "g.name as game_name, g.image_url as game_image_url, g.api_id, g.avg_rating, " +
                "u.username as username " +
                "FROM user_games ug " +
                "JOIN games g ON ug.game_id = g.game_id " +
                "JOIN users u ON ug.user_id = u.user_id " +
                "WHERE ug.star_rating IS NOT NULL " +
                "ORDER BY ug.user_game_id DESC";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Map<String, Object> rating = new HashMap<>();

                // Rating info
                rating.put("id", results.getInt("user_game_id"));
                rating.put("userId", results.getInt("user_id"));
                rating.put("gameId", results.getInt("game_id"));
                rating.put("rating", results.getInt("star_rating"));

                // Game info
                rating.put("gameName", results.getString("game_name"));
                rating.put("gameImageUrl", results.getString("game_image_url"));
                rating.put("apiId", results.getInt("api_id"));
                rating.put("avgRating", results.getDouble("avg_rating"));

                // User info
                rating.put("username", results.getString("username"));

                allRatings.add(rating);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (Exception e) {
            throw new DaoException("Error retrieving ratings", e);
        }

        return allRatings;
    }


    @Override
    public List<Map<String, Object>> getUserReviews(int userId) {
        List<Map<String, Object>> userReviews = new ArrayList<>();

        String sql = "SELECT ur.user_review_id, ur.user_id, ur.game_id, ur.review_text, " +
                "g.name as game_name, g.image_url as game_image_url, g.api_id, g.avg_rating " +
                "FROM user_reviews ur " +
                "JOIN games g ON ur.game_id = g.game_id " +
                "WHERE ur.user_id = ? " +
                "ORDER BY ur.user_review_id DESC";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                Map<String, Object> review = new HashMap<>();
                review.put("id", results.getInt("user_review_id"));
                review.put("userId", results.getInt("user_id"));
                review.put("gameId", results.getInt("game_id"));
                review.put("reviewText", results.getString("review_text"));
                review.put("gameName", results.getString("game_name"));
                review.put("gameImageUrl", results.getString("game_image_url"));
                review.put("apiId", results.getInt("api_id"));
                review.put("avgRating", results.getDouble("avg_rating"));

                userReviews.add(review);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (Exception e) {
            throw new DaoException("Error retrieving user reviews", e);
        }

        return userReviews;
    }

    @Override
    public List<Map<String, Object>> getAllReviews() {
        List<Map<String, Object>> allReviews = new ArrayList<>();

        String sql = "SELECT ur.user_review_id, ur.user_id, ur.game_id, ur.review_text, " +
                "g.name as game_name, g.image_url as game_image_url, g.api_id, g.avg_rating, " +
                "u.username as username " +
                "FROM user_reviews ur " +
                "JOIN games g ON ur.game_id = g.game_id " +
                "JOIN users u ON ur.user_id = u.user_id " +  //Added extra join to get user name
                "ORDER BY ur.user_review_id DESC";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Map<String, Object> review = new HashMap<>();

                // Review info
                review.put("id", results.getInt("user_review_id"));
                review.put("userId", results.getInt("user_id"));
                review.put("gameId", results.getInt("game_id"));
                review.put("reviewText", results.getString("review_text"));

                // Game info
                review.put("gameName", results.getString("game_name"));
                review.put("gameImageUrl", results.getString("game_image_url"));
                review.put("apiId", results.getInt("api_id"));
                review.put("avgRating", results.getDouble("avg_rating"));

                // User info
                review.put("username", results.getString("username"));

                allReviews.add(review);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (Exception e) {
            throw new DaoException("Error retrieving reviews", e);
        }

        return allReviews;
    }



    @Override
    public List<Map<String, Object>> getUserGames(int userId) {
        List<Map<String, Object>> userGames = new ArrayList<>();

        String sql = "SELECT DISTINCT g.game_id, g.name, g.image_url, g.api_id, g.avg_rating, " +
                "ug.star_rating, ur.review_text " +
                "FROM games g " +
                "LEFT JOIN user_games ug ON g.game_id = ug.game_id AND ug.user_id = ? " + //IDK how else to do this? But its ugly
                "LEFT JOIN user_reviews ur ON g.game_id = ur.game_id AND ur.user_id = ? " +
                "WHERE (ug.user_id = ? OR ur.user_id = ?) " +
                "ORDER BY g.name";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId, userId, userId, userId);
            while (results.next()) {
                Map<String, Object> game = new HashMap<>();

                // Game info
                game.put("gameId", results.getInt("game_id"));
                game.put("gameName", results.getString("name"));
                game.put("gameImageUrl", results.getString("image_url"));
                game.put("apiId", results.getInt("api_id"));
                game.put("avgRating", results.getDouble("avg_rating"));

                // User's rating and review if they exist
                game.put("userRating", results.getObject("star_rating") != null ?
                        results.getInt("star_rating") : null);
                game.put("userReview", results.getString("review_text"));

                // Add flags to easily check if the user has rated or reviewed
                game.put("hasRating", results.getObject("star_rating") != null);
                game.put("hasReview", results.getString("review_text") != null);

                userGames.add(game);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (Exception e) {
            throw new DaoException("Error retrieving user games", e);
        }

        return userGames;
    }

    @Override
    public Integer getUserRatingForGame(int userId, int gameId) {
        String sql = "SELECT star_rating FROM user_games WHERE user_id = ? AND game_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId, gameId);
            if (results.next()) {
                return results.getInt("star_rating");
            }
            return null;
        } catch (Exception e) {
            throw new DaoException("Error getting user rating for game", e);
        }
    }

    @Override
    public String getUserReviewForGame(int userId, int gameId) {
        String sql = "SELECT review_text FROM user_reviews WHERE user_id = ? AND game_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId, gameId);
            if (results.next()) {
                return results.getString("review_text");
            }
            return null;
        } catch (Exception e) {
            throw new DaoException("Error getting user review for game", e);
        }
    }

    @Override
    public boolean deleteReviewById(int reviewId) {
        try {
            String deleteSql = "DELETE FROM user_reviews WHERE user_review_id = ?";
            int rowsAffected = jdbcTemplate.update(deleteSql, reviewId);

            return rowsAffected > 0;
        } catch (Exception e) {
            System.err.println("Error deleting review: " + e.getMessage());
            throw e;
        }
    }



}
