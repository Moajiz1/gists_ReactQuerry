import { useEffect, useState } from "react";

const useRequest = (requestConfig, applyData) => {
  const [loading, setLoading] = useState(true); //loading.
  const [status, setStatus] = useState(); //for status

  const sendReq = () => {
    fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : "GET",
      headers: requestConfig.headers ? requestConfig.headers : {},
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    }) //single then logic.
      .then(async (response) => {
        if (
          response.status === 201 ||
          response.status === 204 ||
          response.status === 200
        ) {
          setLoading(false);
          setStatus(response.status);
          console.log(response);
        }

        if (response.message) setStatus(response.message);
        const data = await response.json();
        console.log(data);
        if (data) applyData(data);
        else {
          // Rest of status codes (400,404,500,303), can be handled here appropriately
        }
      })
      .catch((err) => err);
  };

  useEffect(() => {
    sendReq();
  }, []);

  return {
    loading,
    status,
    sendReq,
  };
};

export default useRequest;
