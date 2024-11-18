import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactTable from "./page/ContactTable";

const App = () => {
  return (
    <div className="bg-gray-500">
      <ContactTable />
      <ToastContainer />
    </div>
  );
};

export default App;
