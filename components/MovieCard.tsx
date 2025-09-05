import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] mb-5" activeOpacity={0.8}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text
          className="text-text-primary-light dark:text-text-primary-dark text-sm font-bold mt-2 text-center"
          numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center gap-x-2 mt-2">
          <View className="flex-1 flex-row items-center justify-center bg-surface-light dark:bg-surface-dark px-2 py-1.5 rounded-lg">
            <MaterialCommunityIcons name="star" size={12} color="#7C3AED" />
            <Text className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium ml-1">
              {vote_average?.toFixed(1) || "N/A"}
            </Text>
          </View>
          <View className="flex-1 flex-row items-center justify-center bg-surface-light dark:bg-surface-dark px-2 py-1.5 rounded-lg">
            <MaterialCommunityIcons name="calendar" size={12} color="#7C3AED" />
            <Text className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium ml-1">
              {release_date?.split("-")[0] || "N/A"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
