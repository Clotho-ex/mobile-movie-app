import React from "react";
import { Text, View } from "react-native";

const profile = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
      <Text className="text-5xl text-text-primary-light dark:text-text-primary-dark font-bold">
        {" "}
        Profile Page
      </Text>
    </View>
  );
};

export default profile;
