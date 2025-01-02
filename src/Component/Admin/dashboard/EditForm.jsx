import React, { useState, useEffect } from "react";
import { Grid, Modal, Box, TextField, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateItem, deleteItem } from "../../../Service/services";

const EditForm = ({ open, handleClose, data, getAllData }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data); // Update formData when data changes
  }, [data]);

  const handleChange = (e) => {
    console.log('e is ',e.target.value);
    console.log('f is ',formData);
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      
      await updateItem(formData);
      handleClose();
    } catch (error) {
      console.error("Error updating item:", error);
    }
    getAllData();
  };

  const onSave = ()=>{}

  const handleDelete = async () => {
    try {
      await deleteItem(formData.id);
      handleClose();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    getAllData();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          width: "60%", // Adjust width to make it suitable for two columns
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Item
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "#f44336",
            color: "#fff",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Grid Layout for Form Fields */}
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={6}>
            <TextField
              name="componentName"
              label="Component Name"
              value={formData.name || ""}
              onChange={(e)=>{e.target.name = 'name'; handleChange(e);}}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="value"
              label="Value"
              value={formData.value || ""}
              onChange={(e)=>{e.target.name = 'value'; handleChange(e);}}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="specification"
              label="Specification"
              value={formData.description || ""}
              onChange={(e)=>{e.target.name = 'description'; handleChange(e);}}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="subcategory"
              label="Sub Category"
              value={formData.subCategory || ""}
              onChange={(e)=>{e.target.name = 'subCategory'; handleChange(e);}}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="manufacturer"
              label="MFG/Supplier"
              value={formData.manufacturer || ""}
              onChange={(e)=>{e.target.name = 'manufacturer'; handleChange(e);}}
              sx={{ mb: 2, width: "100%" }}
            />
          </Grid>

          {/* Right Column */}
          <Grid item xs={6}>
            <TextField
              name="location"
              label="Location"
              value={formData.location || ""}
              onChange={(e)=>{e.target.name = 'location'; handleChange(e);}}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="package_box"
              label="Package Box"
              value={formData.package_box || ""}
              onChange={(e)=>{e.target.name = 'package_box'; handleChange(e);}}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="mpn"
              label="MPN"
              value={formData.mpn || ""}
              onChange={(e)=>{e.target.name = 'mpn'; handleChange(e);}}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="sap_no"
              label="SAP No"
              value={formData.sap_no || ""}
              onChange={(e)=>{e.target.name = 'sap_no'; handleChange(e);}}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="stock"
              label="Stock"
              value={formData.stock || ""}
              onChange={(e)=>{e.target.name = 'stock'; handleChange(e);}}
              sx={{ mb: 2, width: "100%" }}
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditForm;