export const columns = [
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
