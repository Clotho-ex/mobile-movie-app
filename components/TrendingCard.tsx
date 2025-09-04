import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
  return (
    <TouchableOpacity className="w-32 mb-5 relative" activeOpacity={0.8}>
      {/* Ranking Badge */}
      <View className="absolute top-2 left-2 z-10 bg-accent rounded-full w-6 h-6 items-center justify-center">
        <Text className="text-white text-xs font-bold">{index + 1}</Text>
      </View>

      {/* Movie Poster */}
      <Image
        source={{
          uri:
            movie.poster_url ||
            `https://placehold.co/600x400/1a1a1a/ffffff.png`,
        }}
        className="w-full h-44 rounded-lg"
        resizeMode="cover"
      />

      {/* Movie Title */}
      <Text
        className="text-white text-sm font-bold mt-2 text-center"
        numberOfLines={1}>
        {movie.title}
      </Text>

      {/* Search Stats */}
      <View className="flex-row items-center justify-between gap-2 mt-2">
        <View className="flex-row items-center justify-start gap-2">
          <MaterialCommunityIcons
            name="trending-up"
            size={16}
            color="#FF5600"
            resizeMode="contain"
          />
          <Text className="text-accent text-sm font-bold">{movie.count}</Text>
        </View>
        <Text className="text-light-300 text-xs font-bold">searches</Text>
      </View>

      {/* Search Term Badge */}
      <View className="mt-1 bg-dark-100 rounded-full px-2 py-1">
        <Text className="text-light-300 text-xs text-center" numberOfLines={1}>
          &quot;{movie.searchTerm}&quot;
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TrendingCard;
