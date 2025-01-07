import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Modal,
  Box,
  Menu,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewListIcon from "@mui/icons-material/ViewList";
import ceinsys_logo from "../Image/ceinsys_logo.png";
import axios from "axios";
import Config from "../../Service/Config";
import AddUserForm from "./AddUser";
import UserTable from "./UserTable";
import Available from "../Admin/dashboard/Available";
import { useNavigate } from "react-router-dom";
const BASE_URL = Config.API_BASE_URL;

const Dashboard2 = () => {
  const [open, setOpen] = useState(false);
  const [parentTableData, setParentTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const [addUserModal, setAddUserModal] = useState(false);
  const [userTableModal, setUserTableModal] = useState(false);
  const [openAvailableForm, setOpenAvailableForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  // State for blinking effect
  const [anchorElLogout, setAnchorElLogout] = useState(null);
  const navigate = useNavigate();
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // Handlers
  const handleMenuOpenLogout = (event) => {
    setAnchorElLogout(event.currentTarget);
  };

  const handleMenuCloseLogout = () => {
    setAnchorElLogout(null);
  };

  const handleCategoryAndSubCategoryChange = (event, type) => {
    if (type === "subCategory") {
      const category = event.target.value;
      setSelectedSubCategory(category);
    } else {
      const category = event;
      setSelectedCategory(category);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
  };

  // Effect for filtering table data
  useEffect(() => {
    const applyFilters = () => {
      let filteredData = parentTableData;
      console.log("ct ", selectedCategory);

      if (selectedCategory !== "All") {
        filteredData = filteredData.filter(
          (item) => item.category === selectedCategory
        );
      }

      if (selectedSubCategory !== "All") {
        filteredData = filteredData.filter(
          (item) => item.subCategory === selectedSubCategory
        );
      }

      if (searchValue) {
        filteredData = filteredData.filter((item) =>
          Object.entries(item).some(([key, attr]) => {
            // Check if the key is 'sapNumber' (or the specific key you are using for SAP Numbers)
            if (key === "sapNumber" && typeof attr === "number") {
              const numericSearchValue = Number(searchValue);
              return !isNaN(numericSearchValue) && attr === numericSearchValue;
            }
            // General string search for other fields
            if (typeof attr === "string") {
              return attr.toLowerCase().includes(searchValue.toLowerCase());
            }
            // For other numeric fields
            if (typeof attr === "number") {
              const numericSearchValue = Number(searchValue);
              return !isNaN(numericSearchValue) && attr === numericSearchValue;
            }
            return false;
          })
        );
      }

      setTableData(filteredData);
    };

    applyFilters();
  }, [selectedCategory, selectedSubCategory, searchValue, parentTableData]);

  const handleLogoutClick = () => {
    // Clear session and local storage
    sessionStorage.clear();
    localStorage.clear();

    // Perform additional logout actions if needed, such as redirecting
    console.log("Logged out successfully");
    navigate("/login");
    handleMenuCloseLogout();
  };

  // Handle Modal Open and Close for available
  const handleOpen = () => setOpen(true);
  const handleClose = (propertyName) => {
    if (propertyName === "AddUserModal") {
      setAddUserModal(false);
    } else if (propertyName === "UserTableModal") {
      setUserTableModal(false);
    } else if (propertyName === "AvailableForm") {
      setOpenAvailableForm(false);
    } else {
      setOpen(false);
    }
  };

  // Menu Item Selection
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    handleMenuClose();
  };

  const getAllData = () => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`${BASE_URL}item/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setParentTableData(response.data);
        setTableData(response.data); // Store the response data in state
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true);
    handleMenuCloseLogout();
  };

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false);
  };

  const handleChangePasswordSubmit = async () => {
    try {
      // Retrieve token and id from sessionStorage
      const token = sessionStorage.getItem("token");
      const id = sessionStorage.getItem("UserId");

      // Check if token and id are present
      if (!token || !id) {
        console.error("Token or ID is missing");
        return;
      }

      // Make API call to change password
      const response = await axios.post(
        "http://localhost:8083/api/changePassword",
        {
          id: parseInt(id, 10), // Ensure id is sent as a number
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle response
      if (response.status === 200) {
        alert("Password changed successfully"); // Show success alert
        setOpenChangePasswordModal(false);
        setOldPassword("");
        setNewPassword("");
      } else {
        console.error("Error changing password:", response.data);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div>
      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#3B92CD" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Section */}
          <img
            src={ceinsys_logo}
            alt="Ceinsys Logo"
            style={{ height: "40px", marginRight: "16px" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              marginLeft: "140px",
            }}
          >
            <Button color="inherit" onClick={handleMenuOpen}>
              {selectedCategory}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={(e) => {
                  handleCategoryAndSubCategoryChange("All", "Category");
                }}
              >
                All
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  handleCategoryAndSubCategoryChange("Asset", "Category");
                }}
              >
                Asset
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  handleCategoryAndSubCategoryChange("Component", "Category");
                }}
              >
                Component
              </MenuItem>
            </Menu>
            {/* <Button color="inherit">History</Button> */}
            <Button color="inherit" onClick={() => setAddUserModal(true)}>
              Add USER
            </Button>
            <Button color="inherit" onClick={() => setUserTableModal(true)}>
              USER TABLE
            </Button>
            <Typography color="inherit" style={{ marginRight: "16px" }}>
              Contact Us: contact@ceinsys.com
            </Typography>
          </div>

          {/* Right Section */}
          <div>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuOpenLogout}>
              <AccountCircleIcon />
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorElLogout}
              open={Boolean(anchorElLogout)}
              onClose={handleMenuCloseLogout}
            >
              <MenuItem onClick={handleOpenChangePasswordModal}>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <div
        style={{
          marginTop: "60px",
          padding: "16px",
          backgroundColor: "#A8D2EF",
        }}
      >
        <Typography variant="h5">
          Welcome {sessionStorage.getItem("Name")}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "12px",
            backgroundColor: "#f5f5f5",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Select
              defaultValue="All"
              value={selectedSubCategory}
              onChange={(e) => {
                handleCategoryAndSubCategoryChange(e, "subCategory");
              }}
              style={{ marginRight: "16px", width: "120px" }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Mechanics">Tools & Instruments</MenuItem>
            </Select>
            <TextField
              variant="outlined"
              placeholder="Search"
              size="small"
              style={{ marginRight: "16px" }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <IconButton color="primary">
              <FilterListIcon />
            </IconButton>
            <IconButton color="primary">
              <ViewListIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Table Section with Fixed Header */}
      <div
        style={{
          marginTop: "10px", // Make sure it starts below the welcome message
          padding: "16px",
        }}
      >
        <Paper style={{ maxHeight: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Component Name</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Specification</TableCell>
                <TableCell>Sub Category</TableCell>
                <TableCell>MFG/Supplier</TableCell>
                {/* <TableCell>Location</TableCell> */}
                <TableCell>Package</TableCell>
                <TableCell>MPN</TableCell>
                <TableCell>SAP_No</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {row.subCategory === "Mechanics"
                      ? "Tools and Instruments"
                      : row.subCategory}
                  </TableCell>
                  <TableCell>{row.manufacturer}</TableCell>
                  {/* <TableCell>{row.location}</TableCell> */}
                  <TableCell>{row.package_box}</TableCell>
                  <TableCell>{row.mpn}</TableCell>
                  <TableCell>{row.sap_no}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      color={
                        row.category === "Asset" &&
                        row.subCategory === "Mechanics"
                          ? row.stock < 0
                            ? "error" // Red for unavailable
                            : "success" // Green for available
                          : (row.category === "Component" &&
                              row.subCategory === "Electronics") ||
                            (row.category === "Component" &&
                              row.subCategory === "Mechanics") ||
                            (row.category === "Asset" &&
                              row.subCategory === "Electronics")
                          ? row.stock <= 0
                            ? "error" // Red for unavailable
                            : row.stock < 10
                            ? "warning" // Orange for low stock
                            : "success" // Green for available
                          : row.stock <= 0
                          ? "error"
                          : row.stock < 10
                          ? "warning"
                          : "success"
                      }
                      onClick={() => {
                        if (
                          (row.category === "Component" &&
                            row.subCategory === "Electronics") ||
                          (row.category === "Component" &&
                            row.subCategory === "Mechanics") ||
                          (row.category === "Asset" &&
                            row.subCategory === "Electronics") ||
                          (row.category === "Asset" &&
                            row.subCategory === "Mechanics")
                        ) {
                          if (row.stock > 0) {
                            setSelectedItem(row);
                            setOpenAvailableForm(true);
                          }
                        }
                      }}
                    >
                      {row.category === "Asset" &&
                      row.subCategory === "Mechanics"
                        ? row.stock < 0
                          ? "Unavailable"
                          : "Available"
                        : (row.category === "Component" &&
                            row.subCategory === "Electronics") ||
                          (row.category === "Component" &&
                            row.subCategory === "Mechanics") ||
                          (row.category === "Asset" &&
                            row.subCategory === "Electronics")
                        ? row.stock <= 0
                          ? "Unavailable"
                          : row.stock < 10
                          ? "Low Stock"
                          : "Available"
                        : row.stock <= 0
                        ? "Unavailable"
                        : row.stock < 10
                        ? "Low Stock"
                        : "Available"}
                    </Button>
                   
                                       
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Modal
          open={addUserModal}
          onClose={null} // Prevent closing when clicking outside
          closeAfterTransition
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#fff",
              boxShadow: 24,
              borderRadius: 3,
              p: 4,
              width: "60%",
              maxHeight: "80vh",
              overflowY: "auto",
              position: "relative", // Add relative positioning to position the close icon
            }}
          >
            {/* Close Icon in the top right corner */}
            <IconButton
              onClick={() => handleClose("AddUserModal")} // Close the modal when clicked
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "#f44336", // Red background for the close button
                color: "#fff",
                "&:hover": { backgroundColor: "#d32f2f" }, // Darken red on hover
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Add the form from AddElement */}
            <AddUserForm
              handleClose={() => handleClose("AddUserModal")}
              getAllData={getAllData}
            />
          </Box>
        </Modal>
        <Modal
          open={userTableModal}
          onClose={null} // Prevent closing when clicking outside
          closeAfterTransition
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#fff",
              boxShadow: 24,
              borderRadius: 3,
              p: 4,
              width: "60%",
              maxHeight: "80vh",
              overflowY: "auto",
              position: "relative", // Add relative positioning to position the close icon
            }}
          >
            {/* Close Icon in the top right corner */}
            <IconButton
              onClick={() => handleClose("UserTableModal")} // Close the modal when clicked
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "#f44336", // Red background for the close button
                color: "#fff",
                "&:hover": { backgroundColor: "#d32f2f" }, // Darken red on hover
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Add the form from AddElement */}
            <UserTable
              handleClose={() => handleClose("UserTableModal")}
              getAllData={getAllData}
            />
          </Box>
        </Modal>
        <Available
          open={openAvailableForm}
          data={selectedItem}
          handleClose={() => handleClose("AvailableForm")}
          getAllData={getAllData}
        />
        <Modal
          open={openChangePasswordModal}
          onClose={handleCloseChangePasswordModal}
          aria-labelledby="change-password-modal-title"
        >
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
            <IconButton
              onClick={() => handleCloseChangePasswordModal} // Close the modal when clicked
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "#f44336", // Red background for the close button
                color: "#fff",
                "&:hover": { backgroundColor: "#d32f2f" }, // Darken red on hover
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              id="change-password-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              Change Password
            </Typography>
            <TextField
              label="Old Password"
              type="password"
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              margin="normal"
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={handleCloseChangePasswordModal} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleChangePasswordSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard2;
