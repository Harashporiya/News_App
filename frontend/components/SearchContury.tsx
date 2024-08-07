import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SearchContury = () => {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={24} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'deepskyblue',
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize:20
  },
});

export default SearchContury;
