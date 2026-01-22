import { Task } from "@/features/type";
import { Check, Trash2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export type TaskItemProp = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};
export default function TaskItem({ task, onToggle, onDelete }: TaskItemProp) {
  return (
    <TouchableOpacity
      onPress={() => onToggle(task.id)}
      className="flex-row items-center justify-between py-4 px-4 rounded-xl bg-bgInput/70">
      <View className="flex-row items-center">
        <View
          className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${
            task.completed ? "bg-primary border-primary" : "border-gray-500"
          }`}>
          {task.completed && (
            <Check
              size={14}
              color="white"
            />
          )}
        </View>

        <Text
          className={
            task.completed ? "line-through text-gray-500" : "text-white "
          }>
          {task.title}
        </Text>
      </View>

      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Trash2 color={"#233c48"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
