package com.techelevator.model;
                                    // WE'LL LEAVE THIS ALONE FOR THIS SPRINT
import java.util.List;

public class UserReviews {
    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
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

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    private String review;
    private int userId;
    private int gameId;
}