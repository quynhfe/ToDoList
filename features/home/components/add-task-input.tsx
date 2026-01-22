import { Plus } from "lucide-react-native";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

type AddTaskInputProps = {
  onAdd: (text: string) => void;
};

export default function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <>
      <View className="flex-row bg-bgInput mb-5 border h-[60px] border-border rounded-[16px] overflow-hidden">
        <TextInput
          textAlignVertical="center"
          value={text}
          onChangeText={setText}
          placeholder="Add new task..."
          placeholderTextColor="#92b7c9"
          style={{
            textAlignVertical: "center",
            paddingVertical: 0
          }}
          className="flex-1 bg-bgInput text-white px-4 rounded-l-[16px] items-center"
        />
        <TouchableOpacity
          onPress={submit}
          className="bg-primary px-6 justify-center">
          <Plus
            size={24}
            color="white"
            strokeWidth={3}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
