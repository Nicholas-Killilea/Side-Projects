package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Component
public class JdbcUserListDao implements UserListDao {

    public final JdbcTemplate jdbcTemplate;

    public JdbcUserListDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean addToWishlist(int gameId, int userId) {
        try {
            String insertSql = "INSERT INTO wishlist (user_id, game_id) VALUES (?, ?)";
            return jdbcTemplate.update(insertSql, userId, gameId) > 0;

        } catch (Exception e) {
            System.err.println("Error inserting to wishlist: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public boolean addToPlayingList(int gameId, int userId) {
        try {
            String insertSql = "INSERT INTO playing (user_id, game_id) VALUES (?, ?)";
            return jdbcTemplate.update(insertSql, userId, gameId) > 0;

        } catch (Exception e) {
            System.err.println("Error inserting to playing: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public boolean addToFinishedList(int gameId, int userId) {
        try {
            String insertSql = "INSERT INTO finished (user_id, game_id) VALUES (?, ?)";
            return jdbcTemplate.update(insertSql, userId, gameId) > 0;

        } catch (Exception e) {
            System.err.println("Error inserting to playing: " + e.getMessage());
            throw e;
        }
    }


    @Override
    public boolean updateWishlist(int gameId, int userId, int wishlistId) {
        // This method needs to be implemented
        throw new UnsupportedOperationException("Method not implemented yet");
    }

    @Override
    public List<Map<String, Object>> getUserWishList(int userId) {
        String sql = "SELECT g.game_id, g.api_id, g.name, g.image_url, g.avg_rating " +
                "FROM games g " +
                "JOIN wishlist w ON g.game_id = w.game_id " +
                "WHERE w.user_id = ?";
        try {
            return jdbcTemplate.queryForList(sql, userId);
        } catch (Exception e) {
            System.err.println("Error retrieving wishlist: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public List<Map<String, Object>> getUserPlayingList(int userId) {
        String sql = "SELECT g.game_id, g.api_id, g.name, g.image_url, g.avg_rating " +
                "FROM games g " +
                "JOIN playing p ON g.game_id = p.game_id " +
                "WHERE p.user_id = ?";
        try {
            return jdbcTemplate.queryForList(sql, userId);
        } catch (Exception e) {
            System.err.println("Error retrieving wishlist: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public List<Map<String, Object>> getUserFinishedList(int userId) {
        String sql = "SELECT g.game_id, g.api_id, g.name, g.image_url, g.avg_rating " +
                "FROM games g " +
                "JOIN finished f ON g.game_id = f.game_id " +
                "WHERE f.user_id = ?";
        try {
            return jdbcTemplate.queryForList(sql, userId);
        } catch (Exception e) {
            System.err.println("Error retrieving wishlist: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public boolean deleteWishlistById(int gameId) {
        try {
            String deleteSql = "DELETE FROM wishlist WHERE game_Id = ?";
            int rowsAffected = jdbcTemplate.update(deleteSql, gameId);

            return rowsAffected > 0;
        } catch (Exception e) {
            System.err.println("Error removing game: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public boolean deletePlayingById(int gameId) {
        try {
            String deleteSql = "DELETE FROM playing WHERE game_Id = ?";
            int rowsAffected = jdbcTemplate.update(deleteSql, gameId);

            return rowsAffected > 0;
        } catch (Exception e) {
            System.err.println("Error removing game: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public boolean deleteFinishedById(int gameId) {
        try {
            String deleteSql = "DELETE FROM finished WHERE game_Id = ?";
            int rowsAffected = jdbcTemplate.update(deleteSql, gameId);

            return rowsAffected > 0;
        } catch (Exception e) {
            System.err.println("Error removing game: " + e.getMessage());
            throw e;
        }
    }


}