import { getMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

interface OverviewProps {
  overview?: string | null;
}

const MovieOverview = ({ overview }: OverviewProps) => {
  return (
    <View className="mb-6 bg-card-light dark:bg-card-dark rounded-xl p-5 border border-border-light dark:border-border-dark">
      <Text className="text-text-accent-light dark:text-text-accent-dark text-sm font-semibold uppercase tracking-wider mb-3">
        Overview
      </Text>
      <Text className="text-text-primary-light dark:text-text-primary-dark text-base leading-7 font-normal text-justify">
        {overview || "No overview available."}
      </Text>
    </View>
  );
};

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="mb-6 bg-card-light dark:bg-card-dark rounded-xl p-4 border border-border-light dark:border-border-dark">
      <Text className="text-text-accent-light dark:text-text-accent-dark text-sm font-semibold uppercase tracking-wider mb-2">
        {label}
      </Text>
      <Text className="text-text-primary-light dark:text-text-primary-dark text-base leading-6 font-medium">
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie } = useFetch(() => getMovieDetails(id as string));

  return (
    <View className="bg-background-light dark:bg-background-dark">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="w-full h-[550px]">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px] rounded-lg"
            resizeMode="cover"
          />
        </View>
        <View className="flex-col items-center justify-center mt-5 px-5 bg-surface-light/90 dark:bg-surface-dark/30 rounded-2xl p-5 mx-2">
          <View className="w-full mb-6 px-4">
            <Text
              className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold text-center leading-snug"
              numberOfLines={0}
              style={{
                lineHeight: 40,
                textAlign: "center",
              }}
              ellipsizeMode="tail"
              selectable={false}
              textBreakStrategy="balanced">
              {movie?.title}
            </Text>
            <View className="mt-4 mx-auto w-12 h-0.5 bg-accent-light dark:bg-accent-dark opacity-60" />
          </View>
          <View className="flex-row items-center gap-x-2 mt-2 mb-4">
            <View className="flex-1 flex-row items-center justify-center bg-surface-light dark:bg-surface-dark px-3 py-2 rounded-lg gap-x-2">
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                color="#7C3AED"
              />
              <Text className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">
                {movie?.release_date?.split("-")[0]}
              </Text>
            </View>
            <View className="flex-1 flex-row items-center justify-center bg-surface-light dark:bg-surface-dark px-3 py-2 rounded-lg gap-x-2">
              <MaterialCommunityIcons name="clock" size={16} color="#7C3AED" />
              <Text className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">
                {movie?.runtime}m
              </Text>
            </View>
            <View className="flex-1 flex-row items-center justify-center bg-surface-light dark:bg-surface-dark px-3 py-2 rounded-lg gap-x-2">
              <MaterialCommunityIcons name="star" size={16} color="#7C3AED" />
              <Text className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">
                {movie?.vote_average?.toFixed(1)}
              </Text>
            </View>
            <View className="flex-1 flex-row items-center justify-center bg-surface-light dark:bg-surface-dark px-3 py-2 rounded-lg gap-x-2">
              <MaterialCommunityIcons
                name="trending-up"
                size={16}
                color="#7C3AED"
              />
              <Text className="text-text-accent-light dark:text-text-accent-dark text-sm font-bold">
                {movie?.popularity?.toFixed(0)}
              </Text>
            </View>
          </View>
          <View className="mt-6">
            <View className="mb-4">
              <Text className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold mb-2">
                Movie Information
              </Text>
              <View className="h-0.5 bg-text-accent-light/30 dark:bg-text-accent-dark/30 rounded-full" />
            </View>
            <MovieOverview overview={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={
                movie?.genres?.length
                  ? movie.genres.map((genre) => genre.name).join(", ")
                  : "N/A"
              }
            />
            <View className="flex flex-row gap-x-4">
              <View className="flex-1">
                <MovieInfo
                  label="Budget"
                  value={
                    movie?.budget
                      ? `$${(movie.budget / 1000000).toFixed(2)}M`
                      : "N/A"
                  }
                />
              </View>
              <View className="flex-1">
                <MovieInfo
                  label="Revenue"
                  value={
                    movie?.revenue
                      ? `$${(movie.revenue / 1000000).toFixed(2)}M`
                      : "N/A"
                  }
                />
              </View>
            </View>
            <MovieInfo
              label="Production Companies"
              value={
                movie?.production_companies?.length
                  ? movie.production_companies
                      .map((company) => company.name)
                      .join(" • ")
                  : "N/A"
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
