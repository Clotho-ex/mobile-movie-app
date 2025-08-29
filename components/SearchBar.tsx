import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder: string;
  onPress: () => void;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({
  placeholder,
  onPress,
  value,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center rounded-full px-5 py-4 gap-2 bg-dark-100 w-80 mx-auto">
      <MaterialCommunityIcons
        name="magnify"
        size={24}
        color="#D5CDFE"
        resizeMode="contain"
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="white"
        onChangeText={onChangeText}
        onPress={onPress}
        value={value}
        className="flex-1 ml-2 font-medium text-white"
      />
    </View>
  );
};

export default SearchBar;
