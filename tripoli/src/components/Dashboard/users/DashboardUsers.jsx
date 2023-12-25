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
  //   {
  //     id: "actions",
  //     label: "Actions",
  //     minWidth: 100,
  //     align: "center",
  //   },
];

// function createData(id, image, name, role, email) {
//   return { id, image, name, role, email };
// }

// const rows = [
//   createData(1, "", "Louai", "Admin", "louai@gmail.com"),
//   createData(2, "", "Ahmad", "Admin", "louai@gmail.com"),
//   createData(3, "", "Samir", "Guide", "louai@gmail.com"),
//   createData(4, "", "Taysir", "Guide", "louai@gmail.com"),
//   createData(5, "", "Kamal", "Admin", "louai@gmail.com"),
//   createData(6, "", "Fouad", "Guide", "louai@gmail.com"),
//   createData(7, "", "Yahya", "Guide", "louai@gmail.com"),
//   createData(8, "", "Abed", "Admin", "louai@gmail.com"),
//   createData(9, "", "Taysir", "Guide", "louai@gmail.com"),
//   createData(10, "", "Kamal", "Admin", "louai@gmail.com"),
//   createData(11, "", "Fouad", "Guide", "louai@gmail.com"),
//   createData(12, "", "Yahya", "Guide", "louai@gmail.com"),
//   createData(13, "", "Abed", "Admin", "louai@gmail.com"),
// ];

export default function DashboardUsers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);


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

  const getImageUrl = (image) => {
    // Assuming the base URL is http://localhost:4000/images
    return `http://localhost:4000/images/${image}`;
  };

  const handleEdit = (rowId) => {
    console.log(rowId);
    setIsProfileModalOpen(true)
    const selectedRowData = data.find((row) => row.id === rowId)

    setUserData(selectedRowData)
  };

  

  const handleDelete = () => {};

  return (
    <div>
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
            <RowUser userData={userData} isProfileModalOpen={isProfileModalOpen} setIsProfileModalOpen={setIsProfileModalOpen} closeHandler={()=> setIsProfileModalOpen(false)}/>
          )}
          <div>
            <h1 style={{ color: "#314865" }}>Users</h1>
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
                      {data
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
                                  onClick={() => handleDelete()}
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
