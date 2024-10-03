// App.jsx
import React, { useState } from 'react';
import { Button, Input, Dialog, Card, CardContent, Progress, Popover } from "@/components/ui";
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const dummyProjects = [
  { name: "Project A", progress: 45 },
  { name: "Project B", progress: 70 },
  { name: "Project C", progress: 20 },
];

function Task({ title, description }) {
  return (
    <Card className="mb-2">
      <CardContent>
        <h3>{title}</h3>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [otpVerified, setOtpVerified] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState(dummyProjects[0]);

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    // Here you would typically verify OTP
    setOtpVerified(true);
  };

  const handleDateChange = (date) => setSelectedDate(date);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    setTaskTitle('');
    setTaskDescription('');
  };

  const addTask = () => {
    if (taskTitle) {
      setTasks([...tasks, { title: taskTitle, description: taskDescription }]);
      closeDialog();
    }
  };

  const tasksForToday = tasks.filter(task => {
    // This is a simple filter, in real scenario, you might want to compare dates more accurately
    return task.date === selectedDate.toDateString();
  });

  return (
    <div className="container mx-auto p-4 sm:p-8">
      {!otpVerified ? (
        <form onSubmit={handleOTPSubmit} className="space-y-4">
          <Input type="text" placeholder="Enter OTP" />
          <Button type="submit">Verify OTP</Button>
        </form>
      ) : (
        <div>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="mb-4 shadow-lg rounded-lg"
          />
          
          <Button onClick={openDialog}>Add Task</Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="p-5 space-y-4">
              <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task Title" />
              <Input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Task Description" />
              <Button onClick={addTask}>Add</Button>
              <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
            </div>
          </Dialog>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Today's Schedule</h2>
            {tasksForToday.map((task, idx) => <Task key={idx} {...task} />)}
          </div>

          <div className="mt-6">
            <Popover>
              <Popover.Trigger asChild>
                <Button>Select Project</Button>
              </Popover.Trigger>
              <Popover.Content>
                {dummyProjects.map((project, index) => (
                  <Button key={index} variant="outline" className="w-full text-left" onClick={() => { setSelectedProject(project); }}>
                    {project.name}
                  </Button>
                ))}
              </Popover.Content>
            </Popover>
            <Progress value={selectedProject.progress} className="mt-4" />
          </div>
        </div>
      )}
    </div>
  );
}