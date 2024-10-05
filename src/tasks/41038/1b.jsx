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
const App = () => {
  const [challenge, setChallenge] = useState(false);
  const [habits, setHabits] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState('None');
  const [challengeProgress, setChallengeProgress] = useState(0);
  const [habitInput, setHabitInput] = useState('');

  const startChallenge = () => {
    setChallenge(true);
    setCurrentChallenge("Complete a habit every day for 3 days");
    setChallengeProgress(0);
  };

  const addHabit = () => {
    if (habits.length < 3 && habitInput) {
      setHabits([...habits, { name: habitInput, status: 'In Progress' }]);
      setHabitInput('');
      setCurrentChallenge(habitInput);
    }
  };

  const completeHabit = () => {
    if (challengeProgress < 3) {
      let newHabits = habits.map((habit, index) => 
        index === challengeProgress ? { ...habit, status: 'Completed' } : habit
      );
      setHabits(newHabits);
      setChallengeProgress(prev => prev + 1);
      
      if (challengeProgress + 1 === 3) {
        alert("Congratulations! You have completed the challenge!");
      } else {
        setCurrentChallenge(newHabits[challengeProgress + 1]?.name || 'None');
      }
    }
  };

  const resetChallenge = () => {
    setChallenge(false);
    setHabits([]);
    setCurrentChallenge('None');
    setChallengeProgress(0);
  };

  return (
    <div className="bg-blue-900 min-h-screen p-4 sm:p-8 flex flex-col items-center">
      <Card className="w-full max-w-lg bg-blue-800 text-white">
        <CardHeader>
          <CardTitle>Advanced Habit Tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Your Habits:</strong></p>
          {habits.map((habit, idx) => (
            <div key={idx} className={`habit-item ${habit.status === 'Completed' ? 'text-green-500' : ''}`}>
              {habit.name} ({habit.status})
            </div>
          ))}
          
          <p><strong>Current Habit:</strong></p>
          <div>
            <strong>Motivation Challenge</strong><br />
            <span>Current Challenge: {currentChallenge}</span><br />
            {challenge && <span>Progress: {challengeProgress}/3</span>}
          </div>

          {!challenge ? 
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500" onClick={startChallenge}>Start a Motivation Challenge</Button> :
            <Button disabled className="bg-gray-400 text-gray-700 cursor-not-allowed">Start a Motivation Challenge</Button>
          }

          <div className="mt-4">
            <label><strong>Add a New Habit:</strong></label>
            <Input 
              placeholder="Enter habit name" 
              value={habitInput} 
              onChange={(e) => setHabitInput(e.target.value)} 
              className="mt-2"
            />
            <Button 
              className="mt-2 bg-green-500 hover:bg-green-600" 
              onClick={addHabit} 
              disabled={habits.length >= 3 || !challenge}>
              Add Habit
            </Button>
          </div>

          <div className="flex justify-between mt-4">
            <Button 
              className="bg-purple-700 hover:bg-purple-800" 
              onClick={completeHabit} 
              disabled={challengeProgress >= 3 || habits.length === 0}>
              Complete Habit
            </Button>
            <Button 
              className="bg-red-500 hover:bg-red-600" 
              onClick={resetChallenge}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;