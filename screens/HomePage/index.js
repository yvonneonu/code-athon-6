import React from "react";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import MealService from "../../services/mealServices";
import * as Font from "expo-font";
import { Sen_400Regular } from "@expo-google-fonts/sen";

const HomePage = () => {
  const navigation = useNavigation(); // Get the navigation prop using useNavigation()
  const [number, onChangeNumber] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [filteredMeals, setFilteredMeals] = React.useState([]);
  const [getFullMealsById, setFullMealsById] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [originalCategories, setOriginalCategories] = React.useState([]); // New state for original categories
  const [uniqueCategories, setUniqueCategories] = React.useState([]);

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

  React.useEffect(() => {
    // Filter out duplicate categories and set them in state
    const uniqueCategories = originalCategories.filter(
      (category, index, self) =>
        index === self.findIndex((c) => c.strCategory === category.strCategory)
    );
    setUniqueCategories(uniqueCategories);
  }, []);

  const handleSearch = async (item) => {
    if (item === "") {
      console.log(item);
    } else {
      try {
        const items = await MealService.getSearchItem(item);
        if (items !== null) {
          setCategories(items);
        }
      } catch (error) {
        console.error("Error fetching filtered meals:", error);
      }
    }
  };

  const handleCategoryPress = async (strCategory) => {
    try {
      const filteredMeals = await MealService.getFilteredMealsByCategory(
        strCategory
      );
      setFilteredMeals(filteredMeals);
      setSelectedCategory(strCategory); // Set the selected category

      // You can use the filteredMeals array as needed
    } catch (error) {
      console.error("Error fetching filtered meals:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
    // Fetch data when the component mounts
  }, []);

  const onItemClick = async (id) => {
    try {
      const fullMealID = await MealService.getFullMealsById(id);
      setFullMealsById(fullMealID);
    } catch (error) {
      console.error("Error fetching filtered meals:", error);
    }
  };

  React.useEffect(() => {
    if (getFullMealsById.length > 0) {
      navigation.navigate("ReceiptDetail", {
        getFullMealsById: getFullMealsById,
      });
    }
  }, [getFullMealsById]);

  const fetchData = async () => {
    try {
      const items = await MealService.getNoSearch();

      setCategories(items);
      setOriginalCategories(items);
    } catch (error) {
      console.error("Error fetching filtered meals:", error);
    }
  };

  // if (!fontLoaded) {
  //   return null; // You can render a loading indicator here
  // }

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Text style={{ fontWeight: 400, fontSize: 16 }}>Hey User,</Text>

        <Text style={{ fontWeight: 700, fontSize: 16 }}>Good Afternoon!</Text>
      </View>
      <View
        style={{
          position: "relative",
          marginTop: 15,
        }}
      >
        <TextInput
          style={{ width: 370, padding: 20, backgroundColor: "#F0F5FA" }}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Search for recipe"
          multiline={true}
        />

        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 40 }}
          onPress={() => handleSearch(number)}
        >
          <Image source={require("../../assets/images/Search.png")} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 700, fontSize: 20 }}>All Categories</Text>
      </View>

      <ScrollView horizontal={true}>
        {uniqueCategories.map((item) => (
          <View
            key={item.idMeal}
            style={{ flexDirection: "row", marginLeft: 15 }}
          >
            <TouchableOpacity
              style={[
                styles.card,
                styles.shadowProp,
                selectedCategory === item.strCategory
                  ? { backgroundColor: "#FFD27C" } // Apply green background to selected tab
                  : { backgroundColor: "white" }, // Apply yellow background to non-selected tabs
              ]}
              onPress={() => handleCategoryPress(item.strCategory)}
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <Text style={{ fontWeight: 700, fontSize: 14 }}>
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 700, fontSize: 20 }}>Recipe List</Text>
      </View>

      <ScrollView style={{ height: 400, marginTop: 40 }}>
        {selectedCategory
          ? filteredMeals.map((item) => (
              <TouchableOpacity
                key={item.idMeal}
                style={styles.receiptItem}
                onPress={() => onItemClick(item.idMeal)} // Call the onItemClick function with the selected item
              >
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={styles.backgroundView}
                />
                <Text style={styles.name}>{item.strMeal}</Text>
                <Text style={{ fontWeight: 400, fontSize: 14 }}>
                  {item.strTags}
                </Text>
              </TouchableOpacity>
            ))
          : categories.map((item) => (
              <TouchableOpacity
                key={item.idMeal}
                style={styles.receiptItem}
                onPress={() => onItemClick(item.idMeal)} // Call the onItemClick function with the selected item
              >
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={styles.backgroundView}
                />
                <Text style={styles.name}>{item.strMeal}</Text>
                <Text>{item.strTags}</Text>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  image: {
    // flex: 0.5,
    // width: "100%",
    height: "100%",
  },
  secondSec: {
    backgroundColor: "white",
    height: 550,
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
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    height: "20%",
  },

  textName: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: 400,
    height: 61,
    borderWidth: 1,

    fontWeight: 400,
    fontSize: 20,
  },

  input: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
    width: "100%",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    elevation: 5, // Add this line
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 50,
  },
  receiptItem: {
    marginBottom: 20,
  },
  backgroundView: {
    // backgroundColor: "#98A8B8",
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  name: {
    fontWeight: "400",
    fontSize: 24,
    marginTop: 15,
  },
});
export default HomePage;
