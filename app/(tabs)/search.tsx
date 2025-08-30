import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getPopularMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data: movies,
    loading,
    error,
    fetchData: loadMovies,
    reset,
  } = useFetch(() => getPopularMovies({ query: searchTerm }), false);

  // Use refs to avoid dependency issues
  const loadMoviesRef = useRef(loadMovies);
  const resetRef = useRef(reset);

  // Update refs when functions change
  useEffect(() => {
    loadMoviesRef.current = loadMovies;
    resetRef.current = reset;
  }, [loadMovies, reset]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim()) {
        await loadMoviesRef.current();
        setHasSearched(true);
      } else {
        resetRef.current();
        setHasSearched(false);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Separate effect for updating search count when movies data changes
  useEffect(() => {
    if (movies?.[0]) {
      updateSearchCount(searchTerm, movies[0]);
    }
  }, [movies, searchTerm]);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Image
        source={images.bg}
        className="w-full h-full absolute z-0"
        resizeMode="cover"
      />
      <View className="flex-1 px-5">
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 0,
            marginTop: 10,
          }}
          ListHeaderComponent={
            <>
              <Image
                source={icons.logo}
                className="w-12 h-10 mt-20 mb-5 mx-auto"
                resizeMode="contain"
              />
              <View className="mt-10 mb-10">
                <SearchBar
                  placeholder="Search for a movie"
                  onPress={() => {}}
                  value={searchTerm}
                  onChangeText={(text: string) => setSearchTerm(text)}
                />
              </View>
              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="mt-10 self-center"
                />
              )}
              {error && (
                <Text className="text-red-500 px-5 my-5 text-center">
                  Error: {error?.message}
                </Text>
              )}
              {!loading && !error && searchTerm.trim() && movies?.length && (
                <Text className="text-white text-xl text-center font-bold mt-10 mb-10">
                  Search Results for{" "}
                  <Text className="text-accent ">{searchTerm}</Text>
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View className="mt-10 mb-10">
                <Text className="text-center text-xl font-bold">
                  {searchTerm.trim() && hasSearched ? (
                    <Text className="text-[#FF5600]">
                      We don&apos;t have that movie
                    </Text>
                  ) : (
                    <Text className="text-white/50">
                      Get your snacks ready!
                    </Text>
                  )}
                </Text>
              </View>
            ) : null
          }
          columnWrapperStyle={{
            justifyContent: "flex-start",
            marginBottom: 10,
            gap: 16,
          }}
        />
      </View>
    </View>
  );
};

export default Search;
