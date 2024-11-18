import {
  Button,
  Modal,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Contact from "./ContactForm";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ContactTable = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [isEditContactForm, setIsEditContactForm] = useState(false);
  const [selectedContactForm, setSelectedContactForm] = useState(null);

  useEffect(() => {
    const fetchContacts = async (req, res) => {
      const response = await axios.get("http://localhost:5000/api/contacts");
      const result = await response.data;
      setContactDetails(result);
      console.log(result);
    };
    fetchContacts();
  }, []);

  const handleAdd = () => {
    setIsEditContactForm(false);
    setSelectedContactForm(null);
    setOpen(true);
  };

  const handleEdit = (isEdit = false, contact = null) => {
    setIsEditContactForm(isEdit);
    setSelectedContactForm(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    console.log(id);
    if (
      window.confirm("Are you sure you want to delete this contact details?")
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/contacts/${id}`
        );
        const result = await response.data;
        console.log(result);

        if (result.success) {
          setContactDetails((prev) => ({
            ...prev,
            contacts: prev.contacts.filter((contact) => contact._id !== id),
          }));
          toast.success(result.message);
          fetchContacts();
        } else {
          toast.error("Contact is not deleted");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  console.log(contactDetails);

  const paginatedContacts = contactDetails?.contacts?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Link to="/create">
        <Button
          variant="contained"
          color="success"
          className="mb-4"
          onClick={handleAdd}
        >
          Add Contact
        </Button>
      </Link>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Contact
            isEditContactForm={isEditContactForm}
            contact={selectedContactForm}
            onClose={handleClose}
          />
        </Box>
      </Modal>
      <TableContainer
        component={Paper}
        className="p-4 w-full max-w-6xl shadow-lg rounded-lg"
      >
        <Table>
          <TableHead className="bg-blue-600">
            <TableRow>
              {[
                "First Name",
                "Last Name",
                "Email",
                "Phone",
                "Company",
                "Job Title",
              ].map((column) => (
                <TableCell key={column}>
                  <TableSortLabel className="text-center text-white">
                    {column}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell className="text-white">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts?.map((contact) => (
              <TableRow
                key={contact._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.companyName}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(true, contact)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => handleDelete(contact._id)}
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contactDetails?.contacts?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default ContactTable;
