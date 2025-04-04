import React from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { Badge } from "src/components/ui/badge";
import {
  ClipboardList,
  Calendar,
  Clock,
  Users,
  BarChart,
  GitBranch,
  CheckCircle2,
} from "lucide-react";
import { Progress } from "src/components/ui/progress";

interface RequiredSkill {
  id: string;
  name: string;
  minimumLevel: number;
}

export interface TaskDetailsProps {
  task: {
    id?: "" | undefined;
    assignedTo?: string | null;
    comments: any[];
    completionPercentage: number;
    createdAt: any;
    deadline: string;
    description: string;
    estimatedHours: number;
    priority: "low" | "medium" | "high";
    project: string;
    requiredSkills: RequiredSkill[];
    status: string;
    title: string;
    updatedAt: string;
  };
}

const priorityColorMap = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  high: "bg-red-100 text-red-800 border-red-200",
};

const statusColorMap = {
  unassigned: "bg-gray-100 text-gray-800 border-gray-200",
  assigned: "bg-purple-100 text-purple-800 border-purple-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
};

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-gray-600" />
            <h1 className="text-xl font-semibold text-gray-800">
              Task Details
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={`${priorityColorMap[task.priority]} capitalize`}
            >
              {task.priority} Priority
            </Badge>
            <Badge
              variant="outline"
              className={`${statusColorMap[task.status as keyof typeof statusColorMap] || "bg-gray-100 text-gray-800"} capitalize`}
            >
              {task.status.replace("-", " ")}
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <Card className="overflow-hidden border-gray-200 shadow-sm">
          <CardHeader className="border-b bg-white px-6 py-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              {task.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm text-gray-500">
              <span>Project: {task.project}</span>
              <span>•</span>
              <span>
                Created:{" "}
                {format(new Date(task.createdAt), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 bg-white px-6 py-6">
            {/* Progress Section */}
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Completion Progress
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {task.completionPercentage}%
                </span>
              </div>
              <Progress value={task.completionPercentage} className="h-2" />
            </div>

            {/* Info Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                {/* Time Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Deadline</span>
                  </div>
                  <p className="text-sm text-gray-900">
                    {format(new Date(task.deadline), "MMMM d, yyyy")}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Estimated Time</span>
                  </div>
                  <p className="text-sm text-gray-900">
                    {task.estimatedHours} hours
                  </p>
                </div>

                {/* Assignment Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Assigned To</span>
                  </div>
                  <p className="text-sm text-gray-900">
                    {task.assignedTo || "Not assigned"}
                  </p>
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <BarChart className="h-4 w-4" />
                  <span className="text-sm font-medium">Required Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {task.requiredSkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="flex items-center gap-1.5 bg-white"
                    >
                      <span>{skill.name}</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                        {skill.minimumLevel}
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <GitBranch className="h-4 w-4" />
                <span className="text-sm font-medium">Description</span>
              </div>
              <p className="text-sm whitespace-pre-wrap text-gray-700">
                {task.description}
              </p>
            </div>

            {/* Comments Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm font-medium">Activity</span>
              </div>
              {task.comments.length > 0 ? (
                <div className="space-y-4">
                  {task.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="rounded-lg border bg-gray-50 p-3 text-sm"
                    >
                      {comment}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No comments yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskDetails;
