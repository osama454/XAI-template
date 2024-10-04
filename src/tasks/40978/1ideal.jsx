import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";

const moodColors = [
  { id: "color1", color: "bg-yellow-200", label: "Happy" },
  { id: "color2", color: "bg-gray-400", label: "Calm" },
  { id: "color3", color: "bg-red-300", label: "Energetic" },
];

const MoodLibrary = ({ onSelectMood }) => {
  const [customQuote, setCustomQuote] = useState("");
  const [moodQuotes, setMoodQuotes] = useState([
    { id: 0, content: "Believe in yourself." },
    { id: 1, content: "Keep pushing forward." },
    { id: 2, content: "You are stronger than you think." },
  ]);

  const handleCustomQuoteSubmit = (e) => {
    e.preventDefault();
    if (customQuote.trim()) {
      // onSelectMood("quote", { content: customQuote });
      let id = moodQuotes[moodQuotes.length - 1] + 1;
      setMoodQuotes((prev) => [...prev, { id, content: customQuote }]);
      setCustomQuote("");
    }
  };

  return (
    <Tabs defaultValue="colors">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="colors">Colors</TabsTrigger>
        <TabsTrigger value="quotes">Quotes</TabsTrigger>
      </TabsList>
      <TabsContent value="colors">
        <div className="grid grid-cols-3 gap-2">
          {moodColors.map((color) => (
            <div
              key={color.id}
              className={`w-full h-12 ${color.color} flex items-center justify-center cursor-pointer`}
              onClick={() => onSelectMood("color", color)}
            >
              {color.label}
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="quotes">
        <div className="grid grid-cols-1 gap-2 mb-4">
          {moodQuotes.map((quote) => (
            <div
              key={quote.id}
              className="p-2 border border-gray-300 rounded cursor-pointer"
              onClick={() => onSelectMood("quote", quote)}
            >
              {quote.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleCustomQuoteSubmit}>
          <Input
            type="text"
            placeholder="Enter custom quote"
            value={customQuote}
            onChange={(e) => setCustomQuote(e.target.value)}
            className="mb-2"
          />
          <Button type="submit">Add Custom Quote</Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};

const MoodBoard = ({ board, onUpdateBoard }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (board.drawing) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = board.drawing;
    }
  }, [board.drawing]);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    onUpdateBoard({ ...board, [data.type]: data.asset });
  };

  return (
    <div
      className={`w-full aspect-square ${
        board.color?.color || "bg-white"
      } relative overflow-hidden border border-gray-300`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {board.quote && (
        <div
          className="absolute p-2 bg-white rounded shadow"
          style={{
            top: `${board.quotePosition?.y || 50}%`,
            left: `${board.quotePosition?.x || 50}%`,
            fontSize: `${board.quoteSize || 60}%`,
          }}
        >
          {board.quote.content}
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        width={300}
        height={300}
      />
    </div>
  );
};

const QuoteEditor = ({ board, onUpdateBoard }) => {
  const [quote, setQuote] = useState(board.quote?.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateBoard({ ...board, quote: { content: quote } });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <Input
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="Edit quote..."
        className="mb-2"
      />
      <Button type="submit">Update Quote</Button>
    </form>
  );
};

const PositionControl = ({ position, onUpdate, label }) => (
  <div className="mb-4">
    <h3 className="text-sm font-medium mb-2">{label} Position</h3>
    <div className="flex gap-4">
      <div className="flex-1">
        <label className="text-xs">X</label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[position?.x || 50]}
          onValueChange={(value) =>
            onUpdate({ x: value[0], y: position?.y || 50 })
          }
        />
      </div>
      <div className="flex-1">
        <label className="text-xs">Y</label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[position?.y || 50]}
          onValueChange={(value) =>
            onUpdate({ x: position?.x || 50, y: value[0] })
          }
        />
      </div>
    </div>
  </div>
);

const SizeControl = ({ size, onUpdate, label }) => (
  <div className="mb-4">
    <h3 className="text-sm font-medium mb-2">{label} Size</h3>
    <Slider
      min={20}
      max={100}
      step={1}
      value={[size || 60]}
      onValueChange={(value) => onUpdate(value[0])}
    />
  </div>
);

export default function App() {
  const [boards, setBoards] = useState([{ id: 1, drawing: null }]);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [editMode, setEditMode] = useState("mood");

  const handleSelectMood = (type, asset) => {
    const updatedBoards = [...boards];
    updatedBoards[selectedBoard] = {
      ...updatedBoards[selectedBoard],
      [type]: asset,
    };
    setBoards(updatedBoards);
  };

  const handleUpdateBoard = (updatedBoard) => {
    const updatedBoards = [...boards];
    updatedBoards[selectedBoard] = updatedBoard;
    setBoards(updatedBoards);
  };

  const addBoard = () => {
    setBoards([...boards, { id: boards.length + 1, drawing: null }]);
  };

  const removeBoard = (index) => {
    if (boards.length > 1) {
      const updatedBoards = boards.filter((_, i) => i !== index);
      setBoards(updatedBoards);
      setSelectedBoard(Math.min(selectedBoard, updatedBoards.length - 1));
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Mood Board Creator
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Mood Library</CardTitle>
            </CardHeader>
            <CardContent>
              <MoodLibrary onSelectMood={handleSelectMood} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Editor</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode === "mood" && (
                <>
                  <PositionControl
                    position={boards[selectedBoard].quotePosition}
                    onUpdate={(position) =>
                      handleUpdateBoard({
                        ...boards[selectedBoard],
                        quotePosition: position,
                      })
                    }
                    label="Quote"
                  />
                  <SizeControl
                    size={boards[selectedBoard].quoteSize}
                    onUpdate={(size) =>
                      handleUpdateBoard({
                        ...boards[selectedBoard],
                        quoteSize: size,
                      })
                    }
                    label="Quote"
                  />
                </>
              )}
              <Separator className="my-4" />
              <QuoteEditor
                board={boards[selectedBoard]}
                onUpdateBoard={handleUpdateBoard}
              />
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card className="mb-6">
            <CardContent className="p-4 overflow-y-scroll max-h-[500px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {boards.map((board, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedBoard === index
                        ? "ring-2 ring-blue-500 shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedBoard(index)}
                  >
                    <CardContent className="p-2">
                      <MoodBoard
                        board={board}
                        onUpdateBoard={handleUpdateBoard}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row justify-around mb-6">
            <Button
              onClick={addBoard}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 mb-2 sm:mb-0"
            >
              Add Mood Board
            </Button>
            {boards.length > 1 && (
              <Button
                onClick={() => removeBoard(selectedBoard)}
                variant="destructive"
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 mb-2 sm:mb-0"
              >
                Remove Mood Board
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
