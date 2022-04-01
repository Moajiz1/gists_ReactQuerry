import { Table } from "antd";
import React from "react";
import { useGistStarred } from "../../hooks/use-gists";
import useDataForNavigation from "../../hooks/useData";
import Gists from "../Gists/Gists";

const StarGists = () => {
  const { data, isLoading } = useGistStarred();

  const { gistDetail, getData, backFn } = useDataForNavigation();

  const columns = [
    {
      title: "Image",
      dataIndex: ["owner", "avatar_url"],
      render: (theImageURL) => (
        <img className="user-img" alt={theImageURL} src={theImageURL} />
      ), // 'theImageURL' is the variable you must declare in order the render the URL
      key: "image",
    },
    {
      title: "ID",
      dataIndex: ["id"],
      key: "id",
    },
    {
      title: "Name",
      dataIndex: ["owner", "login"],
      key: "name",
    },
    {
      title: "Time",
      dataIndex: ["updated_at"],
      key: "time",
    },
  ];

  return (
    <>
      <div className="table-parent">
        {!gistDetail && (
          <>
            <Table
              className="custom-table"
              loading={isLoading}
              rowKey="id"
              columns={columns}
              dataSource={data}
              // pagination={dataSource.length > 10}
              onRow={(record) => ({
                onDoubleClick: () => getData(record),
              })}
            />
          </>
        )}
        {gistDetail && <Gists data={gistDetail} backFn={backFn} />}
      </div>
    </>
  );
};

export default StarGists;
