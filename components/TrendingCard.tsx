import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
  return (
    <TouchableOpacity className="w-36 mb-5 relative" activeOpacity={0.8}>
      {/* Ranking Badge */}
      <View className="absolute top-2 left-2 z-10 bg-accent rounded-full w-6 h-6 items-center justify-center">
        <Text className="text-text-primary-light dark:text-text-primary-dark text-xs font-bold">
          {index + 1}
        </Text>
      </View>

      {/* Movie Poster */}
      <Image
        source={{
          uri:
            movie.poster_url ||
            `https://placehold.co/600x400/1a1a1a/ffffff.png`,
        }}
        className="w-full h-48 rounded-lg"
        resizeMode="cover"
      />

      {/* Movie Title */}
      <Text
        className="text-text-primary-light dark:text-text-primary-dark text-sm font-bold mt-4 text-center"
        numberOfLines={1}>
        {movie.title}
      </Text>

      {/* Search Stats */}
      <View className="flex-row items-center justify-center gap-2 mt-2">
        <View className="flex-row items-center gap-1 bg-surface-light dark:bg-surface-dark px-3 py-2 rounded-lg">
          <MaterialCommunityIcons
            name="trending-up"
            size={12}
            color="#7C3AED"
            resizeMode="contain"
          />
          <Text className="text-text-accent-light dark:text-text-accent-dark text-md font-medium">
            {movie.count}
          </Text>
          <Text className="text-text-secondary-light dark:text-text-secondary-dark ml-2 text-md font-medium">
            searches
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TrendingCard;
