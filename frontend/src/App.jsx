import React, { useState } from "react";
import Contact from "./page/ContactForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactTable from "./page/ContactTable";
import { Route, Routes } from "react-router-dom";
import EditContactPage from "./page/EditContactPage";

const App = () => {
  return (
    <div className="bg-gray-500">
      <Routes>
        <Route path="/" element={<ContactTable />} />
        <Route path="/create" element={<Contact />} />
        <Route path="/update/:id" element={<EditContactPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
