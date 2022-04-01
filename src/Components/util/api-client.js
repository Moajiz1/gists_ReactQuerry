import { queryCache } from "react-query";
import * as auth from "../../auth-provider";
import { baseUrl } from "../../constants/constants";
const apiURL = baseUrl;

var myHeaders = new Headers();
myHeaders.append("pragma", "no-cache");
myHeaders.append("cache-control", "no-cache");

async function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...myHeaders,
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return fetch(`${apiURL}/${endpoint}`, config).then(async (response) => {
    console.log("watch", config);
    if (response.status === 401) {
      queryCache.clear();
      await auth.logout();
      // refresh the page for them
      window.location.assign(window.location);
      return Promise.reject({ message: "Please re-authenticate." });
    }
    const statusStar = response.status;
    if (statusStar === 204) {
      console.log(statusStar);
      return statusStar;
    }
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
