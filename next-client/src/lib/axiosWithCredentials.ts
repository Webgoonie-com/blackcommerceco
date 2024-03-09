import axios from 'axios';

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export default axiosWithCredentials;