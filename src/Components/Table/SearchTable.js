import { Table } from "antd";
import Gists from "../Gists/Gists";
import React from "react";
import useDataForNavigation from "../../hooks/useData";

const SearchTable = ({ dataSource }) => {
  const { gistDetail, getData, backFn } = useDataForNavigation();

  const columns = [
    {
      title: "Image",
      dataIndex: ["owner", "avatar_url"],
      render: (theImageURL) => (
        // <>abc</>
        <img className="user-img" alt={"No Data"} src={theImageURL} />
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
    <div className="">
      {!gistDetail && (
        <Table
          // loading={isLoading}
          className="custom-table"
          columns={columns}
          dataSource={dataSource}
          pagination={dataSource.length > 10}
          onRow={(record) => ({
            onDoubleClick: () => getData(record),
          })}
          rowKey="id"
        />
      )}

      {gistDetail && <Gists data={gistDetail} backFn={backFn} />}
    </div>
  );
};

export default SearchTable;
