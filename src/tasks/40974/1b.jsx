// App.jsx
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Input, Select, SelectItem, Button, Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogFooter, Table, TableBody, TableCell, 
  TableHeader, TableRow 
} from "@/components/ui";
import { Label } from "@/components/ui/label";

function App() {
  const [tasks, setTasks] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const priorities = ['High', 'Medium', 'Low'];
  const [newTask, setNewTask] = useState({
    name: '', priority: 'Medium', deadline: ''
  });

  const priorityCount = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  const handleAddTask = () => {
    if (newTask.name) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ name: '', priority: 'Medium', deadline: '' });
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setOpenEdit(true);
  };

  const handleSaveEdit = () => {
    setTasks(tasks.map(t => t.id === currentTask.id ? currentTask : t));
    setOpenEdit(false);
  };

  const handleRemove = (task) => {
    setCurrentTask(task);
    setOpenRemove(true);
  };

  const confirmRemove = () => {
    setTasks(tasks.filter(t => t.id !== currentTask.id));
    setOpenRemove(false);
  };

  return (
    <div className="container mx-auto p-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Card className="w-full sm:w-2/3">
          <CardHeader>
            <CardTitle>Add Task</CardTitle>
            <CardDescription>Enter task details below.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input 
                value={newTask.name} 
                onChange={(e) => setNewTask({...newTask, name: e.target.value})} 
                placeholder="Task Name" 
              />
              <Select value={newTask.priority} onChange={(val) => setNewTask({...newTask, priority: val})}>
                {priorities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </Select>
              <Input type="date" value={newTask.deadline} onChange={(e) => setNewTask({...newTask, deadline: e.target.value})} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddTask}>Add Task</Button>
          </CardFooter>
        </Card>
        <Card className="w-full sm:w-1/3">
          <CardHeader>
            <CardTitle>Task Priority Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {priorities.map(p => (
              <div key={p}>{p}: {priorityCount[p] || 0}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.deadline}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEdit(task)}>Edit</Button>
                <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleRemove(task)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Modify the task details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input value={currentTask.name} onChange={(e) => setCurrentTask({...currentTask, name: e.target.value})} placeholder="Task Name" />
            {/* Repeat similar structure for priority and deadline */}
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSaveEdit}>Save Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openRemove} onOpenChange={setOpenRemove}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>Are you sure you want to remove this task?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={() => setOpenRemove(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmRemove}>Yes, Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;