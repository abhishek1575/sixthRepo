//  running code with all field mandetory
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Grid2,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   FormHelperText,
// } from "@mui/material";

// const AddElement = ({ handleClose, getAllData }) => {
//   const [category, setCategory] = useState("Category");
//   const [subCategory, setSubCategory] = useState("Sub Category");
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     sap_no: "",
//     value: "",
//     manufacturer: "",
//     package_box: "",
//     location: "",
//     mpn: "",
//     stock: "",
//   });
//   const [errors, setErrors] = useState({
//     name: false,
//     description: false,
//     sap_no: false,
//     value: false,
//     manufacturer: false,
//     package_box: false,
//     location: false,
//     mpn: false,
//     stock: false,
//   });

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleSubCategoryChange = (event) => {
//     setSubCategory(event.target.value);
//   };

//   const handleInputChange = (field) => (event) => {
//     setFormData({ ...formData, [field]: event.target.value });
//     setErrors({ ...errors, [field]: false }); // Reset error when user starts typing
//   };

//   const isFormValid = () => {
//     let valid = true;
//     const newErrors = { ...errors };

//     if (!formData.name.trim()) {
//       newErrors.name = true;
//       valid = false;
//     }
//     if (!formData.description.trim()) {
//       newErrors.description = true;
//       valid = false;
//     }
//     if (category === "Category") {
//       valid = false;
//     }
//     if (subCategory === "Sub Category") {
//       valid = false;
//     }
//     if (!formData.sap_no.trim()) {
//       newErrors.sap_no = true;
//       valid = false;
//     }
//     if (!formData.value.trim()) {
//       newErrors.value = true;
//       valid = false;
//     }
//     if (!formData.manufacturer.trim()) {
//       newErrors.manufacturer = true;
//       valid = false;
//     }
//     if (!formData.package_box.trim()) {
//       newErrors.package_box = true;
//       valid = false;
//     }
//     if (!formData.location.trim()) {
//       newErrors.location = true;
//       valid = false;
//     }
//     if (!formData.mpn.trim()) {
//       newErrors.mpn = true;
//       valid = false;
//     }
//     if (!formData.stock.trim()) {
//       newErrors.stock = true;
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async () => {
//     if (isFormValid()) {
//       // Prepare form data for API submission
//       const dataToSubmit = {
//         name: formData.name,
//         category: category,
//         subCategory: subCategory,
//         value: formData.value,
//         description: formData.description,
//         manufacturer: formData.manufacturer,
//         package_box: formData.package_box,
//         location: formData.location,
//         mpn: formData.mpn,
//         sap_no: formData.sap_no,
//         stock: formData.stock,
//       };

//       // Get token from session storage
//       const token = sessionStorage.getItem("token");

//       try {
//         // Make API call
//         const response = await fetch("http://localhost:8083/item/add", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(dataToSubmit),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to submit the form");
//         }
//         getAllData();
//         handleClose();
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         alert("An error occurred while submitting the form. Please try again.");
//       }
//     } else {
//       alert("Please fill out all mandatory fields.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         padding: 4,
//         backgroundColor: "#fff",
//         borderRadius: "8px",
//         boxShadow: 24,
//       }}
//     >
//       <Grid2 container spacing={3}>
//         <Grid2 item xs={12}>
//           <TextField
//             label="Asset Name"
//             variant="outlined"
//             fullWidth
//             sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
//             value={formData.name}
//             onChange={handleInputChange("name")}
//             error={errors.name}
//             helperText={errors.name ? "Asset Name is required" : ""}
//           />
//         </Grid2>

//         <Grid2 item xs={12} sm={6}>
//           <TextField
//             label="Value"
//             variant="outlined"
//             fullWidth
//             sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
//             value={formData.value}
//             onChange={handleInputChange("value")} // Handle value change
//             error={errors.value}
//             helperText={errors.value ? "Value is required" : ""}
//           />
//         </Grid2>

//         <Grid2 item xs={12}>
//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
//             value={formData.description}
//             onChange={handleInputChange("description")}
//             error={errors.description}
//             helperText={errors.description ? "Description is required" : ""}
//           />
//         </Grid2>

//         <Grid2 item xs={12} sm={6}>
//           <FormControl variant="outlined" fullWidth>
//             <InputLabel>Sub Category</InputLabel>
//             <Select
//               value={subCategory}
//               onChange={handleSubCategoryChange}
//               label="Sub Category"
//             >
//               <MenuItem value="Sub Category" disabled>
//                 Sub Category
//               </MenuItem>
//               <MenuItem value="Electronics">Electronics</MenuItem>
//               <MenuItem value="Mechanics">Tools & Instruments</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid2>

//         <Grid2 item xs={12} sm={6}>
//           <FormControl variant="outlined" fullWidth>
//             <InputLabel>Category</InputLabel>
//             <Select
//               value={category}
//               onChange={handleCategoryChange}
//               label="Category"
//             >
//               <MenuItem value="Category" disabled>
//                 Category
//               </MenuItem>
//               <MenuItem value="Asset">Asset</MenuItem>
//               <MenuItem value="Component">Component</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid2>

//         <Grid2 item xs={12} sm={6}>
//           <TextField
//             label="Manufacturer"
//             variant="outlined"
//             fullWidth
//             sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
//             value={formData.manufacturer}
//             onChange={handleInputChange("manufacturer")}
//             error={errors.manufacturer}
//             helperText={errors.manufacturer ? "Manufacturer is required" : ""}
//           />
//         </Grid2>

//         <Grid2 item xs={12} sm={6}>
//           <TextField
//             label="Location"
//             variant="outlined"
//             fullWidth
//             sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
//             value={formData.location}
//             onChange={handleInputChange("location")}
//             error={errors.location}
//             helperText={errors.location ? "Location is required" : ""}
//           />
//         </Grid2>

//         <Grid2 item xs={12} sm={6}>
//           <TextField
//             label="Package Box"
//             variant="outlined"
//             fullWidth
//             sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
//             value={formData.package_box}
//             onChange={handleInputChange("package_box")}
//             error={errors.package_box}
//             helperText={errors.package_box ? "Package Box is required" : ""}
//           />
//         </Grid2>

//         <Grid2 item xs={12} sm={6}>
//           <TextField
//             label="MPN"
//             variant="outlined"
//             fullWidth
//             sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
//             value={formData.mpn}
//             onChange={handleInputChange("mpn")}
//             // error={errors.mpn}
//             // helperText={errors.mpn ? "MPN is required" : ""}
//           />
//         </Grid2>
//         <Grid2 item xs={12} sm={6}>
//           <TextField
//             label="SAP NO"
//             variant="outlined"
//             fullWidth
//             sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
//             value={formData.sap_no}
//             onChange={handleInputChange("sap_no")}
//             error={errors.sap_no}
//             helperText={errors.sap_no ? "SAP NO is required" : ""}
//           />
//         </Grid2>
//         <Grid2 item xs={12} sm={6}>
//           <TextField
//             label="Stock"
//             variant="outlined"
//             fullWidth
//             sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
//             value={formData.stock}
//             onChange={handleInputChange("stock")}
//             error={errors.stock}
//             helperText={errors.stock ? "Stock is required" : ""}
//           />
//         </Grid2>
//       </Grid2>

//       {/* Save Button */}
//       <Box textAlign="center" mt={4}>
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           sx={{
//             borderRadius: "8px",
//             "&:hover": { backgroundColor: "#1976d2" }, // Darken the button color on hover
//           }}
//           onClick={handleSubmit}
//         >
//           Save
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AddElement;


//latest code with mpn , package and sap no is not mandetory
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid2,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const AddElement = ({ handleClose, getAllData }) => {
  const [category, setCategory] = useState("Category");
  const [subCategory, setSubCategory] = useState("Sub Category");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sap_no: "",
    value: "",
    manufacturer: "",
    package_box: "",
    location: "",
    mpn: "",
    stock: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    sap_no: false,
    value: false,
    manufacturer: false,
    package_box: false,
    location: false,
    mpn: false,
    stock: false,
  });

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    setErrors({ ...errors, [field]: false }); // Reset error when user starts typing
  };

 const isFormValid = () => {
   let valid = true;
   const newErrors = { ...errors };

   if (!formData.name.trim()) {
     newErrors.name = true;
     valid = false;
   }
   if (!formData.description.trim()) {
     newErrors.description = true;
     valid = false;
   }
   if (category === "Category") {
     valid = false;
   }
   if (subCategory === "Sub Category") {
     valid = false;
   }
   if (!formData.value.trim()) {
     newErrors.value = true;
     valid = false;
   }
   if (!formData.manufacturer.trim()) {
     newErrors.manufacturer = true;
     valid = false;
   }
   if (!formData.location.trim()) {
     newErrors.location = true;
     valid = false;
   }
   if (!formData.stock.trim()) {
     newErrors.stock = true;
     valid = false;
   }

   // No validation for MPN, SAP NO, and Package Box as they are now optional
   setErrors(newErrors);
   return valid;
 };


  const handleSubmit = async () => {
    if (isFormValid()) {
      // Prepare form data for API submission
      const dataToSubmit = {
        name: formData.name,
        category: category,
        subCategory: subCategory,
        value: formData.value,
        description: formData.description,
        manufacturer: formData.manufacturer,
        package_box: formData.package_box,
        location: formData.location,
        mpn: formData.mpn,
        sap_no: formData.sap_no,
        stock: formData.stock,
      };

      // Get token from session storage
      const token = sessionStorage.getItem("token");

      try {
        // Make API call
        const response = await fetch("http://localhost:8083/item/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSubmit),
        });

        if (!response.ok) {
          throw new Error("Failed to submit the form");
        }
        getAllData();
        handleClose();
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again.");
      }
    } else {
      alert("Please fill out all mandatory fields.");
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: 24,
      }}
    >
      <Grid2 container spacing={3}>
        <Grid2 item xs={12}>
          <TextField
            label="Asset Name"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
            value={formData.name}
            onChange={handleInputChange("name")}
            error={errors.name}
            helperText={errors.name ? "Asset Name is required" : ""}
          />
        </Grid2>

        <Grid2 item xs={12} sm={6}>
          <TextField
            label="Value"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
            value={formData.value}
            onChange={handleInputChange("value")} // Handle value change
            error={errors.value}
            helperText={errors.value ? "Value is required" : ""}
          />
        </Grid2>

        <Grid2 item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
            value={formData.description}
            onChange={handleInputChange("description")}
            error={errors.description}
            helperText={errors.description ? "Description is required" : ""}
          />
        </Grid2>

        <Grid2 item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Sub Category</InputLabel>
            <Select
              value={subCategory}
              onChange={handleSubCategoryChange}
              label="Sub Category"
            >
              <MenuItem value="Sub Category" disabled>
                Sub Category
              </MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Mechanics">Tools & Instruments</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="Category" disabled>
                Category
              </MenuItem>
              <MenuItem value="Asset">Asset</MenuItem>
              <MenuItem value="Component">Component</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 item xs={12} sm={6}>
          <TextField
            label="Manufacturer"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
            value={formData.manufacturer}
            onChange={handleInputChange("manufacturer")}
            error={errors.manufacturer}
            helperText={errors.manufacturer ? "Manufacturer is required" : ""}
          />
        </Grid2>

        <Grid2 item xs={12} sm={6}>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
            value={formData.location}
            onChange={handleInputChange("location")}
            error={errors.location}
            helperText={errors.location ? "Location is required" : ""}
          />
        </Grid2>

        <Grid2 item xs={12} sm={6}>
          <TextField
            label="Package Box"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
            value={formData.package_box}
            onChange={handleInputChange("package_box")}
            error={errors.package_box}
            helperText={errors.package_box ? "Package Box is required" : ""}
          />
        </Grid2>

        <Grid2 item xs={12} sm={6}>
          <TextField
            label="MPN"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
            value={formData.mpn}
            onChange={handleInputChange("mpn")}
            // error={errors.mpn}
            // helperText={errors.mpn ? "MPN is required" : ""}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            label="SAP NO"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
            value={formData.sap_no}
            onChange={handleInputChange("sap_no")}
            error={errors.sap_no}
            helperText={errors.sap_no ? "SAP NO is required" : ""}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            label="Stock"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "8px", backgroundColor: "#f5f5f5" }}
            value={formData.stock}
            onChange={handleInputChange("stock")}
            error={errors.stock}
            helperText={errors.stock ? "Stock is required" : ""}
          />
        </Grid2>
      </Grid2>

      {/* Save Button */}
      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#1976d2" }, // Darken the button color on hover
          }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AddElement;