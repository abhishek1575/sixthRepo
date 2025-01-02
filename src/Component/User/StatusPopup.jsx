// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Button,
//   TextField,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// const StatusPopup = ({ open, onClose, item, onSubmit }) => {
//   const [returnDate, setReturnDate] = useState(null);

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>
//         {item
//           ? `${item.category === "Asset" ? "Asset" : "Component"} Details`
//           : ""}
//       </DialogTitle>
//       <DialogContent>
//         {item && (
//           <>
//             <Typography>
//               <strong>Component Name:</strong> {item.componentName}
//             </Typography>
//             <Typography>
//               <strong>Value:</strong> {item.value}
//             </Typography>
//             {item.category === "Asset" && (
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <DatePicker
//                   label="Return Date"
//                   value={returnDate}
//                   onChange={(newDate) => setReturnDate(newDate)}
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//               </LocalizationProvider>
//             )}
//           </>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button
//           onClick={() => {
//             onSubmit(returnDate);
//             onClose();
//           }}
//           color="primary"
//         >
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default StatusPopup;
