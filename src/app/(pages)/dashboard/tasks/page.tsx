import TaskDetails from "~/components/admin/tasks/taskDetails";

// Example task data
const taskData: {
  assignedTo: string | null;
  comments: any[];
  completionPercentage: number;
  createdAt: string;
  deadline: string;
  description: string;
  estimatedHours: number;
  priority: "medium" | "low" | "high";
  project: string;
  requiredSkills: { id: string; minimumLevel: number; name: string }[];
  status: string;
  title: string;
  updatedAt: string;
} = {
  assignedTo: null,
  comments: [],
  completionPercentage: 0,
  createdAt: "2025-04-03T16:22:24.000Z",
  deadline: "2025-04-04",
  description: "bxbxbbxbxbxxbxbbxbxbxbxbbxxbxbxbxbxbxbxbxbxbx",
  estimatedHours: 44,
  priority: "medium",
  project: "cc",
  requiredSkills: [
    {
      id: "skill3",
      minimumLevel: 4,
      name: "TypeScript",
    },
    {
      id: "skill1",
      minimumLevel: 3,
      name: "React",
    },
  ],
  status: "unassigned",
  title: "hloo",
  updatedAt: "2025-04-03T16:22:24.000Z",
};

function Tasks() {
  return <TaskDetails task={taskData} />;
}

export default Tasks;
