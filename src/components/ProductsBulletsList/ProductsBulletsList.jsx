import {  FlatList, StyleSheet, View } from "react-native";
import { welcomeLists } from "../../../utils";
import { scale } from "react-native-size-matters";
import ProductBulletPoint from "../ProductBulletPoint/ProductBulletPoint";

const renderItem = ({ item, textStyles }) =>
    (<ProductBulletPoint text={item} textStyles={textStyles} />)
  ;
const ProductsBulletsList = ({
  data=[],
  textStyles={},
  bulletStyle={},


}) => {
    return (
      <View style={{}}>
        <FlatList
          showsHorizontalScrollIndicator={false} 
          showsVerticalScrollIndicator={false}
          data={welcomeLists}
          renderItem={(props)=>renderItem({...props, textStyles, bulletStyle})}
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