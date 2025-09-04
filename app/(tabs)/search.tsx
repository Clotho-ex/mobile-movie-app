import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getPopularMovies } from "@/services/api";
import { testDatabaseConnection, updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSearchedTerm, setLastSearchedTerm] = useState("");

  // Test database connection on component mount (for debugging)
  useEffect(() => {
    const checkDbConnection = async () => {
      try {
        const result = await testDatabaseConnection();
        if (!result.success) {
          console.warn(
            "Database connection test failed. Search tracking may not work."
          );
        }
      } catch (error) {
        console.warn("Unable to test database connection:", error);
      }
    };

    checkDbConnection();
  }, []);

  const {
    data: movies,
    loading,
    error,
    fetchData: loadMovies,
    reset,
  } = useFetch(() => getPopularMovies({ query: searchTerm }), false);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim()) {
        setHasSearched(true);
        setLastSearchedTerm(searchTerm);
        await loadMovies();
      } else {
        setHasSearched(false);
        setLastSearchedTerm("");
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Effect to handle database writing after movies are loaded
  useEffect(() => {
    const saveSearchToDatabase = async () => {
      if (
        lastSearchedTerm &&
        movies &&
        movies.length > 0 &&
        movies[0] &&
        !loading &&
        !error
      ) {
        try {
          await updateSearchCount(lastSearchedTerm, movies[0]);
        } catch (dbError) {
          console.warn("Failed to save search to database:", dbError);
          // Don't throw error to avoid breaking the search functionality
        }
      }
    };

    saveSearchToDatabase();
  }, [movies, lastSearchedTerm, loading, error]);

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
                  onChangeText={handleSearch}
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
                  Showing Results for{"  "}
                  <Text className="text-accent ">"{searchTerm}"</Text>
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
