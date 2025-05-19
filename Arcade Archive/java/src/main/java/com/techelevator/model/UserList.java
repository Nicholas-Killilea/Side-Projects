package com.techelevator.model;

public class UserList {

    private int userId;
    private int gameId;
    private int wishlistId;
    private int playingId;

    private int finishedId;




    public UserList(int userId, int gameId, int wishlistId, int playingId, int finishedId) {
        this.userId = userId;
        this.gameId = gameId;
        this.wishlistId = wishlistId;
        this.playingId = playingId;
        this.finishedId = finishedId;
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

    public int getWishlistId() {
        return wishlistId;
    }

    public void setWishlistId(int wishlistId) {
        this.wishlistId = wishlistId;
    }
    public int getPlayingId() {
        return playingId;
    }

    public void setPlayingId(int playingId) {
        this.playingId = playingId;
    }
    public int getFinishedId() {
        return finishedId;
    }

    public void setFinishedId(int finishedId) {
        this.finishedId = finishedId;
    }
}