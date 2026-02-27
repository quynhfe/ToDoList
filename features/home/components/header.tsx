import { DotIcon } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Bong = require("@/assets/images/bong-thui.jpg");

type HomeHeaderProps = {
  numTaskRemaining: number;
  onAvatarPress: () => void;
};

const HomeHeader = ({ numTaskRemaining, onAvatarPress }: HomeHeaderProps) => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });

  return (
    <View className="flex flex-row w-full items-center justify-between">
      <View className="flex flex-col gap-1 py-4 items-start bg-dark ">
        <Text className="text-white text-3xl font-bold ">My Tasks</Text>
        <View className="flex flex-row gap-1 items-center">
          <Text className="text-base text-subTitle">{formattedDate}</Text>
          <DotIcon color={"#92b7c9"} />
          <Text className="text-base text-subTitle">
            {numTaskRemaining} remaining
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onAvatarPress}>
        <Image
          source={Bong}
          className="w-[48px] h-[48px] rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
};
export default HomeHeader;
