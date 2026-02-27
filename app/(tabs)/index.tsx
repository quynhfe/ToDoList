import AddTaskInput from "@/features/home/components/add-task-input";
import FilterTabs, { FilterType } from "@/features/home/components/filter-tabs";
import HomeHeader from "@/features/home/components/header";
import TaskItem from "@/features/home/components/task-item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Search } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TaskRow = { id: number; title: string; completed: number };

export default function HomeScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [filter, setFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const loadTasks = async () => {
    try {
      const result = await db.getAllAsync<TaskRow>("SELECT * FROM tasks");
      setTasks(result);
    } catch (e) {}
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (title: string) => {
    try {
      await db.runAsync("INSERT INTO tasks (title, completed) VALUES (?, ?)", [
        title,
        0
      ]);
      loadTasks();
    } catch (e) {}
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && t.completed === 1) ||
      (filter === "Pending" && t.completed === 0);

    return matchesSearch && matchesFilter;
  });

  const toggleTask = async (id: number) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        await db.runAsync("UPDATE tasks SET completed = ? WHERE id = ?", [
          task.completed === 1 ? 0 : 1,
          id
        ]);
        loadTasks();
      }
    } catch (e) {}
  };

  const deleteTask = async (id: number) => {
    try {
      await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
      loadTasks();
    } catch (e) {}
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true
    }).start(() => setIsMenuOpen(false));
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    closeMenu();
    router.replace("/login" as any);
  };

  const taskRemaining = tasks.filter((task) => task.completed === 0).length;

  return (
    <SafeAreaView className="flex-1 bg-dark px-8 font-display gap-4">
      <HomeHeader
        numTaskRemaining={taskRemaining}
        onAvatarPress={openMenu}
      />

      <View className="flex-row bg-bgInput border h-[50px] border-border rounded-[16px] overflow-hidden px-4 items-center mb-2">
        <Search
          size={20}
          color="#92b7c9"
          className="mr-2"
        />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search tasks..."
          placeholderTextColor="#92b7c9"
          className="flex-1 text-white py-0"
          textAlignVertical="center"
        />
      </View>

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
            task={{
              id: item.id,
              title: item.title,
              completed: item.completed === 1
            }}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
      />

      <Modal
        visible={isMenuOpen}
        transparent
        onRequestClose={closeMenu}>
        <View className="flex-1 flex-row">
          <TouchableOpacity
            className="flex-1 bg-black/50"
            activeOpacity={1}
            onPress={closeMenu}
          />
          <Animated.View
            style={{ transform: [{ translateX: slideAnim }] }}
            className="absolute top-0 bottom-0 right-0 w-64 bg-[#101c22] border-l border-[#233c48] p-6 pb-12 shadow-2xl">
            <View className="flex-1 pt-12">
              <Text className="text-white text-2xl font-bold">Settings</Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              className="w-full bg-red-500/10 border border-red-500/50 items-center justify-center py-4 rounded-xl">
              <Text className="text-red-500 font-bold text-base">Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
