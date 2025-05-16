import axios from 'axios';

const API_URL = 'https://38cfcab4-d565-45e2-a524-30f8424ddddd.mock.pstmn.io'; 

export const getAnalyticsData = () => {
  return axios.get(`${API_URL}/analytics`);
};
