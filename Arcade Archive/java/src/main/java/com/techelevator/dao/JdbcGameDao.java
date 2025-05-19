package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Game;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcGameDao implements GameDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcGameDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //approved
//    @Override
//    public List<Game> getGamesByUserId(int userId) {
//        List<Game> games = new ArrayList<>();
//        String sql = "SELECT g.game_id, g.name, g.image_url, g.avg_rating, g.api_id, " +
//                "ug.star_rating " +
//                "FROM games g " +
//                "JOIN user_games ug ON g.game_id = ug.game_id " +
//                "WHERE ug.user_id = ?;";
//        try {
//            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
//            while (results.next()) {
//                Game game = mapRowToGame(results);
//                // Set the user's rating for this game
//                if (results.getObject("star_rating") != null) {
//                    game.setUserRating(results.getInt("star_rating"));
//                }
//                games.add(game);
//            }
//        } catch (CannotGetJdbcConnectionException e) {
//            throw new DaoException("Unable to connect to server or database", e);
//        }
//        return games;
//    }

//    @Override
//    public List<Game> getAllGames() {
//        List<Game> games = new ArrayList<>();
//        String sql = "SELECT game_id, name, image_url, avg_rating FROM games;";
//        try {
//            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
//            while (results.next()) {
//                Game game = mapRowToGame(results);
//                games.add(game);
//            }
//        } catch (CannotGetJdbcConnectionException e) {
//            throw new DaoException("Unable to connect to server or database", e);
//        }
//        return games;
//    }

    @Override
    public Game getGameByInternalId(int gameId) {
        Game game = null;
        String sql = "SELECT game_id, name, image_url, avg_rating, api_id " +
                "FROM games WHERE game_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, gameId);
            if (results.next()) {
                game = mapRowToGame(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return game;
    }

//    @Override
//    public Game addGameToList(Game game, int userId) {
//        String sql = "INSERT INTO user_games (user_id, game_id, star_rating) " +
//                "VALUES (?, ?, ?) RETURNING user_game_id;";
//        try {
//            int userGameId = jdbcTemplate.queryForObject(sql, int.class,
//                    userId,
//                    game.getGameId());
//            return getGameById(game.getGameId());
//        } catch (CannotGetJdbcConnectionException e) {
//            throw new DaoException("Unable to connect to server or database", e);
//        }
//    }

//    @Override
//    public void deleteGameFromList(int gameId) {
//        String sql = "DELETE FROM user_games WHERE game_id = ?;";
//        try {
//            jdbcTemplate.update(sql, gameId);
//        } catch (CannotGetJdbcConnectionException e) {
//            throw new DaoException("Unable to connect to server or database", e);
//        }
//    }

    //Approved
    @Override
    public List<Game> getUserRatedGames(int userId) {
        List<Game> ratedGames = new ArrayList<>();
        String sql = "SELECT g.game_id, g.name, g.image_url, g.avg_rating, ug.star_rating " +
                "FROM games g " +
                "JOIN user_games ug ON g.game_id = ug.game_id " +
                "WHERE ug.user_id = ? AND ug.star_rating IS NOT NULL";;
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                Game game = mapRowToGame(results);
                ratedGames.add(game);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return ratedGames;
    }



//Move to UserGames
    @Override
    public Game createGame(Game game) {
        String sql = "INSERT INTO games (api_id, name, image_url, avg_rating) " +
                "VALUES (?, ?, ?, ?) RETURNING game_id";
        try {
            int gameId = jdbcTemplate.queryForObject(sql, int.class,
                    game.getApiId(),
                    game.getName(),
                    game.getImgFile(),
                    game.getAvgRating());
            return getGameByInternalId(gameId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
    }

    //Approved

    @Override
    public Game getGameByApiId(int apiId) {
        Game game = null;
        String sql = "SELECT game_id, name, image_url, avg_rating, api_id " +
                "FROM games WHERE api_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, apiId);
            if (results.next()) {
                game = mapRowToGame(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return game;
    }


    //Approved
    private Game mapRowToGame(SqlRowSet results) {
        Game game = new Game();
        game.setGameId(results.getInt("game_id"));
        game.setName(results.getString("name"));
        game.setImgFile(results.getString("image_url"));
        game.setAvgRating(results.getDouble("avg_rating"));
        game.setApiId(results.getInt("api_id"));

        return game;
    }
}