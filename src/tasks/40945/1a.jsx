import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";

// Todo Item Component
const TodoItem = ({ todo, theme }) => {
  const bgColors = {
    default: 'bg-blue-100',
    comfortable: 'bg-green-100',
    compact: 'bg-yellow-100'
  };

  return (
    <div className={`p-4 rounded-md ${bgColors[theme] || bgColors.default}`}>
      <h3 className="text-lg font-semibold">{todo.title}</h3>
      <p>{todo.description}</p>
      <span className="text-sm text-gray-500">Priority: {todo.priority}</span>
    </div>
  );
};

// Carousel Component
const TodoCarousel = ({ todos, currentIndex, goToPrevious, goToNext }) => {
  return (
    <div className="overflow-hidden relative">
      <Button variant="outline" size="icon" onClick={goToPrevious} className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <ChevronLeft />
      </Button>
      {todos.map((todo, idx) => (
        <div key={idx} className={`transition-transform duration-300 ${idx === currentIndex ? 'translate-x-0' : 'translate-x-full'}`}>
          <TodoItem todo={todo} theme={todo.theme} />
        </div>
      ))}
      <Button variant="outline" size="icon" onClick={goToNext} className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <ChevronRight />
      </Button>
    </div>
  );
};

// Pagination Component
const Pagination = ({ total, currentPage, onChange }) => {
  const { items } = usePagination({
    totalCount: total,
    pageSize: 1,
    siblingCount: 1,
    currentPage: currentPage
  });

  return (
    <div className="flex space-x-2">
      {items.map(({ page, type, selected, ...item }, index) => {
        let children = null;

        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
          children = '…';
        } else if (type === 'page') {
          children = (
            <Button variant={selected ? "default" : "outline"} onClick={() => onChange(page)}>
              {page}
            </Button>
          );
        } else {
          children = (
            <Button variant="outline" onClick={() => onChange(type === 'next' ? page + 1 : page - 1)}>
              {type === 'next' ? 'Next' : 'Previous'}
            </Button>
          );
        }

        return <React.Fragment key={index}>{children}</React.Fragment>;
      })}
    </div>
  );
};

// Main App Component
export default function App() {
  const [todos, setTodos] = useState([
    { title: 'Sample Todo 1', description: 'This is a sample todo.', priority: 'High', theme: 'default' },
    { title: 'Sample Todo 2', description: 'Another sample here.', priority: 'Medium', theme: 'comfortable' },
    { title: 'Sample Todo 3', description: 'Last sample todo.', priority: 'Low', theme: 'compact' }
  ]);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(0);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'High', theme: 'default' });

  const handleAddTodo = () => {
    setTodos([...todos, { ...formData }]);
    setCurrentTodoIndex(todos.length); // Move to the newly added todo
    setFormData({ title: '', description: '', priority: 'High', theme: 'default' });
  };

  const handlePageChange = (page) => {
    setCurrentTodoIndex(page - 1);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            <div>
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </Select>
            </div>
          </div>
          <Separator className="my-4" />
          <Label>Theme</Label>
          <RadioGroup className="flex flex-col" value={formData.theme} onValueChange={(value) => setFormData({...formData, theme: value})}>
            <RadioGroupItem value="default">Default</RadioGroupItem>
            <RadioGroupItem value="comfortable">Comfortable</RadioGroupItem>
            <RadioGroupItem value="compact">Compact</RadioGroupItem>
          </RadioGroup>
          <Button className="mt-4" onClick={handleAddTodo}>Add Todo</Button>
        </CardContent>
      </Card>
      
      <Separator className="my-6" />
      
      <Card>
        <CardHeader>
          <CardTitle>Todo Carousel</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoCarousel 
            todos={todos} 
            currentIndex={currentTodoIndex} 
            goToPrevious={() => setCurrentTodoIndex(Math.max(0, currentTodoIndex - 1))}
            goToNext={() => setCurrentTodoIndex(Math.min(todos.length - 1, currentTodoIndex + 1))}
          />
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle>Pagination</CardTitle>
        </CardHeader>
        <CardContent>
          <Pagination total={todos.length} currentPage={currentTodoIndex + 1} onChange={handlePageChange} />
        </CardContent>
      </Card>
    </div>
  );
}