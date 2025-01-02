import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const HistoryCards = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  const fetchRequests = async () => {
    const token = sessionStorage.getItem("token"); 
    try {
      const response = await axios.get("http://localhost:8083/item/getAllNonApprovedRequests", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setRequests(response.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Failed to fetch data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Approve request handler
  const handleApprove = async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:8083/item/approved?requestId=${id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert("Request approved successfully!");
        fetchRequests();
      } else {
        alert("Failed to approve request. Please try again.");
      }
    } catch (error) {
      console.error("Error approving the request:", error);
      alert("Error occurred while approving the request. Please try again later.");
    }   
  };
  

  // Deny request handler
  const handleDeny = async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.delete(
        `http://localhost:8083/item/deleteRequest?requestId=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );      
  
      if (response.status === 200) {
        alert("Request denied successfully!");
        fetchRequests();
      } else {
        alert("Failed to approve request. Please try again.");
      }
    } catch (error) {
      console.error("Error approving the request:", error);
      alert("Error occurred while approving the request. Please try again later.");
    }
  };

  return (
    <Paper style={{ padding: "20px" }}>
     
<TableContainer>
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        {/* <TableCell>Request ID</TableCell> */}
        <TableCell>Name</TableCell>
        <TableCell>Value</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Quantity Requested</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>User Name</TableCell>
        <TableCell>Project Name</TableCell>
        <TableCell>Remark</TableCell>
        <TableCell>Approved</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {requests.map((request) => (
        <TableRow key={request.id}>
          {/* <TableCell>{request.id}</TableCell> */}
          <TableCell>{request.item.name}</TableCell>
          <TableCell>{request.item.value}</TableCell>
          <TableCell>{request.item.description}</TableCell>
          <TableCell>{request.quantityRequest}</TableCell>
          <TableCell>{new Date(request.localDateTime).toLocaleString()}</TableCell>
          <TableCell>{request.userName}</TableCell>
          <TableCell>{request.projectName}</TableCell>
          <TableCell>{request.remark}</TableCell>
          <TableCell>{request.approved ? "Yes" : "No"}</TableCell>
          <TableCell>
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleApprove(request.id)}
                style={{ width: "100px" }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeny(request.id)}
                style={{ width: "100px" }}
              >
                Deny
              </Button>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

      {/* <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
             
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity Requested</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
               
                <TableCell>{request.item.name}</TableCell>
                <TableCell>{request.item.value}</TableCell>
                <TableCell>{request.item.description}</TableCell>
                <TableCell>{request.quantityRequest}</TableCell>
                <TableCell>{new Date(request.localDateTime).toLocaleString()}</TableCell>
                <TableCell>{request.userName}</TableCell>
                <TableCell>{request.projectName}</TableCell>
                <TableCell>{request.remark}</TableCell>
                <TableCell>{request.approved ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(request.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeny(request.id)}
                  >
                    Deny
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Paper>
  );
};

export default HistoryCards;
