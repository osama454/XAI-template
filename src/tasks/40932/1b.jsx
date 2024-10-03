import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, CardDescription, Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

function App() {
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    { name: 'Project A', progress: 30 },
    { name: 'Project B', progress: 70 },
    { name: 'Project C', progress: 50 }
  ]);

  useEffect(() => {
    if (otp === '1234') setOtpVerified(true);
  }, [otp]);

  const addTask = () => {
    setTasks([...tasks, { ...newTask, date: selectedDate.toISOString().split('T')[0] }]);
    setIsDialogOpen(false);
    setNewTask({ title: '', description: '' });
  };

  const filteredTasks = tasks.filter(task => task.date === selectedDate.toISOString().split('T')[0]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:px-6 lg:px-8">
      {!otpVerified ? (
        <div className="mb-8">
          <Input 
            type="number" 
            placeholder="Enter OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            className="mb-2"
          />
          <Button onClick={() => setOtpVerified(otp === '1234')}>Verify OTP</Button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="mb-4" />
          
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Today's Schedule</AccordionTrigger>
              <AccordionContent>
                {filteredTasks.map((task, index) => (
                  <Card key={index} className="mb-2">
                    <CardHeader>
                      <CardTitle>{task.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{task.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Task</Button>
            </DialogTrigger>
            <DialogContent>
              <Input 
                value={newTask.title} 
                onChange={(e) => setNewTask({...newTask, title: e.target.value})} 
                placeholder="Task Title" 
                className="mb-2"
              />
              <Input 
                value={newTask.description} 
                onChange={(e) => setNewTask({...newTask, description: e.target.value})} 
                placeholder="Task Description" 
              />
              <DialogClose asChild>
                <Button onClick={addTask}>Add</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Select Project</Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              {projects.map((project, idx) => (
                <Button 
                  key={idx} 
                  variant="ghost" 
                  onClick={() => setSelectedProject(project)}
                  className="w-full justify-start"
                >
                  {project.name}
                </Button>
              ))}
            </PopoverContent>
          </Popover>

          {selectedProject && (
            <div className="mt-4">
              <Progress value={selectedProject.progress} className="w-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;