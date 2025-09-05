import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const CustomTabBar = ({ state, descriptors }: any) => {
  const router = useRouter();

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              // Use Expo Router's navigation with proper route mapping
              const routeMap: Record<string, any> = {
                index: "/",
                search: "/(tabs)/search",
                saved: "/(tabs)/saved",
                profile: "/(tabs)/profile",
              };
              router.push(routeMap[route.name] || "/");
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.activeTabItem]}>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: isFocused ? "#FFFFFF" : "#D5CDFE",
                  size: 24,
                  focused: isFocused,
                })}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs
      tabBar={CustomTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#1A1B23",
    borderRadius: 100,
    height: 70,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#7C3AED",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(124, 58, 237, 0.2)",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginHorizontal: 2,
  },
  activeTabItem: {
    backgroundColor: "rgba(124, 58, 237, 0.5)",
    shadowColor: "#7C3AED",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default Layout;
