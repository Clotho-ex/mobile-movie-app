import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getPopularMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  // Memoize the fetch function to prevent infinite loops
  const fetchPopularMovies = useCallback(
    () => getPopularMovies({ query: "" }),
    []
  );

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(fetchPopularMovies);

  const renderHeader = () => (
    <>
      <Image
        source={icons.logo}
        className="w-12 h-10 mt-20 mb-5 mx-auto"
        resizeMode="contain"
      />

      {moviesLoading || trendingLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
        />
      ) : moviesError || trendingError ? (
        <Text>Error: {moviesError?.message || trendingError?.message}</Text>
      ) : (
        <View className="mt-10">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
            value=""
            onChangeText={() => router.push("/search")}
          />

          {trendingMovies && trendingMovies.length > 0 && (
            <View className="mt-10">
              <Text className="text-white text-xl text-center font-bold mb-5">
                🔥 Trending Searches
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 5,
                  gap: 16,
                }}
                className="mb-10">
                {trendingMovies.map((movie, index) => (
                  <TrendingCard
                    key={movie.movie_id}
                    movie={movie}
                    index={index}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          <Text className="text-white text-xl text-center font-bold mt-10 mb-10">
            Popular Movies
          </Text>
        </View>
      )}
    </>
  );

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard {...item} />
  );

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Image
        source={images.bg}
        className="w-full h-full absolute z-0"
        resizeMode="cover"
      />
      <View className="flex-1 px-5">
        {moviesLoading || moviesError || !movies?.length ? (
          renderHeader()
        ) : (
          <FlatList
            data={movies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              marginBottom: 10,
              gap: 16,
            }}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
              paddingTop: 0,
              marginTop: 10,
            }}
          />
        )}
      </View>
    </View>
  );
}
