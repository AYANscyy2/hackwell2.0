"use client";
import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
  type FieldProps,
} from "formik";
import * as Yup from "yup";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { Label } from "src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { Checkbox } from "src/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "src/components/ui/tooltip";
import { Badge } from "src/components/ui/badge";
import { InfoIcon, ClipboardList } from "lucide-react";
import { createTask } from "src/app/actions";

type Priority = "low" | "medium" | "high";
type Status = "unassigned" | "assigned" | "in-progress" | "completed";

interface Skill {
  id: string;
  name: string;
}

interface RequiredSkill extends Skill {
  minimumLevel: number;
}

interface TaskFormValues {
  title: string;
  description: string;
  priority: Priority;
  estimatedHours: number;
  project: string;
  status: Status;
  deadline: string;
  requiredSkills: RequiredSkill[];
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  priority: Yup.string<Priority>()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
  estimatedHours: Yup.number()
    .positive("Must be a positive number")
    .required("Estimated hours are required"),
  project: Yup.string().required("Project is required"),
  status: Yup.string<Status>()
    .oneOf(["unassigned", "assigned", "in-progress", "completed"])
    .required("Status is required"),
  deadline: Yup.date()
    .required("Deadline is required")
    .min(new Date(), "Deadline cannot be in the past"),
  requiredSkills: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required(),
        name: Yup.string().required(),
        minimumLevel: Yup.number()
          .min(1, "Minimum level is 1")
          .max(5, "Maximum level is 5")
          .required("Level is required"),
      }),
    )
    .min(1, "At least one skill is required"),
});

const skills: Skill[] = [
  { id: "skill1", name: "React" },
  { id: "skill2", name: "Firebase" },
  { id: "skill3", name: "TypeScript" },
  { id: "skill4", name: "Node.js" },
  { id: "skill5", name: "Python" },
];

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

const SkillSelector: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<TaskFormValues>();

  const handleSkillChange = (skill: Skill, checked: boolean) => {
    const existingSkill = values.requiredSkills.find((s) => s.id === skill.id);
    const newSkills = checked
      ? [...values.requiredSkills, { ...skill, minimumLevel: 1 }]
      : values.requiredSkills.filter((s) => s.id !== skill.id);

    setFieldValue("requiredSkills", newSkills);
  };

  const handleLevelChange = (skillId: string, level: number) => {
    const updatedSkills = values.requiredSkills.map((skill) =>
      skill.id === skillId ? { ...skill, minimumLevel: level } : skill,
    );
    setFieldValue("requiredSkills", updatedSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-gray-700">
          Required Skills
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-4 w-4 text-gray-400 hover:text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">
                Select required skills and their minimum proficiency level (1-5)
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 gap-2 rounded-md border p-4 md:grid-cols-2">
        {skills.map((skill) => {
          const isSelected = values.requiredSkills.some(
            (s) => s.id === skill.id,
          );
          const selectedSkill = values.requiredSkills.find(
            (s) => s.id === skill.id,
          );

          return (
            <div key={skill.id} className="flex items-center gap-4">
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) =>
                  handleSkillChange(skill, !!checked)
                }
                id={skill.id}
              />
              <Label
                htmlFor={skill.id}
                className="flex-1 text-sm text-gray-700"
              >
                {skill.name}
              </Label>
              {isSelected && (
                <LevelSelect
                  value={selectedSkill?.minimumLevel ?? 1}
                  onChange={(level) => handleLevelChange(skill.id, level)}
                />
              )}
            </div>
          );
        })}
      </div>
      <ErrorMessage name="requiredSkills">
        {(msg) => <div className="text-sm font-medium text-red-600">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

const LevelSelect: React.FC<{
  value: number;
  onChange: (value: number) => void;
}> = ({ value, onChange }) => (
  <Select value={value.toString()} onValueChange={(v) => onChange(Number(v))}>
    <SelectTrigger className="w-24">
      <SelectValue placeholder="Level" />
    </SelectTrigger>
    <SelectContent>
      {[1, 2, 3, 4, 5].map((level) => (
        <SelectItem key={level} value={level.toString()}>
          {level}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const FormField: React.FC<{
  label: string;
  name: string;
  tooltip?: string;
  children: React.ReactNode;
}> = ({ label, name, tooltip, children }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-4 w-4 text-gray-400 hover:text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
    {children}
    <ErrorMessage name={name}>
      {(msg) => <div className="text-sm font-medium text-red-600">{msg}</div>}
    </ErrorMessage>
  </div>
);

const TaskForm: React.FC = () => {
  const initialValues: TaskFormValues = {
    title: "",
    description: "",
    priority: "medium",
    estimatedHours: 0,
    project: "",
    status: "unassigned",
    deadline: "",
    requiredSkills: [],
  };

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      const result = await createTask(values);

      if (result.success) {
        // Show success notification
        console.log("Task created:", result.taskId);

        // You could reset form or redirect
        // formikHelpers.resetForm();
        // router.push('/tasks');
      } else {
        // Show error message
        console.error("Error creating task:", result.error);
        // You could set form error
        // formikHelpers.setStatus({ error: result.error });
      }
    } catch (error) {
      console.error("Failed to submit task:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-gray-600">
        <ClipboardList className="h-6 w-6" />
        <h1 className="text-xl font-semibold">Task Management</h1>
      </div>

      <Card className="overflow-hidden border-gray-200 shadow-sm">
        <CardHeader className="border-b bg-white px-6 pb-6">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Create New Task
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Fill in the details below to create a new task for your project
          </CardDescription>
        </CardHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <CardContent className="space-y-8 bg-white px-6 py-8">
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Left column */}
                  <div className="space-y-6">
                    <FormField
                      label="Task Title"
                      name="title"
                      tooltip="Provide a clear, concise title (min 3 characters)"
                    >
                      <Field
                        as={Input}
                        id="title"
                        name="title"
                        placeholder="Enter task title"
                        className="mt-1"
                      />
                    </FormField>

                    <FormField
                      label="Project"
                      name="project"
                      tooltip="The project this task belongs to"
                    >
                      <Field
                        as={Input}
                        id="project"
                        name="project"
                        placeholder="Enter project name"
                        className="mt-1"
                      />
                    </FormField>

                    <FormField
                      label="Priority"
                      name="priority"
                      tooltip="Set the urgency level of this task"
                    >
                      <Field name="priority">
                        {({ field }: FieldProps) => (
                          <Select
                            value={field.value}
                            onValueChange={(value: Priority) =>
                              field.onChange({
                                target: { name: "priority", value },
                              })
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              {["low", "medium", "high"].map((priority) => (
                                <SelectItem key={priority} value={priority}>
                                  <div className="flex items-center gap-2">
                                    <span className="capitalize">
                                      {priority}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className={
                                        priorityColorMap[priority as Priority]
                                      }
                                    >
                                      {priority.toUpperCase()}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                    </FormField>

                    <FormField
                      label="Estimated Hours"
                      name="estimatedHours"
                      tooltip="Approximate time needed to complete the task"
                    >
                      <Field
                        type="number"
                        as={Input}
                        id="estimatedHours"
                        name="estimatedHours"
                        min={0}
                        step={0.5}
                        className="mt-1"
                      />
                    </FormField>
                  </div>

                  {/* Right column */}
                  <div className="space-y-6">
                    <FormField
                      label="Deadline"
                      name="deadline"
                      tooltip="When the task should be completed"
                    >
                      <Field
                        type="date"
                        as={Input}
                        id="deadline"
                        name="deadline"
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1"
                      />
                    </FormField>

                    <FormField
                      label="Status"
                      name="status"
                      tooltip="Current state of the task"
                    >
                      <Field name="status">
                        {({ field }: FieldProps) => (
                          <Select
                            value={field.value}
                            onValueChange={(value: Status) =>
                              field.onChange({
                                target: { name: "status", value },
                              })
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "unassigned",
                                "assigned",
                                "in-progress",
                                "completed",
                              ].map((status) => (
                                <SelectItem key={status} value={status}>
                                  <div className="flex items-center gap-2">
                                    <span className="capitalize">
                                      {status.replace("-", " ")}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className={
                                        statusColorMap[status as Status]
                                      }
                                    >
                                      {status.toUpperCase()}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                    </FormField>

                    <FormField
                      label="Description"
                      name="description"
                      tooltip="Detailed explanation of what needs to be done (min 10 characters)"
                    >
                      <Field
                        as={Textarea}
                        id="description"
                        name="description"
                        placeholder="Enter detailed task description"
                        rows={4}
                        className="mt-1"
                      />
                    </FormField>
                  </div>
                </div>

                {/* Skills section */}
                <div className="space-y-6 rounded-lg bg-gray-50 p-6">
                  <SkillSelector />

                  {values.requiredSkills.length > 0 && (
                    <div>
                      <p className="mb-3 text-sm font-medium text-gray-700">
                        Selected Skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {values.requiredSkills.map((skill) => (
                          <Badge
                            key={skill.id}
                            variant="secondary"
                            className="bg-white"
                          >
                            {skill.name} (Level {skill.minimumLevel})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-4 border-t bg-gray-50 px-6 py-4">
                <Button
                  variant="outline"
                  type="button"
                  className="text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button type="submit">Create Task</Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default TaskForm;
