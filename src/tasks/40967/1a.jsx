import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription,
  Button, Input, Select, SelectItem, Checkbox, ScrollArea, Alert
} from "@/components/ui";
import { PlusIcon, MinusIcon, CalendarIcon } from "@/components/icons";

function App() {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('Meeting');
  const [notifyAttendees, setNotifyAttendees] = useState(false);
  const [attendeeGoal, setAttendeeGoal] = useState(100);
  const [events, setEvents] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addEvent = () => {
    if (eventName) {
      setEvents([...events, {
        name: eventName,
        type: eventType,
        goal: attendeeGoal,
        notify: notifyAttendees
      }]);
      setEventName(''); // Reset event name after adding
      setDrawerOpen(false); // Close drawer after adding an event
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
          <CardDescription>Plan your next event with ease.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input label="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            <Select label="Event Type" onValueChange={setEventType}>
              <SelectItem value="Meeting">Meeting</SelectItem>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Party">Party</SelectItem>
              <SelectItem value="Conference">Conference</SelectItem>
            </Select>
            <Checkbox checked={notifyAttendees} onCheckedChange={setNotifyAttendees}>
              Notify all attendees
            </Checkbox>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => setDrawerOpen(true)}>Set Attendee Goal</Button>
          <Button onClick={addEvent}>Create Event</Button>
        </CardFooter>
      </Card>

      {/* Drawer for Attendee Goal */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Set Attendee Goal</DrawerTitle>
            <DrawerDescription>Choose the number of attendees you aim to reach.</DrawerDescription>
          </DrawerHeader>
          <DrawerContent className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setAttendeeGoal(Math.max(0, attendeeGoal - 10))}><MinusIcon /></Button>
            <span>{attendeeGoal}</span>
            <Button variant="outline" onClick={() => setAttendeeGoal(attendeeGoal + 10)}><PlusIcon /></Button>
            <p className="text-sm">Target Attendees</p>
          </DrawerContent>
          <DrawerFooter>
            <Button onClick={() => setDrawerOpen(false)}>Done</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Events List */}
      <ScrollArea className="mt-4 w-full max-w-lg h-64">
        {events.map((event, index) => (
          <Alert key={index} className="my-2" icon={<CalendarIcon />}>
            <strong>{event.name}</strong> - {event.type} 
            (Goal: {event.goal} attendees) 
            {event.notify && <span className="text-green-500"> (Notify Attendees)</span>}
          </Alert>
        ))}
      </ScrollArea>
    </div>
  );
}

export default App;