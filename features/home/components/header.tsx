import { DotIcon } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
const Bong = require("@/assets/images/bong-thui.jpg");
const HomeHeader = () => {
  //day
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });

  //total task
  const totalTask = 3;
  return (
    <View className="flex flex-row w-full items-center justify-between">
      <View className="flex flex-col  gap-1 py-4 items-start bg-dark ">
        <Text className="text-white text-3xl font-bold ">My Tasks</Text>
        <View className="flex flex-row gap-1 items-center">
          <Text className="text-base text-subTitle">{formattedDate}</Text>
          <DotIcon color={"#92b7c9"} />
          <Text className="text-base text-subTitle">{totalTask} remaining</Text>
        </View>
      </View>
      <Image
        source={Bong}
        className="w-12 h-12 rounded-full"
      />
    </View>
  );
};
export default HomeHeader;
