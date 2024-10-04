import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function App() {
  const [mood, setMood] = useState("");
  const [weather, setWeather] = useState("");
  const [moodLog, setMoodLog] = useState([]);
  const [moodFrequency, setMoodFrequency] = useState({});
  const [weatherMoodMap, setWeatherMoodMap] = useState({});

  useEffect(() => {
    if (moodLog.length > 0) {
      calculateMoodFrequency();
      calculateWeatherMoodMap();
    }
  }, [moodLog]);

  const handleAddEntry = () => {
    if (mood && weather) {
      const newEntry = { mood, weather, date: new Date().toLocaleString() };
      setMoodLog([...moodLog, newEntry]);
      setMood("");
      setWeather("");
    }
  };

  const calculateMoodFrequency = () => {
    const frequency = {};
    moodLog.forEach((entry) => {
      if (frequency[entry.mood]) {
        frequency[entry.mood] += 1;
      } else {
        frequency[entry.mood] = 1;
      }
    });
    setMoodFrequency(frequency);
  };

  const calculateWeatherMoodMap = () => {
    const map = {};
    moodLog.forEach((entry) => {
      if (!map[entry.weather]) {
        map[entry.weather] = {};
      }
      if (map[entry.weather][entry.mood]) {
        map[entry.weather][entry.mood] += 1;
      } else {
        map[entry.weather][entry.mood] = 1;
      }
    });

    // Calculate most common mood for each weather condition
    for (const weather in map) {
      const moods = map[weather];
      const sortedMoods = Object.entries(moods).sort((a, b) => b[1] - a[1]);
      if (sortedMoods.length > 0) {
        map[weather].mostCommonMood = sortedMoods[0][0];
      }
    }

    setWeatherMoodMap(map);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 space-y-6">
      <Card className="w-full max-w-lg bg-gray-800 border border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-yellow-400">
            Weather & Mood Logger
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={weather} onValueChange={setWeather}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the weather" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sunny">Sunny</SelectItem>
              <SelectItem value="Cloudy">Cloudy</SelectItem>
              <SelectItem value="Rainy">Rainy</SelectItem>
              <SelectItem value="Snowy">Snowy</SelectItem>
              <SelectItem value="Windy">Windy</SelectItem>
            </SelectContent>
          </Select>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your mood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Happy">Happy</SelectItem>
              <SelectItem value="Sad">Sad</SelectItem>
              <SelectItem value="Relaxed">Relaxed</SelectItem>
              <SelectItem value="Excited">Excited</SelectItem>
              <SelectItem value="Anxious">Anxious</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddEntry}
            disabled={!mood || !weather}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold"
          >
            Log Entry
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-lg bg-gray-800 border border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-yellow-400">
            Mood Insights by Weather
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-60 overflow-y-auto">
          {Object.entries(weatherMoodMap).map(([weatherCondition, moods], index) => (
            <Card key={index} className="bg-gray-700 p-4">
              <CardTitle className="text-lg font-bold text-yellow-300">
                Weather: {weatherCondition}
              </CardTitle>
              <CardContent className="text-sm space-y-1">
                {Object.entries(moods)
                  .filter(([key]) => key !== "mostCommonMood")
                  .map(([mood, count]) => (
                    <p key={mood}>
                      {mood}: {count} {count > 1 ? "times" : "time"}
                    </p>
                  ))}
                <p className="font-semibold text-yellow-400">
                  Most Common Mood: {moods.mostCommonMood || "N/A"}
                </p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="w-full max-w-lg bg-gray-800 border border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-yellow-400">
            Mood Frequency Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-60 overflow-y-auto">
          {Object.entries(moodFrequency).map(([mood, count], index) => (
            <Card key={index} className="bg-gray-700 p-4">
              <CardTitle className="text-lg font-bold text-yellow-300">
                Mood: {mood}
              </CardTitle>
              <CardContent className="text-sm">
                <p>Logged {count} {count > 1 ? "times" : "time"}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
