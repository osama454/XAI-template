import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Button, Input, Select, SelectItem, Checkbox, Drawer, 
  Alert, ScrollArea, IconButton
} from "@/components/ui";
import { PlusIcon, MinusIcon, CalendarIcon } from "@/components/icons";

function App() {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('Meeting');
  const [notifyAttendees, setNotifyAttendees] = useState(false);
  const [attendeeGoal, setAttendeeGoal] = useState(100);
  const [events, setEvents] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCreateEvent = () => {
    if (eventName) {
      setEvents([...events, {
        name: eventName,
        type: eventType,
        goal: attendeeGoal,
        notify: notifyAttendees
      }]);
      setEventName('');
      setNotifyAttendees(false);
      setAttendeeGoal(100);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
          <CardDescription>Plan your next event with ease.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            label="Event Name" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            placeholder="Enter event name"
          />
          <Select label="Event Type" value={eventType} onValueChange={setEventType}>
            <SelectItem value="Meeting">Meeting</SelectItem>
            <SelectItem value="Workshop">Workshop</SelectItem>
            <SelectItem value="Party">Party</SelectItem>
            <SelectItem value="Conference">Conference</SelectItem>
          </Select>
          <Checkbox checked={notifyAttendees} onCheckedChange={setNotifyAttendees}>
            Notify all attendees
          </Checkbox>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => setDrawerOpen(true)}>Set Attendee Goal</Button>
          <Button onClick={handleCreateEvent}>Create Event</Button>
        </CardFooter>
      </Card>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Drawer.Title>Set Attendee Goal</Drawer.Title>
        <Drawer.Description>Choose the number of attendees you aim to reach.</Drawer.Description>
        <div className="flex items-center justify-center my-4">
          <IconButton variant="outline" onClick={() => setAttendeeGoal(prev => Math.max(0, prev - 10))}><MinusIcon /></IconButton>
          <span className="mx-4 text-xl">{attendeeGoal}</span>
          <IconButton variant="outline" onClick={() => setAttendeeGoal(prev => prev + 10)}><PlusIcon /></IconButton>
        </div>
        <p className="text-center text-sm text-muted-foreground">Target Attendees</p>
        <Drawer.Footer>
          <Button onClick={() => setDrawerOpen(false)}>Done</Button>
        </Drawer.Footer>
      </Drawer>

      <ScrollArea className="w-full max-w-md mt-4 h-64">
        {events.map((event, index) => (
          <Alert key={index} icon={CalendarIcon} className="mb-2">
            <b>{event.name}</b> - {event.type} (Goal: {event.goal} attendees) 
            {event.notify && <span className="text-green-500"> (Notify Attendees)</span>}
          </Alert>
        ))}
      </ScrollArea>
    </div>
  );
}

export default App;