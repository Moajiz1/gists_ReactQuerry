import Navbar from "./Components/Navbar/Navbar";
import TableInfo from "./Components/Table/TableInfo";
import "./App.css";
import * as React from "react";
import "antd/dist/antd.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./Components/User Profile/UserProfile";
import AddGist from "./Components/Add Gist/AddGist";
import StarGists from "./Components/Starred Gists/StarGists";
import { QueryClient, QueryClientProvider } from "react-query";
import GistUpdateAgain from "./Components/Update Gist/GistUpdateAgain";
import SearchTable from "./Components/Table/SearchTable";

const queryClient = new QueryClient();

// import { githubProvider } from '../config/authMethod';
//thisss
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          {/* <div className="ui">{showSearch()}</div> */}
          <Routes>
            <Route path="/" element={<TableInfo />} />
            <Route path="/Search" element={<SearchTable />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/userprofile/:gistID" element={<GistUpdateAgain />} />
            <Route path="/starredgists" element={<StarGists />} />
            <Route path="/form" element={<AddGist />} />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}
export default App;
