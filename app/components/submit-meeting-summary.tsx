import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Stack } from "@mui/material";

export function SubmitMeetingSummary() {
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const meetingData = { date, title, summary };
        console.log("Submitted meeting data:", meetingData);
        setDate("");
        setTitle("");
        setSummary("");
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

                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Date & Title Row (Adjusted Sizes) */}

                    <TextField
                        id="meeting-title"
                        label="Title"
                        multiline
                        rows={2}
                        value={title}
                        onChange={(e) => setSummary(e.target.value)}
                        // fullWidth
                        variant="outlined"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                    />

                    <TextField
                        id="meeting-date"
                        label="Date"
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
                        <Button
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
                        </Button>


                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
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
