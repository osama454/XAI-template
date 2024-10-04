import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SelectContent } from "@radix-ui/react-select";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({
    name: "",
    priority: "Medium",
    deadline: "",
  });
  const [editTask, setEditTask] = useState(null);
  const [removeTask, setRemoveTask] = useState(null);

  const priorities = ["High", "Medium", "Low"];
  const priorityCount = priorities.reduce(
    (acc, p) => ({ ...acc, [p]: tasks.filter((t) => t.priority === p).length }),
    {}
  );

  const handleAddTask = () => {
    if (taskInput.name && taskInput.deadline) {
      setTasks([...tasks, { ...taskInput, id: Date.now() }]);
      setTaskInput({ name: "", priority: "Medium", deadline: "" });
    }
  };

  const handleEditTask = () => {
    setTasks(
      tasks.map((t) => (t.id === editTask.id ? { ...taskInput, id: t.id } : t))
    );
    setEditTask(null);
  };

  const handleRemoveTask = () => {
    setTasks(tasks.filter((t) => t.id !== removeTask));
    setRemoveTask(null);
  };

  return (
    <div className="container mx-auto p-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Card className="w-full sm:w-1/2">
          <CardHeader>
            <CardTitle>Add Task</CardTitle>
            <CardDescription>Enter task details below.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Input
                type="text"
                placeholder="Task Name"
                value={taskInput.name}
                onChange={(e) =>
                  setTaskInput({ ...taskInput, name: e.target.value })
                }
              />
              <Select
                value={taskInput.priority}
                onValueChange={(value) =>
                  setTaskInput({ ...taskInput, priority: value })
                }
              >
                <SelectContent>
                  {priorities.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={taskInput.deadline}
                onChange={(e) =>
                  setTaskInput({ ...taskInput, deadline: e.target.value })
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddTask}>Add Task</Button>
          </CardFooter>
        </Card>

        <Card className="w-full sm:w-1/2">
          <CardHeader>
            <CardTitle>Task Priority Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {priorities.map((p) => (
              <div key={p}>
                {p}: {priorityCount[p]}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.deadline}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => setEditTask(task)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setRemoveTask(task.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editTask !== null} onOpenChange={() => setEditTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Modify the task details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editTask && (
            <>
              <Input
                defaultValue={editTask.name}
                onChange={(e) =>
                  setTaskInput({ ...taskInput, name: e.target.value })
                }
              />
              <Select
                value={editTask.priority}
                onValueChange={(value) =>
                  setTaskInput({ ...taskInput, priority: value })
                }
              >
                {priorities.map((p) => (
                  <SelectContent>
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  </SelectContent>
                ))}
              </Select>
              <Input
                type="date"
                defaultValue={editTask.deadline}
                onChange={(e) =>
                  setTaskInput({ ...taskInput, deadline: e.target.value })
                }
              />
            </>
          )}
          <DialogFooter>
            <Button onClick={handleEditTask}>Save Task</Button>
            <Button variant="secondary" onClick={() => setEditTask(null)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={removeTask !== null}
        onOpenChange={() => setRemoveTask(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this task?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleRemoveTask}>Yes, Remove</Button>
            <Button variant="secondary" onClick={() => setRemoveTask(null)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
