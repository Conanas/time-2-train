import axios from "axios";

export default {
  getWorkout: function (id) {
    return axios.get(`/api/workout/:${id}`)
  }
};
