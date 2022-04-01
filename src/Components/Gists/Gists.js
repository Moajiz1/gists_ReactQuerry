import React, { useEffect, useState } from "react";
import Gist from "react-gist";
import "./gists.css";
import { Button } from "antd";
import { localToken } from "../../fetchs/fetch";
import { successCheckFork } from "../util/Utfn";
import { useMarkFork, useMarkStar, useStarResp } from "../../hooks/use-gists";

const Gists = ({ data, backFn }) => {
  // const [userAction, setUserAction] = useState({ star: false, fork: false }); // for fork & star

  // const { star, fork } = userAction;
  const { id, owner, updated_at } = data; // data of clicked gist
  const { avatar_url, login, html_url } = owner; //further destructuring

  //custom hook

  const { starGist, star } = useMarkStar(id);

  const { forkGist, fork } = useMarkFork();

  // const { status } = useRequest({
  //   url: `${baseUrl}/gists/${id}/star`,
  //   method: "get",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `token ${localToken}`,
  //   },
  // });

  const gistStar = () => {
    starGist(id);
  };

  const gistFork = () => {
    forkGist(id);
  };

  // const checkStarFinal = () => {
  //   if (status === "success") {
  //     setUserAction((prevState) => {
  //       return {
  //         ...prevState,
  //         star: true,
  //       };
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (data) {
  //     if (localToken) {
  //       checkStarFinal();
  //     }
  //   }
  // }, [status]);

  return (
    <>
      {data && (
        <div className="gist-info">
          <div className="user-detail">
            <img src={avatar_url} alt="" className="avatar" />{" "}
            <a
              href={html_url}
              rel="noreferrer"
              target="_blank"
              className="name"
            >
              {login}
            </a>
            <p className="created">Created at {updated_at}</p>
          </div>
          <Button className="back-btn" onClick={backFn}>
            <i className="fa fa-arrow-left"> Back</i>
          </Button>

          {localToken ? (
            <ul className="action-btn">
              <i
                className={
                  !star ? `fa fa-star-o fa-spin fa-lg` : "fa fa-star-o fa-lg"
                }
                onClick={gistStar}
                style={{
                  fontWeight: star ? "bolder" : "",
                  color: "#15a699",
                }}
              ></i>
              <i
                className={"fa fa-flag-o fa-lg"}
                onClick={gistFork}
                style={{ fontWeight: fork ? "bolder" : "", color: "#15a699" }}
              ></i>
            </ul>
          ) : (
            <ul className="action-btn">Login to Star & fork</ul>
          )}

          <Gist id={id} file={null} />
        </div>
      )}
      {!data && <>No Data Found!</>}
    </>
  );
};

export default Gists;
