import axios from "axios";

export default {
  getWorkouts: function (id) {
    return axios(`/api/workouts/user/${id}`);
  },
  getWorkout: function (id) {
    return axios.get(`/api/workouts/${id}`);
  },
  getWorkoutByTitle: function (workoutTitle, userId) {
    return axios.get(`/api/workouts/title/${workoutTitle}/${userId}`);
  },
  postWorkout: function (userId, workoutData) {
    return axios.post(`/api/workouts/${userId}`, workoutData);
  },
  putWorkout: function (workoutData) {
    return axios.put(`/api/workouts/${workoutData._id}`, workoutData);
  },
  deleteWorkout: function (workoutId) {
    return axios.delete(`/api/workouts/${workoutId}`);
  },
  getUser: function (email) {
    return axios.get(`/api/users/${email}`);
  },
  createUser: function (userData) {
    return axios.post(`/api/users`, userData);
  },
  putUser: function (userId, workoutId) {
    return axios.put(`/api/users/${userId}`, workoutId)
  },
  putUserDeleteWorkout: function (userId, workoutId) {
    return axios.put(`/api/users/${userId}/${workoutId}`)
  }
};
