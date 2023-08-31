import React from "react";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import {
  Button,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../../component/context";
import * as Font from "expo-font";
import { Sen_400Regular } from "@expo-google-fonts/sen";

const Feed = () => {
  const navigation = useNavigation(); // Get the navigation prop using useNavigation()

  const [data, setData] = React.useState({
    username: "",
    password: "",
    email: "",
  });
  const handleSignin = (username, password, email) => {
    setUser((prevUser) => ({
      ...prevUser,
      username, // Set the updated username
      password, // Set the updated password
      email,
    }));
    navigation.navigate("HomePage");
  };

  const handlePress = () => {
    navigation.navigate("Sign Up");
  };

  const handleInputChange = (field, val) => {
    setData({
      ...data,
      [field]: val,
    });
  };

  const { setUser } = React.useContext(UserContext);

  const [fontLoaded, setFontLoaded] = React.useState(false);

  const loadFont = async () => {
    await Font.loadAsync({
      sen: Sen_400Regular,
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // You can render a loading indicator here
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E2E", alignItems: "center" }}>
      <View
        style={{
          height: 200,
          alignItems: "center",
          // justifyContent: "center",
          justifyContent: "flex-end",
          gap: 10,
          marginBottom: 80,
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 55, right: 220 }}
          onPress={() => handlePress()}
        >
          <Image source={require("../../assets/images/Back.png")} />
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: 30,
            fontFamily: "sen",
          }}
        >
          Sign Up
        </Text>
        <Text
          style={{
            color: "white",
            fontFamily: "sen",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          Please sign up to get started
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",

          borderTopLeftRadius: 40,
          height: "100%",
          borderTopRightRadius: 40,
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          // justifyContent: "center",
          // textAlign: "left",
        }}
      >
        <ScrollView>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 30,
              gap: 10,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontFamily: "sen",
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              NAME
            </Text>
            <TextInput
              style={{ width: 340, padding: 10, backgroundColor: "#F0F5FA" }}
              onChangeText={(val) => handleInputChange("username", val)}
              value={data.username}
              placeholder="John Smith"
              multiline={true}
            />

            <Text
              style={{
                textAlign: "left",
                marginTop: 10,
                fontFamily: "sen",
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              EMAIL
            </Text>
            <TextInput
              style={{ width: 340, padding: 10, backgroundColor: "#F0F5FA" }}
              onChangeText={(val) => handleInputChange("email", val)}
              value={data.email}
              placeholder="John@gmailcom"
              multiline={true}
            />

            <Text
              style={{
                textAlign: "left",
                marginTop: 10,
                fontFamily: "sen",
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              PASSWORD
            </Text>
            <TextInput
              style={{ width: 340, padding: 10, backgroundColor: "#F0F5FA" }}
              onChangeText={(val) => handleInputChange("password", val)}
              value={data.password}
              placeholder="Password"
              multiline={true}
              secureTextEntry={true}
            />

            <View style={{ marginTop: 10 }}>
              <Button
                title="SIGN UP"
                color="#FF7622"
                onPress={() =>
                  handleSignin(data.username, data.password, data.email)
                }
              />
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#646982",
                  fontWeight: 400,
                  fontSize: 16,
                  fontFamily: "sen",
                }}
              >
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => handlePress()}>
                <Text
                  style={{
                    color: "#FF7622",
                    fontWeight: 700,
                    fontSize: 14,
                    fontFamily: "sen",
                  }}
                >
                  LOG IN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stretch: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    height: "100%",
  },

  secondSec: {
    backgroundColor: "white",
    height: 600,
    borderTopLeftRadius: 50,
    display: "flex",
    alignItems: "center",
    gap: 20,
  },

  imagesecond: {
    height: "20%",
    // borderRadius: 100,
    width: "100%",
    backgroundColor: "yellow",
  },

  container: {
    backgroundColor: "#1E1E2E",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    height: "28%",
  },

  textName: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: 400,
    height: 61,
    borderWidth: 1,
  },

  input: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
    width: "100%",
  },
});
export default Feed;
