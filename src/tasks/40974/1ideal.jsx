import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const priorityLevels = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function TaskForm({ addTask, isEdit, initialData, onSave }) {
  const [taskName, setTaskName] = useState(initialData?.name || "");
  const [priority, setPriority] = useState(initialData?.priority || "Medium");
  const [deadline, setDeadline] = useState(initialData?.deadline || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName && priority && deadline) {
      const taskData = {
        name: taskName,
        priority,
        deadline,
        priorityValue: priorityLevels[priority],
      };
      if (isEdit) {
        onSave(taskData);
      } else {
        addTask(taskData);
      }
      setTaskName("");
      setPriority("Medium");
      setDeadline("");
    }
  };

  useEffect(() => {
    if (isEdit && initialData) {
      setTaskName(initialData.name);
      setPriority(initialData.priority);
      setDeadline(initialData.deadline);
    }
  }, [isEdit, initialData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <Select value={priority} onValueChange={setPriority}>
        <SelectTrigger>
          <SelectValue placeholder="Select Priority" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(priorityLevels).map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">
        {isEdit ? "Save Task" : "Add Task"}
      </Button>
    </form>
  );
}

function TaskList({ tasks, editTask, removeTask }) {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [removeIndex, setRemoveIndex] = useState(null);

  const openEditDialog = (task) => {
    setCurrentTask(task);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setCurrentTask(null);
    setEditDialogOpen(false);
  };

  const openRemoveDialog = (index) => {
    setRemoveIndex(index);
    setRemoveDialogOpen(true);
  };

  const closeRemoveDialog = () => {
    setRemoveIndex(null);
    setRemoveDialogOpen(false);
  };

  return (
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
        {tasks.map((task, index) => (
          <TableRow key={index}>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.deadline}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={() => openEditDialog(task)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => openRemoveDialog(index)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Modify the task details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {currentTask && (
            <TaskForm
              isEdit={true}
              initialData={currentTask}
              onSave={(updatedTask) => {
                editTask(tasks.indexOf(currentTask), updatedTask);
                closeEditDialog();
              }}
            />
          )}
          <Button variant="outline" onClick={closeEditDialog}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <Dialog open={isRemoveDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this task?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (removeIndex !== null) {
                  removeTask(removeIndex);
                }
                closeRemoveDialog();
              }}
            >
              Yes, Remove
            </Button>
            <Button variant="outline" onClick={closeRemoveDialog}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Table>
  );
}

function PrioritySummary({ tasks }) {
  const highPriorityCount = tasks.filter(
    (task) => task.priority === "High"
  ).length;
  const mediumPriorityCount = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;
  const lowPriorityCount = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Priority Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p>High Priority: {highPriorityCount}</p>
        <p>Medium Priority: {mediumPriorityCount}</p>
        <p>Low Priority: {lowPriorityCount}</p>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Task</CardTitle>
            <CardDescription>Enter task details below</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskForm addTask={addTask} />
          </CardContent>
        </Card>
        <PrioritySummary tasks={tasks} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Task List</h2>
        <TaskList tasks={tasks} editTask={editTask} removeTask={removeTask} />
      </div>
    </div>
  );
}
