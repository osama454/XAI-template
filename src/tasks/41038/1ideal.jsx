import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
function HabitTrackerCard({
  onAddHabit,
  onResetHabits,
  habits,
  currentHabit,
  setCurrentHabit,
  onCompleteHabit,
  onStartMotivationChallenge,
  challengeProgress,
  currentChallenge,
  buttonsDisabled,
}) {
  return (
    <Card className="max-w-md mx-auto mt-6 p-4 bg-blue-800 text-white">
      <CardHeader>
        <CardTitle>Advanced Habit Tracker</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <HabitList habits={habits} />
        <CurrentHabitDisplay currentHabit={currentHabit} />
        <MotivationChallenges
          onStartMotivationChallenge={onStartMotivationChallenge}
          currentChallenge={currentChallenge}
          challengeProgress={challengeProgress}
          buttonsDisabled={buttonsDisabled}
        />
        <AddHabit
          currentHabit={currentHabit}
          setCurrentHabit={setCurrentHabit}
          onAddHabit={onAddHabit}
          buttonsDisabled={buttonsDisabled}
        />
      </CardContent>
      <CardFooter className="flex justify-between space-x-2">
        <Button
          onClick={onCompleteHabit}
          disabled={buttonsDisabled.completeHabit || habits.length < 3}
          className={`px-4 py-2 rounded-lg transition duration-300 ${buttonsDisabled.completeHabit || habits.length < 3
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#5a189a] text-white hover:bg-[#4b1381]"
            }`}
        >
          Complete Habit
        </Button>
        <Button
          onClick={onResetHabits}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
        >
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}

function HabitList({ habits }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg">Your Habits:</h3>
      <ul className="list-disc list-inside">
        {habits.map((habit, index) => (
          <li key={index} className={habit.completed ? "text-green-400" : ""}>
            {habit.name} ({habit.completed ? "Completed" : "In Progress"})
          </li>
        ))}
      </ul>
    </div>
  );
}

function CurrentHabitDisplay({ currentHabit }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg">Current Habit:</h3>
      <p>{currentHabit ? currentHabit.name : "No habit selected"}</p>
    </div>
  );
}

function MotivationChallenges({
  onStartMotivationChallenge,
  currentChallenge,
  challengeProgress,
  buttonsDisabled,
}) {
  return (
    <div className="mt-4">
      <h3 className="text-lg">Motivation Challenge</h3>
      <p>
        Current Challenge:{" "}
        {currentChallenge ? currentChallenge.description : "None"}
      </p>
      {currentChallenge && (
        <p>
          Progress: {challengeProgress}/{currentChallenge.target}
        </p>
      )}
      <Button
        onClick={onStartMotivationChallenge}
        disabled={buttonsDisabled.startChallenge}
        className={`mt-2 px-4 py-2 rounded-lg transition duration-300 ${buttonsDisabled.startChallenge
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
      >
        Start a Motivation Challenge
      </Button>
    </div>
  );
}

function AddHabit({ currentHabit, setCurrentHabit, onAddHabit, buttonsDisabled }) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg">Add a New Habit:</h3>
      <Input
        type="text"
        value={currentHabit.name}
        onChange={(e) =>
          setCurrentHabit({ ...currentHabit, name: e.target.value })
        }
        placeholder="Enter habit name"
        className="px-4 py-2 rounded-lg bg-gray-700 text-white"
      />
      <Button
        onClick={onAddHabit}
        disabled={buttonsDisabled.addHabit}
        className={`mt-4 px-4 py-2 rounded-lg transition duration-300 ${buttonsDisabled.addHabit
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-600"
          }`}
      >
        Add Habit
      </Button>
    </div>
  );
}

export default function App() {
  const [habits, setHabits] = useState([]);
  const [currentHabit, setCurrentHabit] = useState({ name: "", completed: false });
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challengeProgress, setChallengeProgress] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState({
    startChallenge: false,
    addHabit: true,
    completeHabit: true,
  });

  const motivationChallenges = [
    {
      id: 1,
      description: "Complete a habit every day for 3 days",
      target: 3,
    },
  ];

  const handleAddHabit = () => {
    if (currentHabit.name.trim()) {
      setHabits((prev) => [
        ...prev,
        { ...currentHabit, completed: false },
      ]);
      setCurrentHabit({ name: "", completed: false });

      if (habits.length + 1 >= 3) {
        setButtonsDisabled((prev) => ({
          ...prev,
          addHabit: true,
          completeHabit: false,
        }));
      }
    }
  };

  const handleCompleteHabit = () => {
    const incompleteHabitIndex = habits.findIndex((habit) => !habit.completed);
    if (incompleteHabitIndex !== -1) {
      const updatedHabits = [...habits];
      updatedHabits[incompleteHabitIndex].completed = true;
      setHabits(updatedHabits);

      setChallengeProgress((prev) => prev + 1);
      if (challengeProgress + 1 >= currentChallenge.target) {
        alert("Congratulations! You have completed the challenge!");
        setButtonsDisabled((prev) => ({
          ...prev,
          completeHabit: true,
        }));
      }
    }
  };

  const handleStartMotivationChallenge = () => {
    const randomChallenge =
      motivationChallenges[Math.floor(Math.random() * motivationChallenges.length)];
    setCurrentChallenge(randomChallenge);
    setChallengeProgress(0);
    setButtonsDisabled((prev) => ({
      ...prev,
      startChallenge: true,
      addHabit: false,
    }));
  };

  const handleResetHabits = () => {
    setHabits([]);
    setCurrentHabit({ name: "", completed: false });
    setCurrentChallenge(null);
    setChallengeProgress(0);
    setButtonsDisabled({
      startChallenge: false,
      addHabit: true,
      completeHabit: true,
    });
  };

  return (
    <HabitTrackerCard
      onAddHabit={handleAddHabit}
      onCompleteHabit={handleCompleteHabit}
      onResetHabits={handleResetHabits}
      habits={habits}
      currentHabit={currentHabit}
      setCurrentHabit={setCurrentHabit}
      onStartMotivationChallenge={handleStartMotivationChallenge}
      currentChallenge={currentChallenge}
      challengeProgress={challengeProgress}
      buttonsDisabled={buttonsDisabled}
    />
  );
}
