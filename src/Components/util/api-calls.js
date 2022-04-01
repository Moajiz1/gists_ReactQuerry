import axios from "axios";
import { baseUrl } from "../../constants/constants";

export const tableCall = {
  url: `${baseUrl}/gists?page=1&per_page=10`,
};

export const fetchPanets = async () => {
  const dataa = await fetch(`${baseUrl}/gists`, {
    method: "get",
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      return response;
    });
  return dataa;
};

export const fn = () => {
  axios.get("https://api.github.com/gists").then((res) => res.data);
};
