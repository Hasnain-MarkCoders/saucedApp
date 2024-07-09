import {  FlatList, StyleSheet, View } from "react-native";
import { welcomeLists } from "../../../utils";
import { scale } from "react-native-size-matters";
import ProductBulletPoint from "../ProductBulletPoint/ProductBulletPoint";

const renderItem = ({ item }) =>
    (<ProductBulletPoint text={item} />)
  ;
const ProductsBulletsList = () => {
    return (
      <View style={{}}>
        <FlatList
          showsHorizontalScrollIndicator={false} 
          showsVerticalScrollIndicator={false}
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
      height: scale(20),
    }
  })


  export default ProductsBulletsList