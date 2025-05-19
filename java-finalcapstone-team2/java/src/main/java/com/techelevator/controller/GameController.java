package com.techelevator.controller;

import com.techelevator.dao.GameDao;
import com.techelevator.dao.JdbcUserRatingAndReviewDao;
import com.techelevator.dao.RatingAndReviewDao;
import com.techelevator.dao.UserDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.*;
import com.techelevator.dao.RatingAndReviewDao;

import jakarta.validation.Valid;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin
@RequestMapping(path = "/games")
public class GameController {

    private final GameDao gameDao;
    private final UserDao userDao;
    private final RatingAndReviewDao ratingDao;
    private final JdbcTemplate jdbcTemplate;


    public GameController(GameDao gameDao, UserDao userDao, RatingAndReviewDao reviewDao, JdbcTemplate jdbcTemplate) {
        this.gameDao = gameDao;
        this.userDao = userDao;
        this.ratingDao = reviewDao;
        this.jdbcTemplate = jdbcTemplate;
    }

    //GameController
    //Create Rating - returns null - COMPLETE
    //Update Rating - returns null - COMPLETE
    //VIEW USER RATINGS - COMPLETE
    //VIEW USER REVIEWS - COMPLETE
    //Retrieve User Touched Games - returns List<Games> - STILL TO DO


    @ResponseStatus(value = HttpStatus.CREATED)
    @RequestMapping(path = "/rate", method = RequestMethod.POST)
    public boolean rateGame (@RequestBody GameDto game, Principal principal) {
        try {
            // Extract data from request with proper type handling

            int apiId = game.getId();
            String name = game.getName();
            String imageUrl = game.getBackground_image();
            double avgRating = game.getRating();
            int userRating = game.getUserRating();

            // Validate user rating
            if (userRating < 1 || userRating > 5) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
            }
            User user = userDao.getUserByUsername(principal.getName());
            // Check if game exists in database by apiId
            Game existingGame = gameDao.getGameByApiId(apiId);
            int gameId;

            // If game doesn't exist, create it
            if (existingGame == null) {
                Game newGame = new Game();
                newGame.setApiId(apiId);
                newGame.setName(name);
                newGame.setImgFile(imageUrl);
                newGame.setAvgRating(avgRating);

                existingGame = gameDao.createGame(newGame);
            }

            gameId = existingGame.getGameId();
            //Now I can create the rate  that I need to create
            if(ratingDao.addUserRating(userRating,gameId,user.getId()))
            {
                return true;
            }else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"An error occurred while creating the rating");
            }


        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @ResponseStatus(value = HttpStatus.CREATED)
    @RequestMapping(path = "/rate", method = RequestMethod.PUT)
    public boolean updateRating (@RequestBody GameDto gameDto, Principal principal) {
        try {
            // Extract data from request with proper type handling
            int userRating = gameDto.getUserRating();

            // Validate user rating
            if (userRating < 1 || userRating > 5) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
            }
            User user = userDao.getUserByUsername(principal.getName());
            Game game = gameDao.getGameByApiId(gameDto.getId());
            //Check and make sure just in case
            if(game==null)
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);

            //Now I can create the rate  that I need to create
            if(ratingDao.updateUserRating(user.getId(),game.getGameId(),userRating))
            {
                return true;
            }else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"An error occurred while creating the rating");
            }


        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @RequestMapping(path = "/ratings", method = RequestMethod.GET)
    public List<Map<String, Object>> getAllRatings() {
        try {
            return ratingDao.getAllRatings();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error retrieving ratings: " + e.getMessage());
        }
    }


    @ResponseStatus(value = HttpStatus.CREATED)
    @RequestMapping(path = "/review", method = RequestMethod.POST)
    public boolean reviewGame(@RequestBody GameDto game, Principal principal) {
        try {
            // Extract data from request with proper type handling
            int apiId = game.getId();
            String name = game.getName();
            String imageUrl = game.getBackground_image();
            double avgRating = game.getRating();
            String userReview = game.getUserReview();  // Changed to get review text


            User user = userDao.getUserByUsername(principal.getName());
            // Check if game exists in database by apiId
            Game existingGame = gameDao.getGameByApiId(apiId);
            int gameId;

            // If game doesn't exist, create it
            if (existingGame == null) {
                Game newGame = new Game();
                newGame.setApiId(apiId);
                newGame.setName(name);
                newGame.setImgFile(imageUrl);
                newGame.setRating(avgRating);
                newGame.setReview(userReview);

                existingGame = gameDao.createGame(newGame);
            }

            gameId = existingGame.getGameId();
            //Create the Review
            if(ratingDao.addReview(gameId,user.getId(),userReview)) //Is this suppose to be update review?not add review?
            {
                return true;
            }else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Review not created");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
    @ResponseStatus(value = HttpStatus.CREATED)
    @RequestMapping(path = "/review", method = RequestMethod.PUT)
    public boolean updateReview(@RequestBody GameDto game, Principal principal) {
        try {
            // Extract data from request with proper type handling
            int apiId = game.getId();
            String name = game.getName();
            String imageUrl = game.getBackground_image();
            double avgRating = game.getRating();
            String userReview = game.getUserReview();  // Changed to get review text


            User user = userDao.getUserByUsername(principal.getName());
            // Check if game exists in database by apiId
            //Game existingGame = gameDao.getGameByApiId(apiId);
            Game existingGame = gameDao.getGameByInternalId(game.getId());
            int gameId;

            gameId = existingGame.getGameId();
            //Update the Review
            if(ratingDao.updateReview(gameId,user.getId(),userReview))
            {
                return true;
            }else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Review not created");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(path = "/reviews", method = RequestMethod.GET)
    public List<Map<String, Object>> getAllReviews() {
        try {
            return ratingDao.getAllReviews();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error retrieving reviews: " + e.getMessage());
        }
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(path = "/review/{reviewId}", method = RequestMethod.DELETE)
    public boolean deleteReview(@PathVariable int reviewId) {
        try {
            System.out.println("Attempting to delete review ID: " + reviewId);

            // Remove authentication check temporarily for testing

            // Delete the review
            boolean result = ratingDao.deleteReviewById(reviewId);
            System.out.println("Delete result: " + result);

            if (result) {
                return true;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(path = "/{gameId}", method = RequestMethod.GET)
    public GameDto getGameById(@PathVariable int gameId, Principal principal) {
        try {
            Game game = gameDao.getGameByInternalId(gameId);

            if (game == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
            }

            GameDto gameDto = new GameDto();
            gameDto.setId(game.getGameId());
            gameDto.setName(game.getName());
            gameDto.setBackground_image(game.getImgFile());
            gameDto.setRating(game.getAvgRating());

            // If user is authenticated, get their rating and review
            if (principal != null) {
                User user = userDao.getUserByUsername(principal.getName());

                Integer userRating = ratingDao.getUserRatingForGame(user.getId(), gameId);
                if (userRating != null) {
                    gameDto.setUserRating(userRating);
                }

                String userReview = ratingDao.getUserReviewForGame(user.getId(), gameId);
                if (userReview != null) {
                    gameDto.setUserReview(userReview);
                }
            }
            return gameDto;

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error retrieving game: " + e.getMessage());
        }
    }
}