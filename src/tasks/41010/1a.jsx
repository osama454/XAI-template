import React, { useState } from 'react';
import { Button, Input, Card, CardContent } from "@/components/ui";
import { Progress } from "@/components/ui/progress";

function Habit({ name, times, onComplete }) {
  const [count, setCount] = useState(0);
  const percentage = Math.min((count / times) * 100, 100);

  const handleIncrement = () => {
    if (count < times) {
      setCount(prev => prev + 1);
      if (count + 1 === times) {
        onComplete(name);
      }
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <Progress value={percentage} className="my-2" />
        <div className="flex justify-between items-center">
          <span>{count}/{times}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
        <Button 
          onClick={handleIncrement} 
          disabled={count >= times}
          className="mt-2 w-full"
        >
          {count >= times ? 'Completed' : 'Do Habit'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [habits, setHabits] = useState([
    { name: "Drink Water", times: 8 },
    { name: "Exercise", times: 1 },
    { name: "Read", times: 1 },
  ]);
  const [newHabit, setNewHabit] = useState({ name: '', times: 1 });
  const [allCompleted, setAllCompleted] = useState(false);

  const addHabit = () => {
    if (newHabit.name && newHabit.times > 0) {
      setHabits([...habits, { ...newHabit, id: Date.now() }]);
      setNewHabit({ name: '', times: 1 });
    }
  };

  const checkAllCompleted = () => {
    const completed = habits.every(habit => habit.completed);
    setAllCompleted(completed);
  };

  return (
    <div className="container mx-auto p-4 sm:max-w-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Daily Habit Tracker</h1>
      {habits.map((habit) => (
        <Habit 
          key={habit.id || habit.name} 
          name={habit.name} 
          times={habit.times} 
          onComplete={() => {
            // Here you might want to mark habit as completed
            checkAllCompleted();
          }}
        />
      ))}
      <Card className="mt-4">
        <CardContent>
          <Input 
            value={newHabit.name} 
            onChange={(e) => setNewHabit({...newHabit, name: e.target.value})} 
            placeholder="New Habit Name" 
            className="mb-2"
          />
          <Input 
            type="number" 
            value={newHabit.times} 
            onChange={(e) => setNewHabit({...newHabit, times: parseInt(e.target.value, 10) || 1})} 
            placeholder="Times per Day" 
          />
          <Button onClick={addHabit} className="mt-2">Add Habit</Button>
        </CardContent>
      </Card>
      {allCompleted && <p className="text-green-500 text-center mt-4">All Habits Completed!</p>}
    </div>
  );
}