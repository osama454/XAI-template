import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";
import { ChevronsUpDown, CalendarDays, Check, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const frameworks = [
  { value: "next.js", label: "Next.js", progress: 30 },
  { value: "sveltekit", label: "SvelteKit", progress: 50 },
  { value: "nuxt.js", label: "Nuxt.js", progress: 10 },
  { value: "remix", label: "Remix", progress: 20 },
  { value: "astro", label: "Astro", progress: 60 },
];

export default function TaskMate() {
  const [otpVerified, setOtpVerified] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [framework, setFramework] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState(Array(6).fill(""));
  const [tasks, setTasks] = React.useState([
    {
      id: 1,
      title: "Team sync-up at 9:00 AM",
      description: "Discuss project updates",
      completed: false,
      date: new Date(),
    },
    {
      id: 2,
      title: "Cardio workout at 6:00 PM",
      description: "45-minute run",
      completed: false,
      date: new Date(),
    },
  ]);
  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  const [newTaskDescription, setNewTaskDescription] = React.useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: prevTasks.length + 1,
          title: newTaskTitle,
          description: newTaskDescription,
          completed: false,
          date,
        },
      ]);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  const handleCompleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleVerifyOtp = () => {
    console.log("Entered OTP:", otp);
    if (otp.length==6) setOtpVerified(true);
  };

  const handleSelectFramework = (currentValue) => {
    setFramework(currentValue);
    setProgress(
      frameworks.find((fw) => fw.value === currentValue)?.progress || 0
    );
    setOpen(false);
    console.log(`Selected framework: ${currentValue}`);
  };
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };
  return (
    <div className="min-h-screen p-8 space-y-8 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800">
      {!otpVerified ? (
        // OTP Verification Section
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
          <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={handleVerifyOtp} className="mt-4">
            Verify OTP
          </Button>
        </div>
      ) : (
        <>
          {/* Calendar */}
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4">Select Date</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate);
                }
              }}
              className="rounded-md border"
            />
          </div>

          {/* Accordion for Daily Schedule */}
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
              Today's Schedule
              <Dialog>
                <DialogTrigger asChild>
                  <div className="ml-4 flex items-center gap-1 cursor-pointer">
                    <PlusCircle className="w-6 h-6 text-blue-600" />
                    <span className="text-blue-600 font-medium">Add Task</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>
                    Enter the title and description for the new task.
                  </DialogDescription>
                  <h3 className="text-lg font-bold mb-4">
                    Add New Task for {date.toDateString()}
                  </h3>
                  <Input
                    placeholder="Task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="mb-4"
                  />
                  <Textarea
                    placeholder="Task description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="mb-4"
                  />
                  <Button onClick={handleAddTask} className="mt-4">
                    Add Task
                  </Button>
                </DialogContent>
              </Dialog>
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {tasks
                .filter(
                  (task) => task.date.toDateString() === date.toDateString()
                )
                .map((task) => (
                  <AccordionItem key={task.id} value={`item-${task.id}`}>
                    <div className="flex items-center justify-between">
                      <AccordionTrigger className="hover:text-blue-600">
                        {task.completed ? <s>{task.title}</s> : task.title}
                      </AccordionTrigger>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCompleteTask(task.id);
                        }}
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </Button>
                    </div>
                    <AccordionContent>
                      <p>{task.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>

          {/* Framework Combobox */}
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4">
              Select a Project Framework
            </h2>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[250px] justify-between hover:bg-blue-100"
                >
                  {framework
                    ? frameworks.find((fw) => fw.value === framework)?.label
                    : "Select framework..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0 shadow-md">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((fw) => (
                        <CommandItem
                          key={fw.value}
                          value={fw.value}
                          onSelect={handleSelectFramework}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              framework === fw.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {fw.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Progress Tracker */}
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4">Project Progress</h2>
            <Progress
              value={progress}
              className="w-full h-3 rounded-full bg-blue-200"
            />
          </div>
        </>
      )}
    </div>
  );
}
