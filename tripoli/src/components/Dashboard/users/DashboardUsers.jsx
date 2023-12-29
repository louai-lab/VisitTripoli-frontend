import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./DashboardUsers.css";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import UpdateIcon from "@mui/icons-material/UpdateSharp";
import { CircularProgress } from "@mui/material";
import RowUser from "./RowUser.jsx";
import { Button, ButtonToolbar } from "rsuite";
import FormAdd from "./FormAdd.jsx";
import DeleteConfirmationDialog from "./DeleteConfirmationModal.jsx";
import { ToastContainer, toast } from "react-toastify";
import Search from "../../search/Search.jsx";

const columns = [
  { id: "id", label: "ID", minWidth: 10 },
  { id: "image", label: "Image", minWidth: 10 },
  { id: "name", label: "Name", minWidth: 10 },
  { id: "role", label: "Role", minWidth: 10 },
  {
    id: "email",
    label: "Email",
    minWidth: 10,
    align: "center",
  },
];

export default function DashboardUsers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFormAdd, setIsFormAdd] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userDataToDelete, setUserDataToDelete] = useState(null);
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
          `${process.env.REACT_APP_BACKEND}/user`
        );
        const users = response.data;
        // console.log(users)
        setData(users);
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

  // Edit a user
  const handleEdit = (rowId) => {
    console.log(rowId);
    setIsProfileModalOpen(true);
    const selectedRowData = data.find((row) => row.id === rowId);
    setUserData(selectedRowData);
  };

  // Confirmation the Delete
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND}/user/delete/${userDataToDelete.id}`
      );
      setData((prevData) =>
        prevData.filter((row) => row.id !== userDataToDelete.id)
      );
      toast.success("User deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
      setIsDeleteModalOpen(false);
    }
  };

  // when click on deleteIcon to open a popUp
  const handleDelete = (rowId) => {
    const selectedRowData = data.find((row) => row.id === rowId);
    setUserDataToDelete(selectedRowData);
    setIsDeleteModalOpen(true);
  };

  // when click on add user , to open a form
  const openAddForm = () => {
    setIsFormAdd(true);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    image: null,
  });

  // Add A new user
  const handleAdd = async (event) => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/user/register`,
        formDataToSend
      );
      toast.success("User added successfully");
      console.log(response.data);
      setData((prevData) => [...prevData, response.data]);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        image: null,
      });
      setIsFormAdd(false);
    } catch (error) {
      console.log(error);
      toast.error("Error adding user");
    }
  };

  const filterDatabySearch = (userData) => {
    let filteredData = userData;
  
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase().trim();
      filteredData = userData.filter((item) =>
        item.name && item.name.toLowerCase().includes(lowerSearchText)
      );
    }
  
    return filteredData;
  };

  const filteredData = filterDatabySearch(data);

  return (
    <div>
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
            <RowUser
              userData={userData}
              setUserData={setUserData}
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
              <h1 style={{ color: "#314865" }}>Users</h1>

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
                  Add User
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
