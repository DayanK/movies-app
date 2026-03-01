import { icons } from "@/constants/icons";
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { getSavedMovies, unsaveMovie } from "@/services/savedMovies";
import { router } from "expo-router";

const Save = () => {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadSavedMovies = async () => {
    const movies = await getSavedMovies();
    setSavedMovies(movies);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadSavedMovies();
  }, []);

  const handleRemove = async (movieId: number) => {
    await unsaveMovie(movieId);
    loadSavedMovies();
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaView>
    );
  }

  if (savedMovies.length === 0) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-10">
        <View className="flex justify-center items-center flex-1 flex-col gap-5">
          <Image source={icons.save} className="size-10" tintColor="#fff" />
          <Text className="text-gray-500 text-base">No saved movies yet</Text>
          <Text className="text-gray-600 text-sm text-center">
            Start saving your favorite movies to watch later!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="px-5 pt-5 pb-3">
        <Text className="text-white text-2xl font-bold">Saved Movies</Text>
        <Text className="text-gray-400 text-sm mt-1">
          {savedMovies.length} {savedMovies.length === 1 ? "movie" : "movies"} saved
        </Text>
      </View>

      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.$id}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadSavedMovies();
        }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/movie/${item.movie_id}`)}
            className="flex-row bg-secondary rounded-xl mb-3 overflow-hidden"
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
              }}
              className="w-24 h-36"
              resizeMode="cover"
            />
            <View className="flex-1 p-3 justify-between">
              <View>
                <Text className="text-white font-semibold text-base" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-gray-400 text-xs mt-1">
                  {item.release_date?.split("-")[0]}
                </Text>
                <View className="flex-row items-center mt-2">
                  <Text className="text-yellow-400 text-sm">⭐</Text>
                  <Text className="text-white text-sm ml-1">
                    {item.vote_average?.toFixed(1)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleRemove(item.movie_id)}
                className="self-end"
              >
                <Text className="text-red-500 text-sm">Remove</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Save;
