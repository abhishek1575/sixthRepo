// old running code
// import React, { useState, useEffect } from "react";
// import { Grid, Modal, Box, TextField, Button, IconButton, Typography } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { requestItem } from "../../../Service/services";

// const Available = ({ open, handleClose, data, getAllData }) => {
//   const [formData, setFormData] = useState(data);
//   const [availableForm,setAvailableForm] = useState({'userName':sessionStorage.getItem('Name')});

//   useEffect(() => {
//     setFormData(data);
//   }, [data]);

//   const handleChange = (ProductItem) => {
//     setAvailableForm({
//       ...availableForm,
//       [ProductItem.name]: ProductItem.value,
//     });
//   };

//   const handleSave = async () => {
//     try {
//       setAvailableForm({
//         ...availableForm,

//       });
//       const dataToUpload = {id: data.id,...availableForm}
//       console.log('formdata is ',dataToUpload);
//       await requestItem(dataToUpload);
//       handleClose();
//       alert('request added successfully!!!');

//     } catch (error) {
//       console.error("Error updating item:", error);
//     }
//     getAllData();
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           bgcolor: "white",
//           boxShadow: 24,
//           p: 4,
//           width: "60%", // Adjust width to make it suitable for two columns
//           borderRadius: 3,
//         }}
//       >
//         <Typography variant="h6" mb={2}>
//           Issue Item
//         </Typography>
//         <IconButton
//           onClick={handleClose}
//           sx={{
//             position: "absolute",
//             top: 8,
//             right: 8,
//             backgroundColor: "#f44336",
//             color: "#fff",
//             "&:hover": { backgroundColor: "#d32f2f" },
//           }}
//         >
//           <CloseIcon />
//         </IconButton>

//         {/* Grid Layout for Form Fields */}
//         <Grid container spacing={2}>
//           {/* Left Column */}
//           <Grid item xs={12}>
//             {/* <TextField
//               name="componentName"
//               label="Component Name"
//               value={formData?.name || ""}
//               disabled
//               sx={{ mb: 2, width: "100%" }}
//             />
//             <TextField
//               name="value"
//               label="Value"
//               value={formData?.value || ""}
//               disabled
//               sx={{ mb: 2, width: "100%" }}
//             />
//             <TextField
//               name="specification"
//               label="Specification"
//               value={formData?.description || ""}
//               disabled
//               sx={{ mb: 2, width: "100%" }}
//             /> */}
//            <Box sx={{ mb: 3 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
//               Component Name: {formData?.name}
//             </Typography>
//             <Typography variant="body1" sx={{ color: 'text.secondary', marginTop: 1 }}>
//               Value: {formData?.value}
//             </Typography>
//             <Typography variant="body2" sx={{ color: 'text.primary', marginTop: 1 }}>
//               Specification: {formData?.description}
//             </Typography>
//           </Box>
//             <TextField
//               name="stock"
//               label="Stock"
//               value={availableForm?.stock}
//               onChange={(e)=>handleChange({name:'quantityRequested',value:e.target.value})}
//               sx={{ mb: 2, width: "100%" }}
//               required
//             />
//             <TextField
//               name="projectName"
//               label="projectName"
//               value={availableForm?.projectName}
//               onChange={(e)=>handleChange({name:'projectName',value:e.target.value})}
//               required
//               sx={{ mb: 2, width: "100%" }}
//             />
//             <TextField
//               name="Remark"
//               label="Remark"
//               value={availableForm?.remark}
//               onChange={(e)=>handleChange({name:'remark',value:e.target.value})}
//               sx={{ mb: 2, width: "100%" }}
//               required
//             />
//           </Grid>
//         </Grid>

//         {/* Buttons */}
//         <Box display="flex" justifyContent="space-between" mt={2}>
//           <Button variant="contained" color="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default Available;

//latest code
import React, { useState, useEffect } from "react";
import {
  Grid,
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { requestItem } from "../../../Service/services";

const Available = ({ open, handleClose, data, getAllData }) => {
  const [formData, setFormData] = useState(data);
  const [availableForm, setAvailableForm] = useState({
    userName: sessionStorage.getItem("Name"),
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (ProductItem) => {
    setAvailableForm({
      ...availableForm,
      [ProductItem.name]: ProductItem.value,
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (
      !availableForm.quantityRequested ||
      availableForm.quantityRequested < 1
    ) {
      tempErrors.quantityRequested = "Quantity requested must be at least 1";
    } else if (availableForm.quantityRequested > formData?.stock) {
      tempErrors.quantityRequested =
        "Requested quantity exceeds available stock";
    }

    if (!availableForm.projectName)
      tempErrors.projectName = "Project name is required";
    if (!availableForm.remark) tempErrors.remark = "Remark is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  
  const handleSave = async () => {
    if (!validate()) return;

    try {
      const dataToUpload = { id: data.id, ...availableForm };
      console.log("formdata is ", dataToUpload);
      await requestItem(dataToUpload);
      handleClose();
      alert("Request added successfully!");

      // Call the parent function to fetch updated data
      getAllData();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };


  // const handleSave = async () => {
  //   if (!validate()) return;

  //   try {
  //     const dataToUpload = { id: data.id, ...availableForm };
  //     console.log("formdata is ", dataToUpload);
  //     await requestItem(dataToUpload);
  //     handleClose();
  //     alert("Request added successfully!");
  //   } catch (error) {
  //     console.error("Error updating item:", error);
  //   }
  //   getAllData();
  // };

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
          width: "60%",
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" mb={2}>
          Issue Item
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                Component Name: {formData?.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", marginTop: 1 }}
              >
                Value: {formData?.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.primary", marginTop: 1 }}
              >
                Specification: {formData?.description}
              </Typography>
            </Box>
            <TextField
              name="stock"
              label="Requested Quantity"
              value={availableForm?.quantityRequested}
              onChange={(e) =>
                handleChange({
                  name: "quantityRequested",
                  value: e.target.value,
                })
              }
              error={!!errors.quantityRequested}
              helperText={errors.quantityRequested}
              sx={{ mb: 2, width: "100%" }}
              required
            />
            <TextField
              name="projectName"
              label="Project Name"
              value={availableForm?.projectName}
              onChange={(e) =>
                handleChange({ name: "projectName", value: e.target.value })
              }
              error={!!errors.projectName}
              helperText={errors.projectName}
              required
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="Remark"
              label="Remark"
              value={availableForm?.remark}
              onChange={(e) =>
                handleChange({ name: "remark", value: e.target.value })
              }
              error={!!errors.remark}
              helperText={errors.remark}
              sx={{ mb: 2, width: "100%" }}
              required
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Available;
