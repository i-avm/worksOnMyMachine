import React from "react";
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
} from "@mui/material";

// Sample Jira Data (Replace with API Data)
const jiraTasks = [
  {
    id: "10000",
    key: "SCRUM-1",
    summary: "Test Story 1",
    priority: "High",
    status: "To Do",
    sprint: { name: "SCRUM Sprint 1", state: "active" },
    isblocks: [
      {
        id: "10002",
        key: "SCRUM-3",
        priority: "Low",
        summary: "Test Story 2",
      },
    ],
    isblockedby: [],
  },
  {
    id: "10001",
    key: "SCRUM-2",
    summary: "Test Epic 1",
    priority: "Medium",
    status: "To Do",
    sprint: null,
    isblocks: [],
    isblockedby: [],
  },
  {
    id: "10002",
    key: "SCRUM-3",
    summary: "Test Story 2",
    priority: "Low",
    status: "To Do",
    sprint: { name: "SCRUM Sprint 1", state: "active" },
    isblocks: [],
    isblockedby: [
      {
        id: "10000",
        key: "SCRUM-1",
        priority: "High",
        summary: "Test Story 1",
      },
    ],
  },
];

export function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Jira Task Analytics Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SummaryCards tasks={jiraTasks} />
        </Grid>
      </Grid>

      {/* Sprint Progress */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <SprintProgress tasks={jiraTasks} />
        </Grid>
      </Grid>

      {/* Assigned Tasks & Blocking Tasks */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <AssignedTasks tasks={jiraTasks} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <BlockingTasks tasks={jiraTasks} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const priorityColors: { [key: string]: any } = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

// Assigned Tasks Table
const AssignedTasks = ({ tasks }: any) => {
  const assignedTasks = tasks
    .filter((task: any) => task.isblocks.length === 0)
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
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {task.sprint ? task.sprint.name : "No Sprint"}
                </TableCell>
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
              <TableCell>Task Key</TableCell>
              <TableCell>Summary</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Blocking</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blockingTasks.map((task: any) => (
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
                  {task.isblocks.map((blocked: any) => (
                    <Chip
                      key={blocked.key}
                      label={blocked.key}
                      sx={{ mr: 0.5, bgcolor: "#ff7043", color: "white" }}
                    />
                  ))}
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
