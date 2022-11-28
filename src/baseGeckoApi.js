import axios from "axios";

export const baseGeckoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});
