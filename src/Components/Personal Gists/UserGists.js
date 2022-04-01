// import { Table } from "antd";
// import React from "react";
// import { usePersonalGists } from "../../hooks/use-gists";
// import useData from "../../hooks/useData";
// import Gists from "../Gists/Gists";

// const UserGists = () => {
//   const { data, isLoading } = usePersonalGists();
//   console.log(isLoading);

//   //custom hook
//   const { gistDetail, getData, backFn } = useData();

//   const columns = [
//     {
//       title: "Image",
//       dataIndex: ["owner", "avatar_url"],
//       render: (theImageURL) => (
//         <img className="user-img" alt={theImageURL} src={theImageURL} />
//       ), // 'theImageURL' is the variable you must declare in order the render the URL
//       key: "image",
//     },
//     {
//       title: "ID",
//       dataIndex: ["id"],
//       key: "id",
//     },
//     {
//       title: "Name",
//       dataIndex: ["owner", "login"],
//       key: "name",
//     },
//     {
//       title: "Time",
//       dataIndex: ["updated_at"],
//       key: "time",
//     },
//   ];

//   return (
//     <div className="table-parent">
//       {!gistDetail && (
//         <>
//           {data && (
//             <Table
//               rowKey="id"
//               className="custom-table"
//               loading={isLoading}
//               columns={columns}
//               dataSource={data}
//               pagination={data.length > 10}
//               onRow={(record) => ({
//                 onDoubleClick: () => getData(record),
//               })}
//             />
//           )}
//         </>
//       )}
//       {gistDetail && <Gists data={gistDetail} backFn={backFn} />}
//     </div>
//   );
// };

// export default UserGists;
