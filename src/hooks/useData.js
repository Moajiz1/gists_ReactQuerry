import { useState } from "react";

const useDataForNavigation = () => {
  const [gistDetail, setGistDetail] = useState(); //for storing data of clicked gist.

  const backFn = () => {
    setGistDetail(null);
  };

  const getData = (record) => {
    setGistDetail(record);
  };

  return {
    gistDetail,
    getData,
    backFn,
  };
};

export default useDataForNavigation;
