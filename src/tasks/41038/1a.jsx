import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [challenge, setChallenge] = useState({ active: false, progress: 0 });
  const [newHabit, setNewHabit] = useState('');
  const [currentChallengeText, setCurrentChallengeText] = useState('None');

  const startChallenge = () => {
    setChallenge({ active: true, progress: 0, text: `Complete a habit every day for 3 days` });
    setCurrentChallengeText('Complete a habit every day for 3 days');
  };

  const addHabit = () => {
    if (habits.length < 3 && challenge.active) {
      setHabits([...habits, { name: newHabit, status: 'In Progress' }]);
      setNewHabit('');
    }
  };

  const completeHabit = () => {
    if (habits.length === 3 && challenge.progress < 3) {
      let updatedHabits = habits.map((habit, index) => 
        index === challenge.progress ? { ...habit, status: 'Completed' } : habit
      );
      setHabits(updatedHabits);
      setChallenge(prev => ({ ...prev, progress: prev.progress + 1 }));
      if (challenge.progress + 1 === 3) {
        alert('Congratulations! You have completed the challenge!');
      }
    }
  };

  const reset = () => {
    setHabits([]);
    setChallenge({ active: false, progress: 0, text: 'None' });
    setCurrentChallengeText('None');
  };

  return (
    <Card className="bg-blue-900 p-4 sm:p-6">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Advanced Habit Tracker</CardTitle>
      </CardHeader>
      <CardContent className="text-white space-y-2">
        <p>Your Habits:</p>
        {habits.map((habit, idx) => (
          <div key={idx} className={`text-${habit.status === 'Completed' ? 'green' : 'white'}-500`}>
            {habit.name} ({habit.status})
          </div>
        ))}
        <p>Current Habit:</p>
        <p>Motivation Challenge</p>
        <p>Current Challenge: {currentChallengeText}</p>
        {challenge.active && <p>Progress: {challenge.progress}/3</p>}
        <Button 
          onClick={startChallenge} 
          disabled={challenge.active}
          className="mt-2 bg-yellow-400 text-black hover:bg-yellow-500"
        >
          Start a Motivation Challenge
        </Button>
        <div className="mt-4">
          <p>Add a New Habit:</p>
          <Input 
            placeholder="Enter habit name" 
            value={newHabit} 
            onChange={(e) => setNewHabit(e.target.value)} 
            disabled={!challenge.active}
          />
          <Button 
            onClick={addHabit} 
            disabled={habits.length >= 3 || !challenge.active}
            className="mt-2 bg-green-500 hover:bg-green-600"
          >
            Add Habit
          </Button>
        </div>
        <div className="flex justify-between mt-4">
          <Button 
            onClick={completeHabit} 
            disabled={habits.length !== 3 || challenge.progress === 3}
            className="bg-purple-800 hover:bg-purple-900"
          >
            Complete Habit
          </Button>
          <Button 
            onClick={reset} 
            className="bg-red-500 hover:bg-red-600"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function App() {
  return <div className="min-h-screen flex items-center justify-center bg-blue-800"><HabitTracker /></div>;
}