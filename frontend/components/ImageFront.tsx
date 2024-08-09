import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from "./Navigation";

const ImageFront = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Signup');
    }, 1000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQil1bJOEymH6fHg58kSZ4YjnB2P4NoYfWNw&s" }} 
      />
      <Text style={styles.text}>
        All types of news from all trusted sources for all types of people
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 400,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    padding: 10
  }
});

export default ImageFront;
