import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SubmitMeetingSummary() {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (title?.length === 0 || summary?.length === 0) {
        toast.error("Missing data in fields!");
        return;
      }

      const meetingData = { date, title, summary };
      axios.post("http://192.168.28.171:8000/store_data", meetingData);

      toast.error("Submitted successfully!");

      setDate("");
      setTitle("");
      setSummary("");
    } catch (error) {
      // Show error toast
      toast.error("Failed to submit meeting data.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: 3,
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "85%",
          maxWidth: "600px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom fontWeight="bold">
          Meeting Summary
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Date & Title Row (Adjusted Sizes) */}

          <TextField
            id="title"
            label="Title"
            name="title"
            multiline
            rows={2}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />

          <TextField
            id="meeting-date"
            label="Date"
            name="date"
            type="date"
            value={date}
            //   fullWidth
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />

          {/* Summary Field */}
          <TextField
            id="meeting-summary"
            label="Summary"
            multiline
            rows={5}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            sx={{
                                borderRadius: "8px",
                                fontWeight: "bold",
                                paddingX: 3,
                                marginRight: "10px",
                                "&:hover": { backgroundColor: "#3c6e71" },
                            }}
                        >
                            Review
                        </Button> */}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                borderRadius: "8px",
                fontWeight: "bold",
                paddingX: 3,
                "&:hover": { backgroundColor: "#3c6e71" },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
