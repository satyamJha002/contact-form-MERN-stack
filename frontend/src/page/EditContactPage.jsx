import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { validate } from "../contactValidation";
import { toast } from "react-toastify";

const EditContactPage = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    jobTitle: "",
  });

  const { firstName, lastName, email, phoneNumber, companyName, jobTitle } =
    contact;

  const [error, setError] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/contacts/${id}`
        );
        console.log(response.data);
        const result = await response.data.findContactById;

        if (result) {
          setContact({
            firstName: result.firstName || "",
            lastName: result.lastName || "",
            email: result.email || "",
            phoneNumber: result.phoneNumber || "",
            companyName: result.companyName || "",
            jobTitle: result.jobTitle || "",
          });
        } else {
          console.error("No contact found with the given ID.");
        }
      } catch (error) {
        console.log("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form's default behavior
    console.log("Submit button clicked");

    const contactValidation = validate({
      firstName,
      lastName,
      email,
      phoneNumber,
      companyName,
      jobTitle,
    });

    if (Object.keys(contactValidation).length > 0) {
      console.log("Validation errors:", contactValidation);
      setError(contactValidation);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/contacts/${id}`,
        contact,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Resource updated successfully:", response.data);
        toast.success("Contact updated successfully!");
        setContact({
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
      console.error("Update failed:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
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
            Update Contact Form
          </Typography>
          <TextField
            label="First Name"
            name="firstName"
            value={firstName}
            fullWidth
            required
            onChange={handleChange}
            error={!!error.firstName}
            helperText={error.firstName}
            margin="normal"
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
          <Box mt={2} className="flex justify-between">
            <Button
              variant="contained"
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditContactPage;
