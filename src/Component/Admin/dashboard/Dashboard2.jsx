// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
// } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import EditForm from "./EditForm";
// import { fetchData } from "../../../Service/services";

// const Dashboard2 = () => {
//   const [data, setData] = useState([]);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const result = await fetchData();
//       setData(result);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleEditClick = (row) => {
//     setSelectedRow(row);
//     setEditModalOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditModalOpen(false);
//     setSelectedRow(null);
//   };

//   return (
//     <div>
//       <AppBar position="fixed" sx={{ backgroundColor: "#3B92CD" }}>
//         <Toolbar>
//           <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
//             Dashboard
//           </Typography>
//           <IconButton color="inherit">
//             <NotificationsIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <AccountCircleIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <div style={{ marginTop: "80px", padding: "16px" }}>
//         <Paper>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Sr. No.</TableCell>
//                 <TableCell>Component Name</TableCell>
//                 <TableCell>Value</TableCell>
//                 <TableCell>Specification</TableCell>
//                 <TableCell>Edit</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.map((row, index) => (
//                 <TableRow key={row.id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{row.componentName}</TableCell>
//                   <TableCell>{row.value}</TableCell>
//                   <TableCell>{row.specification}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       onClick={() => handleEditClick(row)}
//                     >
//                       Edit
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>
//       </div>

//       {/* Edit Form Modal */}
//       {selectedRow && (
//         <EditForm
//           open={editModalOpen}
//           handleClose={handleEditClose}
//           data={selectedRow}
//           onSave={loadData}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard2;


//latest
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewListIcon from "@mui/icons-material/ViewList";
import ceinsys_logo from "../../Image/ceinsys_logo.png";
import AddElement from "../dashboard/AddElement";
import HistoryCards from "../dashboard/HistoryCards";
import RequestHistoryModal from "./RequestHistoryModal";
import CloseIcon from "@mui/icons-material/Close";
import EditForm from "./EditForm";
import Config from "../../../Service/Config";
import { useNavigate } from "react-router-dom";
import Available from "./Available";
const BASE_URL = Config.API_BASE_URL;

const Dashboard2 = () => {
  const navigate = useNavigate();

  // State variables
  const [open, setOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openAvailableForm, setOpenAvailableForm] = useState(false);
  const [openHistoryCards, setHistoryCards] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [parentTableData, setParentTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [anchorElLogout, setAnchorElLogout] = useState(null);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);

  //request history model
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
      console.log('ct ',selectedCategory);
      
      if (selectedCategory !== 'All') {
        filteredData = filteredData.filter((item) => item.category === selectedCategory);
      }

      if (selectedSubCategory !== 'All') {
        filteredData = filteredData.filter((item) => item.subCategory === selectedSubCategory);
      }

      if (searchValue) {
        filteredData = filteredData.filter((item) =>
          Object.entries(item).some(([key, attr]) => {
            // Check if the key is 'sapNumber' (or the specific key you are using for SAP Numbers)
            if (key === "sap" && typeof attr === "number") {
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
    navigate('/login');
    handleMenuCloseLogout();
  };

  // State for blinking effect

  // Handle Modal Open and Close
  const handleOpen = () => setOpen(true);
  const handleClose = (propertyName) => {
    
    if (propertyName === 'EditForm') {
      setOpenEditForm(false);
    } else if (propertyName === 'AvailableForm') {
      setOpenAvailableForm(false);
    } else if (propertyName === 'HistoryCards') {
      setHistoryCards(false);
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
    const token = sessionStorage.getItem('token');
    axios.get(`${BASE_URL}item/getAll`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        setParentTableData(response.data);
        setTableData(response.data);  // Store the response data in state
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }

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
              <MenuItem onClick={(e) => { handleCategoryAndSubCategoryChange("All", "Category") }}>
                All
              </MenuItem>
              <MenuItem onClick={(e) => { handleCategoryAndSubCategoryChange("Asset", "Category") }}>
                Asset
              </MenuItem>
              <MenuItem onClick={(e) => { handleCategoryAndSubCategoryChange("Component", "Category") }}>
                Component
              </MenuItem>
            </Menu>
            <Button color="inherit" onClick={handleOpenModal}>History </Button>
           
            <Button color="inherit" onClick={handleOpen}>
              Add Element
            </Button>
            <Button color="inherit" onClick={() => { setHistoryCards(true);}}>Request</Button>
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
              <MenuItem onClick={handleOpenChangePasswordModal}>Change Password</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <div
        style={{ marginTop: "60px", padding: "16px", backgroundColor: "#A8D2EF" }}
      >
        <Typography variant="h5">Welcome {sessionStorage.getItem("Name")}</Typography>
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
            <Select defaultValue="All"
              value={selectedSubCategory}
              onChange={(e) => { handleCategoryAndSubCategoryChange(e, "subCategory") }}
              style={{ marginRight: "16px", width: "120px" }}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Mechanics">Mechanics</MenuItem>
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
                <TableCell>Location</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>MPN</TableCell>
                <TableCell>SAP_No</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.subCategory}</TableCell>
                  <TableCell>{row.manufacturer}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.package_box}</TableCell>
                  <TableCell>{row.mpn}</TableCell>
                  <TableCell>{row.sap_no}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ textTransform: 'none' }}
                      color={row.stock > 0 ? "success" : "error"}
                      onClick={() => {
                        if (row.stock > 0) {
                          setSelectedItem(row); setOpenAvailableForm(true);
                        }
                      }}
                    >
                      {row.stock > 0 ? "Availaible" : "Unavailaible"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        backgroundColor: "#CC6CE7", // Custom background color
                        '&:hover': {
                          backgroundColor: "#D17FD6", // Darker shade for hover effect
                        },
                        color: "#fff", // Text color
                      }}
                      variant="contained"
                      onClick={() => { setOpenEditForm(true); setSelectedItem(row); }}
                    // onClick={() => alert("Edit Clicked")}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>

      {/* Add Element Modal */}
      <Modal
        open={open}
        onClose={null}  // Prevent closing when clicking outside
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
            position: "relative" // Add relative positioning to position the close icon
          }}
        >
          {/* Close Icon in the top right corner */}
          <IconButton
            onClick={handleClose}  // Close the modal when clicked
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#f44336", // Red background for the close button
              color: "#fff",
              '&:hover': { backgroundColor: "#d32f2f" }, // Darken red on hover
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Add the form from AddElement */}
          <AddElement handleClose={() => handleClose('AddElement')} getAllData={getAllData} />
        </Box>
      </Modal>
      <Modal
        open={openHistoryCards}
        onClose={null}  // Prevent closing when clicking outside
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
            position: "relative" // Add relative positioning to position the close icon
          }}
        >
          {/* Close Icon in the top right corner */}
          <IconButton
            onClick={() => handleClose('HistoryCards')}  // Close the modal when clicked
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#f44336", // Red background for the close button
              color: "#fff",
              '&:hover': { backgroundColor: "#d32f2f" }, // Darken red on hover
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Add the form from AddElement */}
          <HistoryCards handleClose={() => handleClose('AddElement')} getAllData={getAllData} />
        </Box>
      </Modal>
      <EditForm open={openEditForm} data={selectedItem} handleClose={() => handleClose('EditForm')} getAllData={getAllData} />
      <Available open={openAvailableForm} data={selectedItem} handleClose={() => handleClose('AvailableForm')} getAllData={getAllData} />
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
          {/* <IconButton
            onClick={() => handleCloseChangePasswordModal}  // Close the modal when clicked
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#f44336", // Red background for the close button
              color: "#fff",
              '&:hover': { backgroundColor: "#d32f2f" }, // Darken red on hover
            }}
          >
            <CloseIcon />
          </IconButton> */}
          <Typography id="change-password-modal-title" variant="h6" component="h2" mb={2}>
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
      <RequestHistoryModal open={openModal} handleClose={handleCloseModal} />
      
    </div>
  );
};

export default Dashboard2;

