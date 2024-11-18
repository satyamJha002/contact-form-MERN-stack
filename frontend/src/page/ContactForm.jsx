import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { Box, TextField, Typography } from "@mui/material";
import { validate } from "../contactValidation";
import axios from "axios";

const Contact = () => {
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    jobTitle: "",
  });

  const { firstName, lastName, email, phoneNumber, companyName, jobTitle } =
    contactData;

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactValidation = validate(contactData);
    if (Object.keys(contactValidation).length > 0) {
      setError(contactValidation);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contacts",
        contactData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Resource created successfully:", response.data);
        toast.success("Contact created successfully!");
        setContactData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          companyName: "",
          jobTitle: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are your sure you want to cancel ?")) {
      setContactData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        jobTitle: "",
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="max-w-lg flex flex-col justify-center min-h-[100vh] items-center m-auto"
    >
      <Box className=" px-5 py-5 text-white max-w-lg mx-auto bg-white shadow-md rounded-md p-6 space-y-4">
        <Typography
          variant="h6"
          mb={0.2}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Contact Form
        </Typography>
        <TextField
          label="First Name"
          name="firstName"
          value={firstName}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          error={!!error.firstName}
          helperText={error.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={lastName}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          error={!!error.lastName}
          helperText={error.lastName}
        />
        <TextField
          label="Email"
          name="email"
          value={email}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          error={!!error.email}
          helperText={error.email}
        />
        <TextField
          label="Phone number"
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          error={!!error.phoneNumber}
          helperText={error.phoneNumber}
        />
        <TextField
          label="Company Name"
          name="companyName"
          value={companyName}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          error={!!error.companyName}
          helperText={error.companyName}
        />
        <TextField
          label="Job Title"
          name="jobTitle"
          value={jobTitle}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          error={!!error.jobTitle}
          helperText={error.jobTitle}
        />
        <Box mt={2} className="flex justify-center gap-4">
          <Button
            variant="contained"
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
          >
            Submit
          </Button>
          <Button
            variant="contained"
            className="bg-black"
            onClick={() => navigate("/")}
          >
            Back
          </Button>

          <Button variant="contained" type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
