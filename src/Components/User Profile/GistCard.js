import { Button, Popconfirm } from "antd";
import React from "react";
import "./userprofile.css";
import Gist from "react-gist";
import { Link } from "react-router-dom";
import { useDeleteGist } from "../../hooks/use-gists";

const GistCard = ({ data, userInfo }) => {
  const { mutate: deleter } = useDeleteGist(); // for delete gist

  return (
    <div>
      <div className="right">
        {data?.map((gist, index) => (
          <div key={index + gist.owner.avatar_url} className="gist-div">
            {gist.id && (
              <>
                <img src={gist.owner.avatar_url} alt="" className="avatar" />
                <a
                  key="{userInfo}"
                  href={gist.owner.html_url}
                  rel="noreferrer"
                  className="name"
                  target={"_blank"}
                >
                  {userInfo?.login}
                </a>
                <span className="btn-container">
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => deleter(gist.id)}
                  >
                    <Button className="btn-delete btn">
                      <i className="fa fa-trash-o icon"></i>
                    </Button>
                  </Popconfirm>

                  <Button className="btn">
                    <Link to={`/userprofile/${gist.id}`}>
                      {" "}
                      <i className="fa fa-pencil-square-o icon"> </i>
                    </Link>
                  </Button>
                </span>

                <Gist id={gist.id} file={null} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GistCard;
