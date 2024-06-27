import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native'
const Test = () => {
    const [text, onChangeText] = React.useState('Useless Text');

  return (
    <SafeAreaView>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={text}
    />
  </SafeAreaView>
  )
}

export default Test

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });