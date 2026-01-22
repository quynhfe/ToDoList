import { Text, TouchableOpacity, View } from "react-native";

export type FilterType = "All" | "Pending" | "Completed";

const filters: FilterType[] = ["All", "Pending", "Completed"];

type FilterTabsProps = {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
};

export default function FilterTabs({ filter, setFilter }: FilterTabsProps) {
  return (
    <View className="flex-row justify-between gap-2 px-2 mb-2 bg-borderFooter py-2 rounded-2xl">
      {filters.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => setFilter(item)}
          className={`py-4 min-w-[30%] px-4 flex text-center  rounded-2xl  ${filter === item ? " bg-dark" : ""}`}>
          <Text
            className={`text-center
              ${filter === item ? " text-white font-bold" : " text-subTitle"}
            `}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
