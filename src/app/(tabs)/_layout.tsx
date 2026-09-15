import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GradientIcon } from "@/components/gradient-icon";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(32, 30, 30, 0.8)",
          borderRadius: 20,
          position: "absolute",
          marginHorizontal: "2.5%",
          bottom: 60,
          width: "95%",
          height: 70,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          color: "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <GradientIcon
                name="home"
                size={size}
                colors={["#deeb25", "#ff6b6b"]}
              />
            ) : (
              <Ionicons name="home-outline" size={size} color="#ffffff" />
            ),
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <GradientIcon
                name="grid"
                size={size}
                colors={["#deeb25", "#ff6b6b"]}
              />
            ) : (
              <Ionicons name="grid-outline" size={size} color="#ffffff" />
            ),
        }}
      />

      <Tabs.Screen
        name="download"
        options={{
          title: "Download",
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <GradientIcon
                name="download"
                size={size}
                colors={["#deeb25", "#ff6b6b"]}
              />
            ) : (
              <Ionicons name="download-outline" size={size} color="#ffffff" />
            ),
        }}
      />

      <Tabs.Screen
        name="me"
        options={{
          title: "Me",
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <GradientIcon
                name="person"
                size={size}
                colors={["#deeb25", "#ff6b6b"]}
              />
            ) : (
              <Ionicons name="person-outline" size={size} color="#ffffff" />
            ),
        }}
      />
    </Tabs>
  );
}