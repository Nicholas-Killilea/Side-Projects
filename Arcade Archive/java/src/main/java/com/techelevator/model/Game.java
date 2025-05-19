package com.techelevator.model;

import java.util.List;

public class Game {
    private String name;
    private String imgFile;
    private double avgRating;
    private Integer userRating;
    private int apiId;
    private int gameId;

    public void setRating(double avgRating) {
        this.avgRating = avgRating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    private String review;


    public Integer getUserRating() {
        return userRating;
    }

    public void setUserRating(Integer userRating) {
        this.userRating = userRating;
    }

    public Game(String name, String imgFile, double avgRating, int apiId, int gameId, String review, int userRating) {
        this.name = name;
        this.imgFile = imgFile;
        this.avgRating = avgRating;
        this.apiId = apiId;
        this.gameId = gameId;
        this.review = review;
        this.userRating=userRating;
    }


    public Game() {

    }

  public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImgFile() {
        return imgFile;
    }

    public void setImgFile(String imgFile) {
        this.imgFile = imgFile;
    }
    public double getAvgRating() {
        return avgRating;
    }
    public void setAvgRating(double avgRating) {
        this.avgRating = avgRating;
    }

    public int getApiId() {
        return apiId;
    }

    public void setApiId(int apiId) {
        this.apiId = apiId;
    }

}
