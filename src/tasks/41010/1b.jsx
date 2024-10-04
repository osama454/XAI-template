import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

function HabitCard({ habit, onComplete }) {
  const [count, setCount] = useState(0);

  const handleComplete = () => {
    if (count < habit.times) {
      setCount(count + 1);
      onComplete(habit.id);
    }
  };

  const progress = (count / habit.times) * 100;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{habit.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-2" />
        <div className="flex justify-between">
          <span>{`${count}/${habit.times}`}</span>
          <span>{`${Math.round(progress)}%`}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleComplete}
          disabled={count >= habit.times}
        >
          {count >= habit.times ? 'Completed' : 'Do it'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink Water', times: 8 },
    { id: 2, name: 'Exercise', times: 1 },
    { id: 3, name: 'Read Book', times: 1 },
  ]);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitTimes, setNewHabitTimes] = useState(1);
  const [allCompleted, setAllCompleted] = useState(false);

  const addHabit = () => {
    if (newHabitName && newHabitTimes > 0) {
      const newHabit = {
        id: habits.length + 1,
        name: newHabitName,
        times: parseInt(newHabitTimes, 10)
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setNewHabitTimes(1);
    }
  };

  const checkAllCompleted = () => {
    const completed = habits.every(habit => {
      console.log(habit.times,  habits.find(h => h.id === habit.id).completedCount);
      return habit.times === habits.find(h => h.id === habit.id).completedCount;
    }
    );
    setAllCompleted(completed);
  };

  const handleHabitCompletion = (id) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id ? { ...habit, completedCount: (habit.completedCount || 0) + 1 } : habit
      )
    );
    checkAllCompleted();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Daily Habit Tracker</h1>
      <div className="space-y-4">
        {habits.map(habit => (
          <HabitCard key={habit.id} habit={habit} onComplete={handleHabitCompletion} />
        ))}
        <Card>
          <CardContent>
            <div className="space-y-2">
              <Input
                placeholder="New Habit Name"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Times per Day"
                value={newHabitTimes}
                onChange={(e) => setNewHabitTimes(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={addHabit}>Add Habit</Button>
          </CardFooter>
        </Card>
      </div>
      {allCompleted && <p className="text-green-600 mt-4 text-center">All Habits Completed!</p>}
    </div>
  );
}