import React, { useState } from 'react';
import { Card, CardContent,CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

function App() {
  const [moodBoards, setMoodBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [customQuote, setCustomQuote] = useState('');

  const colors = {
    Happy: '#FFD700',
    Calm: '#87CEEB',
    Energetic: '#FF6347'
  };

  const quotes = [
    "Joy is the simplest form of gratitude.",
    "Peace begins with a smile.",
    "Energy flows where attention goes."
  ];

  const addMoodBoard = () => {
    setMoodBoards([...moodBoards, { color: '#FFFFFF', quote: '', position: { x: 50, y: 50 }, size: 100 }]);
  };

  const removeMoodBoard = () => {
    if (selectedBoard !== null) {
      setMoodBoards(moodBoards.filter((_, index) => index !== selectedBoard));
      setSelectedBoard(null);
    }
  };

  const updateBoard = (updates) => {
    if (selectedBoard !== null) {
      const newBoards = [...moodBoards];
      newBoards[selectedBoard] = { ...newBoards[selectedBoard], ...updates };
      setMoodBoards(newBoards);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Mood Board Creator</h1>
      <div className="flex flex-wrap">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 p-2">
          <Card>
            <CardHeader>
              <CardTitle>Mood Library</CardTitle>
            </CardHeader>
            <Tabs defaultValue="colors" className="space-y-4">
              <TabsList>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
              </TabsList>
              <TabsContent value="colors">
                {Object.keys(colors).map(color => (
                  <div key={color} className="m-2 p-4 bg-[color:var(--tw-bg-opacity)]" style={{ '--tw-bg-opacity': 1, backgroundColor: colors[color] }} onClick={() => updateBoard({ color: colors[color] })}></div>
                ))}
              </TabsContent>
              <TabsContent value="quotes">
                {quotes.map((quote, idx) => (
                  <p key={idx} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => updateBoard({ quote })}>{quote}</p>
                ))}
                <Input value={customQuote} onChange={(e) => setCustomQuote(e.target.value)} placeholder="Enter custom quote" />
                <Button onClick={() => { updateBoard({ quote: customQuote }); setCustomQuote(''); }}>Add Custom Quote</Button>
              </TabsContent>
            </Tabs>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Input value={selectedBoard !== null ? moodBoards[selectedBoard].quote : ''} onChange={(e) => updateBoard({ quote: e.target.value })} placeholder="Edit quote" />
              <Slider defaultValue={[50]} onValueChange={(value) => updateBoard({ position: { x: value[0], y: value[0] } })} max={100} label="Position" />
              <Slider defaultValue={[100]} onValueChange={(value) => updateBoard({ size: value[0] })} max={200} label="Size" />
            </CardContent>
          </Card>
        </div>
        
        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-2">
          <Card>
            <CardContent className="grid grid-cols-2 gap-4">
              {moodBoards.map((board, index) => (
                <div key={index} style={{ backgroundColor: board.color, width: `${board.size}px`, height: `${board.size}px` }} 
                     className="relative cursor-pointer" onClick={() => setSelectedBoard(index)}>
                  <p style={{ left: `${board.position.x}%`, top: `${board.position.y}%` }} className="absolute text-center w-full">
                    {board.quote}
                  </p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={addMoodBoard}>Add Mood Board</Button>
              <Button onClick={removeMoodBoard} className="ml-2">Remove Mood Board</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;