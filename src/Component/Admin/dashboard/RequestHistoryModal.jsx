// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const RequestHistoryModal = ({ open, handleClose }) => {
//   const [requests, setRequests] = useState([]);

//   // Fetch data from API
//   useEffect(() => {
//     if (open) {
//       const token = sessionStorage.getItem("token");
//       fetch("http://localhost:8083/item/getAllRequest", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setRequests(data);
//         })
//         .catch((error) => console.error("Error fetching data:", error));
//     }
//   }, [open]);

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "80%",
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
//           Request History
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Item Name</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>SubCategory</TableCell>
//                 <TableCell>Quantity Requested</TableCell>
//                 <TableCell>Approval Status</TableCell>
//                 <TableCell>Requested By</TableCell>
//                 <TableCell>Project Name</TableCell>
//                 <TableCell>Remark</TableCell>
//                 <TableCell>Requested At</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {requests.map((request) => (
//                 <TableRow key={request.id}>
//                   <TableCell>{request.id}</TableCell>
//                   <TableCell>{request.item.name}</TableCell>
//                   <TableCell>{request.item.category}</TableCell>
//                   <TableCell>{request.item.subCategory}</TableCell>
//                   <TableCell>{request.quantityRequest}</TableCell>
//                   <TableCell>{request.approvalStatus}</TableCell>
//                   <TableCell>{request.userName}</TableCell>
//                   <TableCell>{request.projectName}</TableCell>
//                   <TableCell>{request.remark}</TableCell>
//                   <TableCell>
//                     {new Date(request.localDateTime).toLocaleString()}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleClose}
//           sx={{ mt: 2 }}
//         >
//           Cancel
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default RequestHistoryModal;

import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const RequestHistoryModal = ({ open, handleClose }) => {
  const [requests, setRequests] = useState([]);

  // Fetch data from API
  useEffect(() => {
    if (open) {
      const token = sessionStorage.getItem("token");
      fetch("http://localhost:8083/item/getAllRequest", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setRequests(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [open]);

  return (
    <Modal open={open} onClose={(e, reason) => reason === "backdropClick" && e.stopPropagation()}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Request History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>SubCategory</TableCell>
                <TableCell>Quantity Requested</TableCell>
                <TableCell>Approval Status</TableCell>
                <TableCell>Requested By</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Remark</TableCell>
                <TableCell>Requested At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.item.name}</TableCell>
                  <TableCell>{request.item.category}</TableCell>
                  <TableCell>{request.item.subCategory}</TableCell>
                  <TableCell>{request.quantityRequest}</TableCell>
                  <TableCell>{request.approvalStatus}</TableCell>
                  <TableCell>{request.userName}</TableCell>
                  <TableCell>{request.projectName}</TableCell>
                  <TableCell>{request.remark}</TableCell>
                  <TableCell>
                    {new Date(request.localDateTime).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default RequestHistoryModal;

