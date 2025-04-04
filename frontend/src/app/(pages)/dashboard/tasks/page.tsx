"use client";
import Link from "next/link";
import TaskDetails from "frontend/src/components/admin/tasks/taskDetails";
import { Button } from "frontend/src/components/ui/button";
import { getAllTasks } from "frontend/src/app/actions";
import { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      const response = await getAllTasks();
      if (response.success && response.data) {
        setTasks(response.data);
      } else {
        setTasks([]);
      }
      setLoading(false);
    }
    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <>
      <Link href={`/dashboard`}>
        <Button className="absolute top-5 right-5" variant="default">
          Back to Dashboard
        </Button>
      </Link>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskDetails key={task.id} task={task} />)
      ) : (
        <p>No tasks available</p>
      )}
    </>
  );
}

export default Tasks;
