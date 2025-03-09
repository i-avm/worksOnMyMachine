// @ts-nocheck

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Chip,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";

import axios from "axios";

export function Dashboard() {
  const [jiraTasks, setJiraTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAnalytics = async () => {
      const { data } = await axios.get(
        "http://192.168.28.171:8000/get_jira_data",
      );
      setJiraTasks(data?.data);
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading Analytics...</Typography>
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, height: "90vh", display: "flex", flexDirection: "column" }}
    >
      {/* Title */}
      <Typography variant="inherit" gutterBottom>
        Welcome back, Amigo 🥳
      </Typography>

      {/* Summary Cards (Sticky at top) */}
      <Box sx={{ mb: 2, mt: 2 }}>
        <SummaryCards tasks={jiraTasks} />
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ flex: 1, overflow: "auto", maxHeight: "75vh", p: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SprintProgress tasks={jiraTasks} />
          </Grid>

          <Grid item xs={12} md={6}>
            {/* <SprintProgress tasks={jiraTasks} /> */}
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <BlockingTasks tasks={jiraTasks} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <UpcomingDueTasks tasks={jiraTasks} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <AssignedTasks tasks={jiraTasks} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const priorityColors: { [key: string]: any } = {
  High: "error",
  Medium: "warning",
  Low: "success",
  "In Progress": "warning",
  "To Do": "error",
  Done: "success",
};

// Assigned Tasks Table
const AssignedTasks = ({ tasks }: any) => {
  const assignedTasks = tasks
    // .filter((task: any) => task.isblocks.length === 0)
    .sort((a: any, b: any) => (a.priority > b.priority ? -1 : 1));

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Assigned Tasks
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Key</TableCell>
              <TableCell>Summary</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sprint</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedTasks.map((task: any) => (
              <TableRow key={task.id}>
                <TableCell>{task.key}</TableCell>
                <TableCell>{task.summary}</TableCell>
                <TableCell>
                  <Chip
                    label={task.priority}
                    color={priorityColors[task.priority]}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.status}
                    color={priorityColors[task.status]}
                  />
                </TableCell>
                <TableCell>{task.sprint ? task.sprint.name : "--"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Summary Cards
const SummaryCards = ({ tasks }: any) => {
  const totalTasks = tasks.length;
  const blockingTasks = tasks.filter(
    (task: any) => task.isblocks.length > 0,
  ).length;
  const highPriority = tasks.filter(
    (task: any) => task.priority === "High",
  ).length;
  const mediumPriority = tasks.filter(
    (task: any) => task.priority === "Medium",
  ).length;
  const lowPriority = tasks.filter(
    (task: any) => task.priority === "Low",
  ).length;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ bgcolor: "#1976d2", color: "white" }}>
          <CardContent>
            <Typography variant="h6">Total Assigned Tasks</Typography>
            <Typography variant="h4">{totalTasks}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ bgcolor: "#d32f2f", color: "white" }}>
          <CardContent>
            <Typography variant="h6">Blocking Tasks</Typography>
            <Typography variant="h4">{blockingTasks}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4} md={2}>
        <Card sx={{ bgcolor: "#ff9800", color: "white" }}>
          <CardContent>
            <Typography variant="h6">High Priority</Typography>
            <Typography variant="h4">{highPriority}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4} md={2}>
        <Card sx={{ bgcolor: "#fbc02d", color: "white" }}>
          <CardContent>
            <Typography variant="h6">Medium Priority</Typography>
            <Typography variant="h4">{mediumPriority}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4} md={2}>
        <Card sx={{ bgcolor: "#4caf50", color: "white" }}>
          <CardContent>
            <Typography variant="h6">Low Priority</Typography>
            <Typography variant="h4">{lowPriority}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const UpcomingDueTasks = ({ tasks }: any) => {
  // Get today's date and the date 3 days from now
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  threeDaysLater.setHours(23, 59, 59, 999);

  // Filter tasks that are due in the next 3 days

  const upcomingTasks = tasks
    .filter((task: any) => {
      if (!task.duedate) return false;
      const duedate = new Date(task.duedate);
      return duedate >= today && duedate <= threeDaysLater;
    })
    .sort((a: any, b: any) => new Date(a.duedate) - new Date(b.duedate));

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Upcoming Due Tasks
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Task Key</TableCell> */}
              <TableCell>Summary</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Current status</TableCell>
              <TableCell>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <TableRow key={task.id}>
                  {/* <TableCell>{task.key}</TableCell> */}
                  <TableCell>{task.summary}</TableCell>
                  <TableCell>
                    {new Date(task.duedate).toLocaleDateString()}
                  </TableCell>
                  {/* <TableCell>{task.status}</TableCell> */}
                  <TableCell>
                    <Chip
                      label={task.status}
                      color={priorityColors[task.status]}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.priority}
                      color={priorityColors[task.priority]}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No upcoming tasks due in the next 3 days
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Blocking Tasks Table
const BlockingTasks = ({ tasks }: any) => {
  const blockingTasks = tasks.filter((task: any) => task.isblocks.length > 0);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Blocking Tasks
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Summary</TableCell>
              <TableCell>is Blocking</TableCell>
              <TableCell>Current status</TableCell>
              <TableCell>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blockingTasks.map((task: any) => (
              <TableRow key={task.id}>
                <TableCell>{task.summary}</TableCell>

                <TableCell>
                  {task.isblocks.map((blocked: any) => (
                    <Chip
                      key={blocked.summary}
                      label={blocked.summary}
                      sx={{ mr: 0.5, bgcolor: "grey", color: "white" }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.status}
                    color={priorityColors[task.status]}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.priority}
                    color={priorityColors[task.priority]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const SprintProgress = ({ tasks }: any) => {
  // Filter tasks that belong to an active sprint
  const activeSprintTasks = tasks.filter(
    (task: any) => task.sprint && task.sprint.state === "active",
  );

  // Count completed tasks
  const completedTasks = activeSprintTasks.filter(
    (task: any) => task.status === "Done",
  ).length;

  // Total tasks in sprint
  const totalSprintTasks = activeSprintTasks.length;

  // Calculate progress percentage
  const progress = totalSprintTasks
    ? Math.round((completedTasks / totalSprintTasks) * 100)
    : 0;

  return (
    <Card sx={{ bgcolor: "#673ab7", color: "white" }}>
      <CardContent>
        <Typography variant="h6">Sprint Progress</Typography>
        <Typography variant="subtitle1">
          {totalSprintTasks > 0
            ? `Completed ${completedTasks} of ${totalSprintTasks} tasks`
            : "No active sprint tasks"}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ bgcolor: "#d1c4e9", height: 10, borderRadius: 5 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
