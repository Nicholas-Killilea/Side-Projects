import axios from 'axios';

export default {
  getGames() {
    return axios.get('/games');
  },
  getReviews() {
    return axios.get('/games/reviews');
  },
  getRatings() {
    return axios.get('/games/gameId/rating');

  },
  adminRatingView(userId) {
    return axios.get(`/games/${userId}/rating`)
  },
  UpdateRating(gameId){
    return axios.put(`/games/${gameId}/rating`)
  }
  // getRatings() {
  //   return axios.get('/games/gameId/rating');

  // },
};