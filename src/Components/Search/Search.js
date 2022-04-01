import { Space, Input } from "antd";
import React from "react";
import { gistOnSearch } from "../../fetchs/fetch";
import "./search.css";

const Search = ({ setDataSource }) => {
  const { Search } = Input;
  const onSearch = (userID) => gistOnSearch(userID, setDataSource);

  return (
    <ul className="listi">
      <Space direction="vertical">
        <Search
          className="search"
          placeholder="Find Notes.."
          onSearch={onSearch}
        />
      </Space>
    </ul>
  );
};

export default Search;
