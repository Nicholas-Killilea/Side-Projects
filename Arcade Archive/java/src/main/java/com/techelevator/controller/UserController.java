package com.techelevator.controller;

import com.techelevator.dao.GameDao;
import com.techelevator.dao.RatingAndReviewDao;
import com.techelevator.dao.UserDao;
import com.techelevator.dao.UserListDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Game;
import com.techelevator.model.GameDto;
import com.techelevator.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * The UserController is a class for handling HTTP Requests related to getting User information.
 *
 * It depends on an instance of a UserDAO for retrieving and storing data. This is provided
 * through dependency injection.
 *
 * Note: This class does not handle authentication (registration/login) of Users. That is
 * handled separately in the AuthenticationController.
 */
@RestController
//@CrossOrigin(origins ="*")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@PreAuthorize("isAuthenticated()")
@RequestMapping( path = "/users")
public class UserController {

    private UserDao userDao;
    private RatingAndReviewDao ratingAndReviewDao;
    private GameDao gameDao;
    private UserListDao userListDao;

    public UserController(UserDao userDao, RatingAndReviewDao ratingAndReviewDao, GameDao gameDao, UserListDao userListDao) {
        this.userDao = userDao;
        this.ratingAndReviewDao = ratingAndReviewDao;
        this.gameDao = gameDao;
        this.userListDao = userListDao;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(method = RequestMethod.GET)
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();

        try {
            users = userDao.getUsers();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

        return users;
    }

    @RequestMapping(path = "/{userId}", method = RequestMethod.GET)
    public User getById(@PathVariable int userId, Principal principal) {
        User user = null;

        try {
            user = userDao.getUserById(userId);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

        return user;
    }

    @RequestMapping(path = "/ratings/{userId}", method = RequestMethod.GET)
    public List<Map<String, Object>> getUserRatings(@PathVariable int userId, Principal principal) {
        // Ensure the user is either accessing their own ratings or is an admin
        String username = principal.getName();
        User user = userDao.getUserByUsername(username);

//
        try {
            return ratingAndReviewDao.getUserRatings(userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error retrieving ratings: " + e.getMessage());
        }
    }

    @RequestMapping(path = "/rating/{userId}", method = RequestMethod.GET)
    public List<Map<String, Object>> getUserRatingsWithApiId(@PathVariable int userId, Principal principal) {
        // Ensure the user is either accessing their own ratings or is an admin
        String username = principal.getName();
        User user = userDao.getUserByUsername(username);

        try {
            return ratingAndReviewDao.getUserRatingsWithApiId(userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error retrieving ratings: " + e.getMessage());
        }
    }

    @RequestMapping(path = "/reviews/{userId}", method = RequestMethod.GET)
    public List<Map<String, Object>> getUserReviews(@PathVariable int userId, Principal principal) {

        User currentUser = userDao.getUserByUsername(principal.getName());

        try {
            return ratingAndReviewDao.getUserReviews(userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error retrieving reviews: " + e.getMessage());
        }
    }

    @RequestMapping(path = "/games/user/{userId}", method = RequestMethod.GET)
    public List<Map<String, Object>> getUserGames(@PathVariable int userId, Principal principal) {
        try {
            User user = userDao.getUserByUsername(principal.getName());

            return ratingAndReviewDao.getUserGames(userId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(path = "/games/user/wishlist", method = RequestMethod.GET)
    public List<Map<String, Object>> getUserWishList(Principal principal) {
        try {
            User user = userDao.getUserByUsername(principal.getName());
            // If you need authorization checks, add them here
            return userListDao.getUserWishList(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(path = "/games/user/playing", method = RequestMethod.GET)
    public List<Map<String, Object>> getUserPlayingList(Principal principal) {
        try {
            User user = userDao.getUserByUsername(principal.getName());
            // If you need authorization checks, add them here
            return userListDao.getUserPlayingList(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(path = "/games/user/wishlist", method = RequestMethod.POST)
    public boolean addWishList(@RequestBody GameDto game, Principal principal) {
        try {
            // Extract data from request with proper type handling

            int apiId = game.getId();
            String name = game.getName();
            String imageUrl = game.getBackground_image();
            double avgRating = game.getRating();

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
            if (userListDao.addToWishlist(gameId, user.getId())) {
                return true;
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while adding to the list");
            }
        } catch (Exception e) {
            e.printStackTrace();

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(path = "/games/user/finished", method = RequestMethod.GET)
    public List<Map<String, Object>> getUserFinishedList(Principal principal) {
        try {
            User user = userDao.getUserByUsername(principal.getName());
            // If you need authorization checks, add them here
            return userListDao.getUserFinishedList(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @RequestMapping(path = "/games/user/playing", method = RequestMethod.POST)
    public boolean addToPlaying(@RequestBody GameDto game, Principal principal) {
        try {
            // Extract data from request with proper type handling

            int apiId = game.getId();
            String name = game.getName();
            String imageUrl = game.getBackground_image();
            double avgRating = game.getRating();

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
            if (userListDao.addToPlayingList(gameId, user.getId())) {
                return true;
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while adding to the list");
            }
        } catch (Exception e) {
            e.printStackTrace();

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(path = "/games/user/finished", method = RequestMethod.POST)
    public boolean addToFinishedList(@RequestBody GameDto game, Principal principal) {
        try {
            // Extract data from request with proper type handling

            int apiId = game.getId();
            String name = game.getName();
            String imageUrl = game.getBackground_image();
            double avgRating = game.getRating();

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
            if (userListDao.addToFinishedList(gameId, user.getId())) {
                return true;
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while adding to the list");
            }
        } catch (Exception e) {
            e.printStackTrace();

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(path = "/wishlist/{gameId}", method = RequestMethod.DELETE) //path
    public boolean deleteReview(@PathVariable int gameId) {
        try {
            System.out.println("Attempting to delete game: " + gameId);

            // Remove authentication check temporarily for testing

            // Delete the review
            boolean result = userListDao.deleteWishlistById(gameId);
            System.out.println("Delete result: " + result);

            if (result) {
                return true;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());

        }
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(path = "/playing/{gameId}", method = RequestMethod.DELETE) //path
    public boolean deletePlaying(@PathVariable int gameId) {
        try {
            System.out.println("Attempting to delete game: " + gameId);

            // Remove authentication check temporarily for testing

            // Delete the review
            boolean result = userListDao.deletePlayingById(gameId);
            System.out.println("Delete result: " + result);

            if (result) {
                return true;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());

        }
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(path = "/finished/{gameId}", method = RequestMethod.DELETE) //path
    public boolean deleteFinished(@PathVariable int gameId) {
        try {
            System.out.println("Attempting to delete game: " + gameId);

            // Remove authentication check temporarily for testing

            // Delete the review
            boolean result = userListDao.deleteFinishedById(gameId);
            System.out.println("Delete result: " + result);

            if (result) {
                return true;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());

        }
    }


}


