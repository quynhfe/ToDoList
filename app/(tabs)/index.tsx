import Tasks from "@/data/task";
import AddTaskInput from "@/features/home/components/add-task-input";
import FilterTabs, { FilterType } from "@/features/home/components/filter-tabs";
import HomeHeader from "@/features/home/components/header";
import TaskItem from "@/features/home/components/task-item";
import { Task } from "@/features/type";
import { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  const [tasks, setTasks] = useState(Tasks);
  const [filter, setFilter] = useState<FilterType>("All");

  const addTask = (title: string) => {
    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "Completed") return t.completed;
    if (filter === "Pending") return !t.completed;
    return true;
  });

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const taskRemaining = (tasks: Task[]) => {
    return tasks.filter((task) => !task.completed).length;
  };

  return (
    <SafeAreaView className="flex-1 bg-dark px-8 font-display gap-4">
      <HomeHeader numTaskRemaining={taskRemaining(tasks)} />
      <AddTaskInput onAdd={addTask} />
      <FilterTabs
        filter={filter}
        setFilter={setFilter}
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="gap-3"
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
      />
    </SafeAreaView>
  );
}
