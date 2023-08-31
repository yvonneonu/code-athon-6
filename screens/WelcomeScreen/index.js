import React from "react";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import { UserContext } from "../../component/context";
import { Sen_400Regular } from "@expo-google-fonts/sen";
import * as Font from "expo-font";

const WelcomeScreen = () => {
  const navigation = useNavigation(); // Get the navigation prop using useNavigation()
  const [fontLoaded, setFontLoaded] = React.useState(false);

  const handlePress = () => {
    navigation.navigate("Login");
  };

  const { setUser } = React.useContext(UserContext);
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });

  const handleSignin = (username, password) => {
    setUser((prevUser) => ({
      ...prevUser,
      username, // Set the updated username
      password, // Set the updated password
    }));
    navigation.navigate("HomePage");
  };

  const loadFont = async () => {
    await Font.loadAsync({
      sen: Sen_400Regular,
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFont();
  }, []);

  const handleInputChange = (field, val) => {
    setData({
      ...data,
      [field]: val,
    });
  };

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
        <Text
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: 30,
            fontFamily: "sen",
          }}
        >
          Log In
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: "sen",
            fontWeight: 400,
          }}
        >
          Please sign in to your existing account
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
              fontWeight: 400,
              fontSize: 14,
              fontFamily: "sen",
            }}
          >
            EMAIL
          </Text>
          <TextInput
            style={{ width: 340, padding: 10, backgroundColor: "#F0F5FA" }}
            onChangeText={(val) => handleInputChange("username", val)}
            value={data.username}
            placeholder="Full Name"
            multiline={true}
          />

          <Text
            style={{
              textAlign: "left",
              marginTop: 10,
              fontWeight: 400,
              fontSize: 14,
              fontFamily: "sen",
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
            secureTextEntry={true} // This hides the text as the user types
          />

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <View>
              {/* <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              /> */}
              <Text
                style={{
                  fontWeight: 400,
                  fontSize: 13,
                  fontFamily: "sen",
                  color: "#7E8A97",
                }}
              >
                Remember me
              </Text>
            </View>
            <Text
              style={{
                color: "#FF7622",
                fontFamily: "sen",
                fontWeight: 400,
                fontSize: 14,
              }}
            >
              Forgot Password
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Button
              title="LOG IN"
              color="#FF7622"
              onPress={() => handleSignin(data.username, data.password)}
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
              Don’t have an account?
            </Text>
            <Text
              style={{
                color: "#FF7622",
                fontWeight: 700,
                fontSize: 14,
                fontFamily: "sen",
              }}
              onPress={() => handlePress()}
            >
              Sign Up
            </Text>
          </View>
        </View>
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
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    // marginTop: 10,
    // justifyContent: "center",
    // marginBottom: 20,
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
export default WelcomeScreen;
