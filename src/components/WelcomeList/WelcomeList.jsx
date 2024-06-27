import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { welcomeLists } from "../../../utils";
import CustomListItem from "../CustomListItem/CustomListItem";

const { width } = Dimensions.get('window');

// Utility to get a responsive height based on screen size
const responsiveHeight = (height) => {
  const scaleFactor = 812; // Based on standard screen height (e.g., iPhone X)
  return (height / scaleFactor) * Dimensions.get('window').height;
};

const renderItem = ({ item }) =>
    (<CustomListItem text={item} />)
  ;
const WelcomeLists = () => {
    return (
      <View style={{}}>
        <FlatList
          data={welcomeLists}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    separator: {
      height: responsiveHeight(20),
    }
  })


  export default WelcomeLists