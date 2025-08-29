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
          className="text-white text-sm font-bold mt-2 text-center"
          numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-between gap-2 mt-2">
          <View className="flex-row items-center justify-start gap-2">
            <Text className="text-white text-sm font-bold text-center">
              {vote_average?.toFixed(1) || "N/A"}
            </Text>
            <MaterialCommunityIcons
              name="star"
              size={16}
              color="#FFD700"
              resizeMode="contain"
            />
          </View>
          <Text className="text-light-300 text-xs font-bold">
            {release_date?.split("-")[0] || "N/A"}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
