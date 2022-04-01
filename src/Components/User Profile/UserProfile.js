import React from "react";
import "./userprofile.css";
import { Button, Spin } from "antd";
import { useDataOfUser, useGists } from "../../hooks/use-gists";
import GistCard from "./GistCard";

const UserProfile = () => {
  const { userInfo, isLoading } = useDataOfUser(); //hook for user's information
  const { data } = useGists("profile_gists"); //for displaying users Gists

  return (
    <div>
      {isLoading && <Spin />}

      {userInfo && (
        <div className="wrapper">
          <div className="left">
            <img src={userInfo?.avatar_url} alt="" className="icon" />
            <h2 className="name">{userInfo?.name}</h2>
            <Button
              className="btn-profile"
              href={userInfo?.html_url}
              target="_blank"
            >
              View Github Profile
            </Button>
          </div>

          <div className="center">
            <div className="line" />
          </div>

          <div className="right">
            {data && <GistCard data={data} userInfo={userInfo} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
