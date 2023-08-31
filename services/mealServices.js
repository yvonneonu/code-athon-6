import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getCategories = () => {
  return axios
    .get(`${BASE_URL}/categories.php`)
    .then((response) => response.data.categories)
    .catch((error) => {
      console.error("Error fetching categories:", error);
      throw error;
    });
};

export const getFilteredMealsByCategory = (category) => {
  return axios
    .get(`${BASE_URL}/filter.php?c=${category}`)
    .then((response) => response.data.meals)
    .catch((error) => {
      console.error("Error fetching filtered meals:", error);
      throw error;
    });
};

export const getFullMealsById = (id) => {
  return axios
    .get(`${BASE_URL}/lookup.php?i=${id}`)
    .then((response) => response.data.meals)
    .catch((error) => {
      console.error("Error fetching filtered meals:", error);
      throw error;
    });
};

export const getNoSearch = () => {
  return axios
    .get(`${BASE_URL}/search.php?s=`)
    .then((response) => response.data.meals)
    .catch((error) => {
      console.error("Error fetching filtered meals:", error);
      throw error;
    });
};

export const getSearchItem = (item) => {
  return axios
    .get(`${BASE_URL}/search.php?s=${item}`)
    .then((response) => response.data.meals)
    .catch((error) => {
      console.error("Error fetching filtered meals:", error);
      throw error;
    });
};

export default {
  getCategories,
  getFilteredMealsByCategory,
  getFullMealsById,
  getNoSearch,
  getSearchItem,
};
