import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function App() {
  const [entries, setEntries] = useState([]);
  const [weather, setWeather] = useState('');
  const [mood, setMood] = useState('');

  const canLogEntry = weather !== '' && mood !== '';

  const logEntry = () => {
    const newEntry = { weather, mood };
    setEntries(prevEntries => [...prevEntries, newEntry]);
    setWeather('');
    setMood('');
  };

  const weatherMoodCount = useMemo(() => {
    return entries.reduce((acc, entry) => {
      if (!acc[entry.weather]) acc[entry.weather] = {};
      acc[entry.weather][entry.mood] = (acc[entry.weather][entry.mood] || 0) + 1;
      return acc;
    }, {});
  }, [entries]);

  const moodFrequency = useMemo(() => {
    return entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});
  }, [entries]);

  const WeatherCard = ({ weather }) => {
    const moods = weatherMoodCount[weather] || {};
    const mostCommonMood = Object.keys(moods).reduce((a, b) => moods[a] > moods[b] ? a : b, '');

    return (
      <Card className="mb-4 sm:mb-0">
        <CardHeader>
          <CardTitle>{weather}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {Object.entries(moods).map(([mood, count]) => 
              <li key={mood}>{mood}: {count}</li>
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <p>Most Common Mood: {mostCommonMood}</p>
        </CardFooter>
      </Card>
    );
  };

  const MoodCard = ({ mood }) => {
    return (
      <Card className="mb-4 sm:mb-0">
        <CardHeader>
          <CardTitle>{mood}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Logged: {moodFrequency[mood] || 0} times</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Weather & Mood Logger</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={weather} onChange={(e) => setWeather(e.target.value)} placeholder="Select the weather">
            {['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy'].map(w => 
              <SelectItem key={w} value={w}>{w}</SelectItem>
            )}
          </Select>
          <Select value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Select your mood" className="mt-4">
            {['Happy', 'Sad', 'Relaxed', 'Excited', 'Anxious'].map(m => 
              <SelectItem key={m} value={m}>{m}</SelectItem>
            )}
          </Select>
        </CardContent>
        <CardFooter>
          <Button disabled={!canLogEntry} onClick={logEntry}>Log Entry</Button>
        </CardFooter>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mood Insights by Weather</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy'].map(weather => 
            <WeatherCard key={weather} weather={weather} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mood Frequency Analysis</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['Happy', 'Sad', 'Relaxed', 'Excited', 'Anxious'].map(mood => 
            <MoodCard key={mood} mood={mood} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;