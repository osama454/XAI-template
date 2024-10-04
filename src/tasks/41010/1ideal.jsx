import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Habit Component
const Habit = ({ name, progress, target, color }) => {
  const percentage = (progress / target) * 100;

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <Progress value={percentage} className="mb-2" />
      <div className="flex justify-between text-sm">
        <span>{progress}/{target} times</span>
        <span style={{ color }}>{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
};

// Achievement Component
const Achievement = ({ title, unlocked }) => (
  <div className={`p-2 rounded-lg text-center ${unlocked ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}>
    {title}
  </div>
);

// Main Habit Tracker Component
const HabitTracker = () => {
  const [habits, setHabits] = useState([
    { name: "Exercise", target: 2, progress: 0, color: "#3B82F6" },
    { name: "Read a Book", target: 1, progress: 0, color: "#F59E0B" },
    { name: "Meditate", target: 3, progress: 0, color: "#10B981" },
  ]);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitTarget, setNewHabitTarget] = useState(1);

  const addProgress = (index) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit, i) => {
        if (i === index && habit.progress < habit.target) {
          return { ...habit, progress: habit.progress + 1 };
        }
        return habit;
      })
    );
  };


  const addNewHabit = () => {
    if (newHabitName.trim() !== "") {
      setHabits((prevHabits) => [
        ...prevHabits,
        { name: newHabitName, target: newHabitTarget, progress: 0, color: "#8B5CF6" },
      ]);
      setNewHabitName("");
      setNewHabitTarget(1);
    }
  };



  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-blue-600">
          Daily Habit Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {habits.map((habit, index) => (
          <div key={index} className="mb-4">
            <Habit
              name={habit.name}
              progress={habit.progress}
              target={habit.target}
              color={habit.color}
            />
            <Button
              onClick={() => addProgress(index)}
              className="w-full mb-2"
              disabled={habit.progress >= habit.target}
            >
              {habit.progress >= habit.target ? "Completed" : "Do Habit"}
            </Button>
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">New Habit Name</label>
          <Input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="w-full mb-2"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Times per Day</label>
          <Input
            type="number"
            value={newHabitTarget}
            onChange={(e) => setNewHabitTarget(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full mb-2"
          />
          <Button onClick={addNewHabit} className="w-full mt-2">
            Add New Habit
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-around items-center">
        {habits.every(habit => habit.progress >= habit.target) && (
          <Achievement title="All Habits Completed!" unlocked />
        )}
      </CardFooter>

    </Card>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center p-4">
      <HabitTracker />
    </div>
  );
}
