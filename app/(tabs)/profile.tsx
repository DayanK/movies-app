import { icons } from "@/constants/icons";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { getSavedMovies } from "@/services/savedMovies";
import { getTrendingMovies } from "@/services/appwrite";

const Profile = () => {
  const [stats, setStats] = useState({
    savedCount: 0,
    searchCount: 0,
    loading: true,
  });

  useEffect(() => {
    const loadStats = async () => {
      const saved = await getSavedMovies();
      const trending = await getTrendingMovies();

      const totalSearches = trending?.reduce((sum, movie) => sum + movie.count, 0) || 0;

      setStats({
        savedCount: saved.length,
        searchCount: totalSearches,
        loading: false,
      });
    };

    loadStats();
  }, []);

  if (stats.loading) {
    return (
      <SafeAreaView className="bg-primary flex-1">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView className="flex-1 px-5">
        <View className="items-center pt-8 pb-6">
          <View className="bg-secondary rounded-full p-6 mb-4">
            <Image source={icons.person} className="size-16" tintColor="#fff" />
          </View>
          <Text className="text-white text-2xl font-bold">Movie Enthusiast</Text>
          <Text className="text-gray-400 text-sm mt-1">Your movie journey</Text>
        </View>

        <View className="gap-4 mb-6">
          <View className="bg-secondary rounded-2xl p-5">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-gray-400 text-sm">Saved Movies</Text>
                <Text className="text-white text-3xl font-bold mt-1">
                  {stats.savedCount}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  Movies in your collection
                </Text>
              </View>
              <View className="bg-blue-500/20 rounded-full p-4">
                <Image source={icons.save} className="size-8" tintColor="#3B82F6" />
              </View>
            </View>
          </View>

          <View className="bg-secondary rounded-2xl p-5">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-gray-400 text-sm">Total Searches</Text>
                <Text className="text-white text-3xl font-bold mt-1">
                  {stats.searchCount}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  Community movie searches
                </Text>
              </View>
              <View className="bg-purple-500/20 rounded-full p-4">
                <Image source={icons.search} className="size-8" tintColor="#A855F7" />
              </View>
            </View>
          </View>
        </View>

        <View className="bg-secondary rounded-2xl p-5 mb-6">
          <Text className="text-white text-lg font-semibold mb-3">About</Text>
          <View className="gap-3">
            <View className="flex-row items-center">
              <Text className="text-gray-400 text-sm">📱 App Version</Text>
              <Text className="text-white text-sm ml-auto">1.0.0</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-400 text-sm">🎬 Movie Database</Text>
              <Text className="text-white text-sm ml-auto">TMDB</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-400 text-sm">☁️ Backend</Text>
              <Text className="text-white text-sm ml-auto">Appwrite</Text>
            </View>
          </View>
        </View>

        <View className="bg-secondary rounded-2xl p-5 mb-24">
          <Text className="text-white text-lg font-semibold mb-3">Activity</Text>
          <Text className="text-gray-400 text-sm leading-6">
            You're part of a community discovering amazing movies! Keep exploring,
            saving favorites, and finding your next watch.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
