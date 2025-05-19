package com.techelevator.dao;

import com.techelevator.model.Game;

import java.util.List;

public interface GameDao {
        Game getGameByInternalId(int gameId);
        Game createGame(Game game);
        Game getGameByApiId(int apiId);
        List<Game> getUserRatedGames(int userId);


}
