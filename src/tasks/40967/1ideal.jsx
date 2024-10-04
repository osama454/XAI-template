
import * as React from "react";
import { Calendar, Minus, Plus } from "lucide-react";

import { Alert } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const eventTypes = [
  { value: "meeting", label: "Meeting" },
  { value: "workshop", label: "Workshop" },
  { value: "party", label: "Party" },
  { value: "conference", label: "Conference" },
];

function App() {
  const [eventName, setEventName] = React.useState("");
  const [eventType, setEventType] = React.useState("");
  const [goalAttendees, setGoalAttendees] = React.useState(100);
  const [notifyAttendees, setNotifyAttendees] = React.useState(false);
  const [events, setEvents] = React.useState([]);

  function handleCreateEvent() {
    if (eventName && eventType) {
      const newEvent = {
        id: events.length + 1,
        name: eventName,
        type: eventType,
        attendees: goalAttendees,
        notify: notifyAttendees, // Add notify status
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setEventName("");
    }
  }

  return (
    <div className="p-6 space-y-8">
      <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition">
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
          <CardDescription>Plan your next event with ease.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                placeholder="Enter your event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="eventType">Event Type</Label>
              <Select onValueChange={setEventType}>
                <SelectTrigger id="eventType">
                  <SelectValue placeholder="Select an event type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {eventTypes.map((e) => (
                    <SelectItem key={e.value} value={e.value}>
                      {e.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notify"
                checked={notifyAttendees}
                onCheckedChange={setNotifyAttendees}
              />
              <Label htmlFor="notify">Notify all attendees</Label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Set Attendee Goal</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Set Attendee Goal</DrawerTitle>
                  <DrawerDescription>
                    Choose the number of attendees you aim to reach.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => setGoalAttendees(goalAttendees - 10)}
                      disabled={goalAttendees <= 50}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        {goalAttendees}
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Target Attendees
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => setGoalAttendees(goalAttendees + 10)}
                      disabled={goalAttendees >= 250}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button>Done</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
          <Button
            onClick={handleCreateEvent}
            disabled={!eventName || !eventType}
          >
            Create Event
          </Button>
        </CardFooter>
      </Card>

      <ScrollArea className="h-72 w-full max-w-md mx-auto rounded-md border shadow-lg">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">
            Created Events
          </h4>
          {events.map((event) => (
            <React.Fragment key={event.id}>
              <Alert className="shadow-lg">
                <Calendar className="h-4 w-4" />
                <div className="text-sm ml-2">
                  <strong>{event.name}</strong> - {event.type} (Goal:{" "}
                  {event.attendees} attendees)
                  {event.notify && (
                    <span className="ml-2 text-green-600">
                      (Notify Attendees)
                    </span>
                  )}
                </div>
              </Alert>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default App;
