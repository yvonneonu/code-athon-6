import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import Feed from "./screens/Feed";
import HomePage from "./screens/HomePage";
import Message from "./screens/Message";
import ReceiptDetail from "./screens/ReceiptDetail";
import React, { useEffect } from "react";
import { UserContext } from "./component/context";

const Stack = createNativeStackNavigator();

const CustomHeaderBackground = () => {
  const navigation = useNavigation(); // Get the navigation prop using useNavigation()

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 50,
        padding: 20,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require("./assets/images/RecipeLogo.png")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Message")}>
        <Image
          style={{ backgroundColor: "black", borderRadius: 50, padding: 15 }}
          source={require("./assets/images/user.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const CustomMessage = () => {
  const navigation = useNavigation(); // Get the navigation prop using useNavigation()

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
        // width: `auto`,
        padding: 20,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require("./assets/images/Back.png")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Text style={{ fontWeight: 400, fontSize: 17, fontFamily: "sen" }}>
          Personal Info
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [getUser, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
  });

  const providerValue = React.useMemo(
    () => ({
      getUser,
      setUser,
    }),
    [getUser, setUser]
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <UserContext.Provider value={providerValue}>
      <NavigationContainer>
        <Stack.Navigator style={styles.container}>
          <Stack.Screen
            name="Sign Up"
            component={WelcomeScreen}
            options={{
              headerShown: false,
              backgroundColor: "#1E1E2E",
            }}
          />
          {/* <StatusBar style="auto" /> */}
          <Stack.Screen
            name="Login"
            component={Feed}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{
              headerBackground: CustomHeaderBackground,
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerShown: false,
              // props: {
              //   setFullMealsById: setFullMealsById,
              //   getFullMealsById: getFullMealsById,
              // },
            }}
          />

          <Stack.Screen
            name="Message"
            component={Message}
            options={{
              headerBackground: CustomMessage,
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ReceiptDetail"
            component={ReceiptDetail}
            options={{
              headerShown: false,
              // props: {
              //   getFullMealsById: getFullMealsById, // Pass the fullMeals state as a prop
              // },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
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
