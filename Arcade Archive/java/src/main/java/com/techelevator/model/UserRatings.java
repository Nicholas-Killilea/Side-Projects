package com.techelevator.model;

import java.util.List;

public class UserRatings {
    private int userRatingId;
    private int userId;
    private int gameId;
    private int rating;

    private List<Integer> ratings;
    private int userRating;

    // Default constructor
    public UserRatings() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int userId) { this.gameId = gameId;    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

}