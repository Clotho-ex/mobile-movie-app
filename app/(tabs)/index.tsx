import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getPopularMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => getPopularMovies({ query: "" }));

  const renderHeader = () => (
    <>
      <Image
        source={icons.logo}
        className="w-12 h-10 mt-20 mb-5 mx-auto"
        resizeMode="contain"
      />

      {moviesLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
        />
      ) : moviesError ? (
        <Text>Error: {moviesError?.message}</Text>
      ) : (
        <View className="mt-10">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
            value=""
            onChangeText={() => {}}
          />
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
