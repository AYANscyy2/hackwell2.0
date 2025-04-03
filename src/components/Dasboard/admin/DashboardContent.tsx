import React from "react";
import { SidebarInset } from "~/components/ui/sidebar";
import { Avatar } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "~/components/ui/table";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

// Dummy data for the task statistics chart
const chartData = [
  { name: "Mon", tasks: 7 },
  { name: "Tue", tasks: 10 },
  { name: "Wed", tasks: 8 },
  { name: "Thu", tasks: 12 },
  { name: "Fri", tasks: 9 },
  { name: "Sun", tasks: 13 },
];

// Dummy data for available individuals
const availableIndividuals = [
  { id: 1, name: "Alice Smith", role: "Designer", avatarColor: "bg-blue-500" },
  { id: 2, name: "John Doe", role: "Developer", avatarColor: "bg-indigo-500" },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Analyst",
    avatarColor: "bg-green-500",
  },
];

// Dummy data for tasks
const tasks = [
  {
    id: 1,
    title: "Design Homepage",
    assignee: "Alice Smith",
    dueDate: "May 20, 2024",
    status: "Completed",
  },
  {
    id: 2,
    title: "Develop Login Feature",
    assignee: "John Doe",
    dueDate: "May 22, 2024",
    status: "Completed",
  },
  {
    id: 3,
    title: "Database Optimization",
    assignee: "Emily Johnson",
    dueDate: "May 25, 2024",
    status: "Pending",
  },
  {
    id: 4,
    title: "Test Payment Gateway",
    assignee: "John Doe",
    dueDate: "May 23, 2024",
    status: "Completed",
  },
];

const DashboardContent = ({ type }: { type: string }) => {
  const router = useRouter();
  return (
    <SidebarInset>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button
            onClick={() => {
              router.push(`/dashboard/tasks?type=${type}`);
            }}
            variant="default"
            className="cursor-pointer"
          >
            Add Tasks
          </Button>
        </div>

        <h2 className="mb-6 text-2xl font-semibold">Overview</h2>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <p className="mb-2 text-lg font-medium">Total Tasks</p>
              <p className="text-4xl font-bold">24</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="mb-2 text-lg font-medium">Completed Tasks</p>
              <p className="text-4xl font-bold">16</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="mb-2 text-lg font-medium">Pending Tasks</p>
              <p className="text-4xl font-bold">8</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 text-xl font-semibold">Task Statistics</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 text-xl font-semibold">
                Available Individuals
              </h3>
              <div className="space-y-4">
                {availableIndividuals.map((individual) => (
                  <div
                    key={individual.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Avatar
                        className={`mr-3 h-8 w-8 ${individual.avatarColor} text-white`}
                      />
                      <span className="font-medium">{individual.name}</span>
                    </div>
                    <span className="text-gray-600">{individual.role}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="mb-4 text-xl font-semibold">Task List</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
};

export default DashboardContent;
