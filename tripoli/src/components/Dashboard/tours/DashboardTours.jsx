// React
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from "react-toastify";

// MUI
import { CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import UpdateIcon from "@mui/icons-material/UpdateSharp";

// rsuite
import { Button, ButtonToolbar } from "rsuite";

// Custom Components
import RowTour from "./RowTour.jsx";
import FormAdd from "./FormAdd.jsx";
import DeleteConfirmationDialog from "./DeleteConfirmationModal.jsx";
import Search from "../../search/Search.jsx";

import "./DashboardTours.css";

const columns = [
  { id: "id", label: "ID", minWidth: 10 },
  { id: "image", label: "Image", minWidth: 10 },
  { id: "title", label: "Title", minWidth: 10 },
  { id: "startTime", label: "Start Date", minWidth: 10 },
  { id: "endTime", label: "End Date", minWidth: 10 },
  { id: "price", label: "Price", minWidth: 10 },
  { id: "userId", label: "User Id", minWidth: 10 },
];

export default function DashboardTours() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFormAdd, setIsFormAdd] = useState(false);
  const [tourData, setTourData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tourDataToDelete, setTourDataToDelete] = useState(null);
  const [searchText, setSearchText] = useState("");

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/tours/all`
        );
        const tours = response.data.data;
        console.log(tours)
        setData(tours);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // for showing the image
  const getImageUrl = (image) => {
    // Assuming the base URL is http://localhost:4000/images
    return `http://localhost:4000/images/${image}`;
  };

  // Edit a tour
  const handleEdit = (rowId) => {
    console.log(rowId);
    setIsProfileModalOpen(true);
    const selectedRowData = data.find((row) => row.id === rowId);
    setTourData(selectedRowData);
  };

  // Confirmation the Delete
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND}/tours/delete/${tourDataToDelete.id}`
      );
      setData((prevData) =>
        prevData.filter((row) => row.id !== tourDataToDelete.id)
      );
      toast.success("Tour deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting tour:", error);
      toast.error("Error deleting tour");
      setIsDeleteModalOpen(false);
    }
  };

  // when click on deleteIcon to open a popUp
  const handleDelete = (rowId) => {
    const selectedRowData = data.find((row) => row.id === rowId);
    setTourDataToDelete(selectedRowData);
    setIsDeleteModalOpen(true);
  };

  // when click on add user , to open a form
  const openAddForm = () => {
    setIsFormAdd(true);
  };

  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    price: "",
    image: null,
    userId: ""
  });

  // Add A new tour
  const handleAdd = async (event) => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/tours/create`,
        formDataToSend
      );
      toast.success("Tour added successfully");
      console.log(response.data);
      setData((prevData) => [...prevData, response.data]);
      setFormData({
        title: "",
        startTime: "",
        endTime: "",
        price: "",
        image: null,
        userId: ""
      });
      setIsFormAdd(false);
    } catch (error) {
      console.log(error);
      toast.error("Error adding tour");
    }
  };

  const filterDatabySearch = (tourData) => {
    let filteredData = tourData;
  
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase().trim();
      filteredData = tourData.filter((item) => {
        if (item.title && typeof item.title === 'string') {
          return item.title.toLowerCase().includes(lowerSearchText);
        }
        return false;
      });
    }
  
    return filteredData;
  };
  
  const filteredData = filterDatabySearch(data);

  return (
    <div>
      <Helmet>
        <title>Dashboard ~ Tours</title>
        <meta name="description" content="Explore and manage tours in Tripoli through our user-friendly dashboard. Plan, organize, and optimize your travel experiences." />
        <meta name="keywords" content="Visit Tripoli, tours, travel planning, dashboard, manage tours, Tripoli attractions" />
      </Helmet>
      <ToastContainer />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress style={{ margin: "0 auto" }} />
        </div>
      ) : (
        <>
          {isProfileModalOpen && (
            <RowTour
              tourData={tourData}
              setTourData={setTourData}
              isProfileModalOpen={isProfileModalOpen}
              setIsProfileModalOpen={setIsProfileModalOpen}
              closeHandler={() => setIsProfileModalOpen(false)}
            />
          )}

          {isFormAdd && (
            <FormAdd
              closeHandler={() => setIsFormAdd(false)}
              handleAdd={handleAdd}
              formData={formData}
              setFormData={setFormData}
              isFormAdd={isFormAdd}
              setIsFormAdd={setIsFormAdd}
            />
          )}

          {isDeleteModalOpen && (
            <DeleteConfirmationDialog
              isOpen={isDeleteModalOpen}
              onCancel={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
              isTour={true}
            />
          )}

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }} className="headerUser"
            >
              <h1 style={{ color: "#314865" }}>Tours</h1>

              <Search searchText={searchText} setSearchText={setSearchText} />

              <ButtonToolbar>
                <Button
                  onClick={openAddForm}
                  appearance="primary"
                  style={{ backgroundColor: "#BB9463" }}
                >
                  <span style={{ marginRight: "5px", fontWeight: "bold" }}>
                    +{" "}
                  </span>{" "}
                  Add Tour
                </Button>
              </ButtonToolbar>
            </div>
            <div>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 800 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              color: "white",
                              minWidth: column.minWidth,
                              backgroundColor:
                                column.id === "id" ? "#BB9463" : "#314865",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value =
                                  column.id === "image" ? (
                                    <img
                                      src={getImageUrl(row[column.id])}
                                      alt=""
                                    />
                                  ) : (
                                    row[column.id]
                                  );
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                              <TableCell align="center">
                                <button
                                  onClick={() => handleEdit(row.id)}
                                  color="primary"
                                  style={{ border: "none", margin: "5px" }}
                                >
                                  <UpdateIcon style={{ color: "green" }} />
                                </button>

                                <button
                                  onClick={() => handleDelete(row.id)}
                                  color="secondary"
                                  style={{ border: "none" }}
                                >
                                  <DeleteIcon style={{ color: "red" }} />
                                </button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


