package com.techelevator.dao;

import java.util.List;
import java.util.Map;

public interface UserListDao {
    boolean addToWishlist(int gameId, int userId);
    boolean addToPlayingList(int gameId, int userId);
    boolean addToFinishedList(int gameId, int userId);
    boolean updateWishlist(int gameId, int userId, int wishlistId);
    boolean deleteWishlistById(int gameId);
    boolean deletePlayingById(int gameId);
    boolean deleteFinishedById(int gameId);
    List<Map<String, Object>> getUserWishList(int userId);
    List<Map<String, Object>> getUserPlayingList(int userId);
    List<Map<String, Object>> getUserFinishedList(int userId);
}


