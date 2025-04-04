import Link from "next/link";
import TaskForm from "src/components/admin/tasks/form";
import { Button } from "src/components/ui/button";

const CreateTask = () => {
  return (
    <>
      <Link href={`/dashboard`}>
        <Button className="absolute top-5 right-5" variant="default">
          back to Dashboard
        </Button>
      </Link>
      <TaskForm />
    </>
  );
};

export default CreateTask;
