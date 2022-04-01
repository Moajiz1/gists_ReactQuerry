import React, { useState } from "react";
import { Input, Space, Table } from "antd";
import "./tableInfo.css";
import Gists from "../Gists/Gists";
import { gistOnSearch } from "../../fetchs/fetch";
import { useGists } from "../../hooks/use-gists";
import SearchTable from "./SearchTable";
import useDataForNavigation from "../../hooks/useData";

const TableInfo = () => {
  //custom hook getting gists
  const { data, isLoading } = useGists();

  const columns = [
    {
      title: "Image",
      dataIndex: ["owner", "avatar_url"],
      render: (theImageURL) => (
        <img className="user-img" alt={"No Data"} src={theImageURL} />
      ),
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

  const [dataSource, setDataSource] = useState(); //for search table data
  const { Search } = Input;
  const onSearch = (userID) => gistOnSearch(userID, setDataSource);

  //custom hook for navigation purpose
  const { gistDetail, getData, backFn } = useDataForNavigation();
  return (
    <>
      <div className="table-parent">
        {!gistDetail && (
          <>
            <div className="search-bar">
              <Space direction="vertical">
                <Search
                  className="search"
                  placeholder="Find Notes.."
                  onSearch={onSearch}
                />
              </Space>
            </div>
            {!dataSource && (
              <>
                {data && (
                  <Table
                    loading={isLoading}
                    className="custom-table"
                    columns={columns}
                    dataSource={data}
                    pagination={data.length > 10}
                    onRow={(record) => ({
                      onDoubleClick: () => getData(record),
                    })}
                    rowKey="id"
                  />
                )}
              </>
            )}
            {dataSource && <SearchTable dataSource={dataSource} />}
          </>
        )}
        {gistDetail && <Gists data={gistDetail} backFn={backFn} />}
      </div>
    </>
  );
};

export default TableInfo;
