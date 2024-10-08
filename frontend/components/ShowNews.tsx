import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, ActivityIndicator ,FlatList} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { API_KEY_2 } from '../API_backend/API';
import { countries } from "../components/Conutry";
import { categories } from "../components/Category";

interface Article {
  url: string;
  title: string;
  description: string;
  urlToImage: string;
  content: string;
  publishedAt: string;
  author: string;
}

const ShowNews: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('National News');
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('Country News');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const formattedDate = date.toISOString().split('T')[0];
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${category}+${country}&from=${formattedDate}&sortBy=publishedAt&apiKey=${API_KEY_2}&lan=hi`
        );
        setNews(response.data.articles);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, date, country]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setDataSelected(true);
  };

  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="deepskyblue" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.categoriesContainer}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.button, item === category && styles.selectedButton]}
              onPress={() => setCategory(item)}
              accessibilityLabel={`Select ${item} category`}
            >
              <Text style={[styles.buttonText, item === category && styles.selectedButtonText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <Picker
        selectedValue={country}
        onValueChange={(itemValue) => setCountry(itemValue)}
        style={styles.picker}
        accessibilityLabel="Select country"
      >
        {countries.map((country) => (
          <Picker.Item key={country} label={country} value={country} />
        ))}
      </Picker>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
        accessibilityLabel="Select date"
      >
        <Text style={styles.dateButtonText}>Select Date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <FlatList
        data={news}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            {item.urlToImage && <Image style={styles.image} source={{ uri: item.urlToImage }} />}
            <Text><Text style={{ fontWeight: "bold" }}>Author: </Text>{item.author}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity onPress={() => openURL(item.url)}>
              <Text style={styles.linkText}>More News Links</Text>
            </TouchableOpacity>
            <Text><Text style={{ fontWeight: "bold" }}>Time and Date: </Text>{item.publishedAt}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  categoriesContainer: {
    paddingVertical: 10,
  },
  button: {
    margin: 6,
    fontSize: 20,
    color: "white",
    padding: 4,
    borderRadius: 13,
    textAlign: 'center',
  },
  selectedButton: {
    // customize selected button styles here
  },
  buttonText: {
    color: 'gray',
    fontSize: 20,
  },
  selectedButtonText: {
    color: 'black',
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  picker: {
    marginVertical: 10,
  },
  dateButton: {
    backgroundColor: "deepskyblue",
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  newsItem: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    height: 300,
    width: '100%',
    borderRadius: 5,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
});

export default ShowNews;
