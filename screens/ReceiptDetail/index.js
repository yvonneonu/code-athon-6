import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useNavigation
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import * as Font from "expo-font";
import { Sen_400Regular } from "@expo-google-fonts/sen";

const ReceiptDetail = () => {
  const navigation = useNavigation(); // Get the navigation prop using useNavigation()
  const route = useRoute();
  const getFullMealsById = route.params.getFullMealsById;

  const [fontLoaded, setFontLoaded] = React.useState(false);

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
    <View style={{ marginTop: StatusBar.currentHeight }}>
      {getFullMealsById.map((item) => (
        <View key={item.idMeal}>
          <View
            style={{
              position: "relative",
            }}
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={{ height: 350 }}
            />
            <TouchableOpacity
              style={{ position: "absolute", top: 75, left: 20 }}
              onPress={() => navigation.goBack()}
            >
              <Image source={require("../../assets/images/Back.png")} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ padding: 20, gap: 10, height: 430 }}>
            <Text style={{ fontWeight: 700, fontSize: 20 }}>
              {item.strCategory}
            </Text>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 14,
                marginTop: 10,
                //
              }}
            >
              {item.strInstructions.length > 100
                ? `${item.strInstructions.substring(0, 150)}...`
                : item.strInstructions}{" "}
            </Text>

            <ScrollView horizontal={true}>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <View style={[styles.card, styles.shadowProp]}>
                  <Text style={{ fontSize: 16, fontWeight: 400 }}>
                    {item.strTags}
                  </Text>
                </View>
              </View>
            </ScrollView>

            <View
              style={{
                marginTop: 10,
              }}
            >
              <YoutubePlayer
                height={200}
                borderRadius={10}
                play={true}
                videoId={getVideoIdFromUrl(item.strYoutube)} // Extract the video ID from the URL
              />
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <View style={{ gap: 8 }}>
                <Text style={{ fontWeight: 700, fontSize: 15 }}>
                  Ingredient
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strIngredient1}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strIngredient2}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strIngredient3}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strIngredient4}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strIngredient5}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strIngredient6}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strIngredient7}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strIngredient8}
                </Text>
              </View>
              <View style={{ gap: 8 }}>
                <Text style={{ fontWeight: 700, fontSize: 15 }}>Measure</Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strMeasure1}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strMeasure2}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strMeasure3}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strMeasure4}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strMeasure5}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strMeasure6}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strMeasure7}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 400 }}>
                  {item.strMeasure8}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

function getVideoIdFromUrl(url) {
  const videoIdRegex =
    /(?:\?v=|\/embed\/|\/\d\/|\/vi\/|\/v\/|https:\/\/www\.youtube\.com\/watch\?v=)([^#\&\?]*).*/;
  const match = url.match(videoIdRegex);
  return match ? match[1] : null;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 50,
  },
  textStyle: {
    fontSize: 13,
    fontWeight: 400,
  },
});
export default ReceiptDetail;
