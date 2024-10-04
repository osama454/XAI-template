import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

function App() {
  const [moodBoards, setMoodBoards] = useState([{ color: '#FFD700', quote: 'Be the change.', position: { x: 10, y: 10 }, size: 100 }]);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [customQuote, setCustomQuote] = useState('');
  const [activeTab, setActiveTab] = useState('colors');

  const colors = {
    'Happy': '#FFD700', 
    'Calm': '#87CEEB', 
    'Energetic': '#FF6347'
  };

  const quotes = [
    "Stay positive, work hard, make it happen.",
    "Peace begins with a smile.",
    "Energy and persistence conquer all things."
  ];

  const handleAddBoard = () => {
    setMoodBoards([...moodBoards, { color: '#FFD700', quote: 'New Mood', position: { x: 10, y: 10 }, size: 100 }]);
  };

  const handleRemoveBoard = () => {
    if (moodBoards.length > 1) {
      const updatedBoards = moodBoards.filter((_, index) => index !== selectedBoard);
      setMoodBoards(updatedBoards);
      setSelectedBoard(0);
    }
  };

  const handleAddCustomQuote = () => {
    if (customQuote && !quotes.includes(customQuote)) {
      quotes.push(customQuote);
      setCustomQuote('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Mood Board Creator</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left Side */}
        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Library</CardTitle>
            </CardHeader>
            <Tabs defaultValue="colors" className="w-full">
              <TabsList>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
              </TabsList>
              <TabsContent value="colors">
                {Object.entries(colors).map(([name, color]) => (
                  <div key={name} className="p-2 m-1 bg-white border rounded hover:bg-gray-100 cursor-pointer" onClick={() => {
                    const newBoards = [...moodBoards];
                    newBoards[selectedBoard].color = color;
                    setMoodBoards(newBoards);
                  }}>
                    <div className="w-8 h-8" style={{ backgroundColor: color }}></div>
                    <p>{name}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="quotes">
                {quotes.map((quote, idx) => (
                  <div key={idx} className="p-2 m-1 bg-white border rounded hover:bg-gray-100 cursor-pointer" onClick={() => {
                    const newBoards = [...moodBoards];
                    newBoards[selectedBoard].quote = quote;
                    setMoodBoards(newBoards);
                  }}>
                    {quote}
                  </div>
                ))}
                <Input 
                  value={customQuote} 
                  onChange={(e) => setCustomQuote(e.target.value)} 
                  placeholder="Enter custom quote"
                  className="mt-2"
                />
                <Button onClick={handleAddCustomQuote} className="mt-2">Add Custom Quote</Button>
              </TabsContent>
            </Tabs>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Input 
                value={moodBoards[selectedBoard]?.quote || ''} 
                onChange={(e) => {
                  const newBoards = [...moodBoards];
                  newBoards[selectedBoard].quote = e.target.value;
                  setMoodBoards(newBoards);
                }} 
                placeholder="Edit quote"
              />
              <div className="mt-4 space-y-2">
                <label>Position X</label>
                <Slider 
                  defaultValue={[moodBoards[selectedBoard]?.position.x || 10]} 
                  max={100} 
                  onValueChange={(value) => {
                    const newBoards = [...moodBoards];
                    newBoards[selectedBoard].position.x = value[0];
                    setMoodBoards(newBoards);
                  }}
                />
                <label>Position Y</label>
                <Slider 
                  defaultValue={[moodBoards[selectedBoard]?.position.y || 10]} 
                  max={100} 
                  onValueChange={(value) => {
                    const newBoards = [...moodBoards];
                    newBoards[selectedBoard].position.y = value[0];
                    setMoodBoards(newBoards);
                  }}
                />
                <label>Size</label>
                <Slider 
                  defaultValue={[moodBoards[selectedBoard]?.size || 100]} 
                  max={200} 
                  onValueChange={(value) => {
                    const newBoards = [...moodBoards];
                    newBoards[selectedBoard].size = value[0];
                    setMoodBoards(newBoards);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right Side */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Mood Boards</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {moodBoards.map((board, index) => (
                <div 
                  key={index} 
                  className={`relative border-2 ${selectedBoard === index ? 'border-blue-500' : 'border-gray-300'} cursor-pointer hover:border-blue-300`}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    backgroundColor: board.color,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onClick={() => setSelectedBoard(index)}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      left: `${board.position.x}%`,
                      top: `${board.position.y}%`,
                      fontSize: `${board.size / 10}px`
                    }}
                  >
                    {board.quote}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddBoard}>Add Mood Board</Button>
              <Button onClick={handleRemoveBoard} className="ml-2 bg-red-500 hover:bg-red-600">Remove Mood Board</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;