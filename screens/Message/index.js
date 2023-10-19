import React from "react";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { UserContext } from "../../component/context";
import * as Font from "expo-font";
import { Sen_400Regular } from "@expo-google-fonts/sen";

const Message = () => {
  const navigation = useNavigation(); // Get the navigation prop using useNavigation()

  const [fontLoaded, setFontLoaded] = React.useState(false);
  const { getUser, setUser } = React.useContext(UserContext);

  // const loadFont = async () => {
  //   await Font.loadAsync({
  //     sen: Sen_400Regular,
  //   });
  //   setFontLoaded(true);
  // };

  // React.useEffect(() => {
  //   loadFont();
  // }, []);

  // if (!fontLoaded) {
  //   return null; // You can render a loading indicator here
  // }

  return (
    <View
      style={{
        padding: 20,
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "white",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: "row", gap: 40, alignItems: "center" }}>
          <Image source={require("../../assets/images/Profile.png")} />

          <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Text style={{ fontWeight: 700, fontSize: 20 }}>
              {getUser.username === "" ? "John Deo" : getUser.username}
            </Text>
            <Text>View your details</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            backgroundColor: "#F6F8FA",
            padding: 20,
            gap: 20,
          }}
        >
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Image source={require("../../assets/images/Group333.png")} />

            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text style={{ fontWeight: 400, fontSize: 14 }}>FULL NAME</Text>
              <Text style={{ fontWeight: 400, fontSize: 14 }}>
                {getUser.username === "" ? "John Deo" : getUser.username}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 20 }}>
            <Image source={require("../../assets/images/Group34.png")} />

            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text style={{ fontWeight: 400, fontSize: 14 }}>Email</Text>
              <Text style={{ fontWeight: 400, fontSize: 14 }}>
                {getUser.email === "" ? "hello@johndoe.co" : getUser.email}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text
          onPress={() => {
            navigation.navigate("Sign Up");
            setUser({
              username: "",
              password: "",
              email: "",
            });
          }}
          style={{ fontWeight: 700, fontSize: 20 }}
        >
          Log Out
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  item: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    color: "#42C561",
  },
});
export default Message;
