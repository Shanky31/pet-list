import axios from "axios";

export const fetchPets = async (startIndex, endIndex) => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets`);
  return response.data;
};

export const fetchPetById = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets?id=${id}`);
  return response.data;
};

export const fetchBreeds = async (animal) => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/breeds?animal=${animal}`);
  return response.data;
};

export const searchPets = async (params) => {
  const query = Object.entries(params)
    .filter(([key, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pets?${query}`);
  return response.data;
};
