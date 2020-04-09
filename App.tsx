import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";

// Replace with your experienceId below with: @your-username/your-project-slug
//
// NOTES:
// 1. You need to publish at least once so the Expo servers are aware of an app with this id
// 2. You need to have the iOS bundleIdentifier set in app.json
// 3. Once you have published, run `expo credentials:manager` and associate a
// push key with it (an existing one if you have used Expo for notifications
// before will work fine, or upload one or let Expo handle creating it)
const experienceId = "@notbrent/barenotifs";

export async function registerForPushNotificationsAsync(): Promise<string> {
  await Notifications.requestPermissionsAsync();

  try {
    const expoPushToken = await Notifications.getExpoPushTokenAsync({
      experienceId,
    });
    return expoPushToken.data;
  } catch (e) {
    return "failed";
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    async function getPushTokenAsync() {
      let result = await registerForPushNotificationsAsync();
      setToken(result);
    }

    getPushTokenAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text selectable>{token ? token : "Waiting for token"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
