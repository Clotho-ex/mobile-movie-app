import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getPopularMovies } from "@/services/api";
import { testDatabaseConnection, updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Use useRef to track saved search terms without causing re-renders
  const savedSearchTermsRef = useRef<Set<string>>(new Set());

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

  const handleClear = () => {
    setSearchTerm("");
    setHasSearched(false);
    reset();
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim()) {
        setHasSearched(true);

        // Only save to database if this exact search term hasn't been saved yet
        const trimmedTerm = searchTerm.trim();
        const shouldSaveToDb = !savedSearchTermsRef.current.has(trimmedTerm);

        try {
          await loadMovies();

          // Save to database only once per unique search term per session
          if (shouldSaveToDb) {
            // Get fresh data for database saving
            const searchResults = await getPopularMovies({
              query: trimmedTerm,
            });

            if (searchResults && searchResults.length > 0 && searchResults[0]) {
              try {
                await updateSearchCount(trimmedTerm, searchResults[0]);
                savedSearchTermsRef.current.add(trimmedTerm);
                console.log(`Search "${trimmedTerm}" saved to database`);
              } catch (dbError) {
                console.warn("Failed to save search to database:", dbError);
              }
            }
          } else {
            console.log(
              `Search "${trimmedTerm}" already saved in this session, skipping database write`
            );
          }
        } catch (error) {
          console.warn("Search operation failed:", error);
        }
      } else {
        setHasSearched(false);
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <View className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
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
                  onClear={handleClear}
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
                <Text className="text-red-500 dark:text-red-400 px-5 my-5 text-center">
                  Error: {error?.message}
                </Text>
              )}
              {!loading && !error && searchTerm.trim() && movies?.length && (
                <Text className="text-text-primary-light dark:text-text-primary-dark text-xl text-center font-bold mt-10 mb-10">
                  Showing Results for{"  "}
                  <Text className="text-text-accent-light dark:text-text-accent-dark ">
                    &ldquo;{searchTerm}&rdquo;
                  </Text>
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View className="mt-10 mb-10">
                <Text className="text-center text-xl font-bold">
                  {searchTerm.trim() && hasSearched ? (
                    <Text className="text-orange-600 dark:text-orange-500">
                      We don&apos;t have that movie
                    </Text>
                  ) : (
                    <Text className="text-text-secondary-light dark:text-text-primary-dark/50">
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
