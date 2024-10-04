// App.jsx
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent /* added to fix error */,
  SelectTrigger /* added to fix error */,
  SelectValue /* added to fix error */,
  SelectGroup,
} from "@/components/ui/select";

export default function App() {
  const [logs, setLogs] = useState([]);
  const [weather, setWeather] = useState("");
  const [mood, setMood] = useState("");

  const canLog = weather !== "" && mood !== "";

  const logEntry = () => {
    setLogs((prevLogs) => [...prevLogs, { weather, mood }]);
    setWeather("");
    setMood("");
  };

  const weatherLogs = useMemo(() => {
    return logs.reduce((acc, log) => {
      if (!acc[log.weather]) {
        acc[log.weather] = { moods: {}, total: 0 };
      }
      acc[log.weather].moods[log.mood] =
        (acc[log.weather].moods[log.mood] || 0) + 1;
      acc[log.weather].total += 1;
      return acc;
    }, {});
  }, [logs]);

  const moodFrequency = useMemo(() => {
    return logs.reduce((acc, log) => {
      acc[log.mood] = (acc[log.mood] || 0) + 1;
      return acc;
    }, {});
  }, [logs]);

  const WeatherMoodCard = ({ weather }) => {
    const data = weatherLogs[weather] || { moods: {}, total: 0 };
    const mostCommonMood = Object.keys(data.moods).reduce(
      (a, b) => (data.moods[a] > data.moods[b] ? a : b),
      ""
    );

    return (
      <Card className="m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <CardHeader>
          <CardTitle>{weather}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {Object.entries(data.moods).map(([mood, count]) => (
              <li key={mood}>
                {mood}: {count}
              </li>
            ))}
          </ul>
          <p>Most Common Mood: {mostCommonMood}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Weather & Mood Logger</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Fixed */}
          <Select value={weather} onValueChange={setWeather}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the weather" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Sunny">Sunny</SelectItem>
                <SelectItem value="Cloudy">Cloudy</SelectItem>
                <SelectItem value="Rainy">Rainy</SelectItem>
                <SelectItem value="Snowy">Snowy</SelectItem>
                <SelectItem value="Windy">Windy</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Fixed */}
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
          <Button onClick={logEntry} disabled={!canLog}>
            Log Entry
          </Button>
        </CardContent>
      </Card>

      <Card className="my-4">
        <CardHeader>
          <CardTitle>Mood Insights by Weather</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap">
          {["Sunny", "Cloudy", "Rainy", "Snowy", "Windy"].map((weather) => (
            <WeatherMoodCard key={weather} weather={weather} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mood Frequency Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(moodFrequency).map(([mood, count]) => (
            <div key={mood} className="m-2">
              {mood}: {count}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
