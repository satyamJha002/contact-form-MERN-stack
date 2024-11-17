import {
  Button,
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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ContactTable = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchContacts = async (req, res) => {
      const response = await axios.get("http://localhost:5000/api/contacts");
      const result = await response.data;
      setContactDetails(result);
      console.log(result);
    };
    fetchContacts();
  }, []);

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
        <Button variant="contained" color="success" className="mb-4">
          Add Contact
        </Button>
      </Link>
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
                  <Link to={`/update/${contact._id}`}>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Link>
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
