import axios from "axios";

export default {
  authGoogle: function () {
    return axios.get('/auth/google');
  }
};
