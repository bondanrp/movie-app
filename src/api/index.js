import { securedApi } from "./config";

const api = {
  searchMovie: async (params) => {
    try {
      let result = await securedApi.get(`/4/search/movie`, {
        params: params,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getDetail: async (id) => {
    try {
      let result = await securedApi.get(`/3/movie/${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
export default api;
