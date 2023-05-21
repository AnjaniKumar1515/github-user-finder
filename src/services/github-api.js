import axios from 'axios';

const BASE_URL = 'https://api.github.com';
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `token ${ACCESS_TOKEN}`,
  },
});

export async function getUserRepositories(username) {
  const apiUrl = `/users/${username}/repos`;

  try {
    const response = await axiosInstance.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getUser = async (username) => {
  const apiUrl = `/users/${username}`;

  try {
    const response = await axiosInstance.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
