export const userConstants = {
  clientID: "410241a2dc57dc389ef5",
  clientSecret: "a384f0abeae3c1cea20645c082927da70491fe91",
  redirectUrl: "http://localhost:3000",
};

export const columns = [
  {
    title: "Image",
    dataIndex: ["owner", "avatar_url"],
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

export const baseUrl = "https://api.github.com";
