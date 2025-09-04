import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  placeholder: string;
  onPress: () => void;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

const SearchBar = ({
  placeholder,
  onPress,
  value,
  onChangeText,
  onClear,
}: SearchBarProps) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChangeText("");
    }
    Keyboard.dismiss();
  };

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
      {value.trim().length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          className="p-1"
          activeOpacity={0.7}>
          <MaterialCommunityIcons
            name="close-circle"
            size={20}
            color="#D5CDFE"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
