import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_KEY } from '../API_backend/API';

interface Article {
  url: string;
  title: string;
  description: string;
  urlToImage: string;
  content: string;
  publishedAt:string;
  author:string;
}

const categories = [
  'National News', 'International News', 'Politics', 'Business', 'Technology',
  'Sports', 'Entertainment', 'Health', 'Science', 'Education', 'Lifestyle',
  'Environment', 'Crime', 'Opinion', 'Regional News'
];

const ShowNews: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('National News');
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const formattedDate = date.toISOString().split('T')[0];
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${category}&from=${formattedDate}&sortBy=publishedAt&apiKey=${API_KEY}`
        );
        setNews(response.data.articles);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Error fetching news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, date]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <>
    <View style={styles.container}>
      
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <View style={styles.categoriesContainer}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.button, item === category && styles.selectedButton]}
              onPress={() => setCategory(item)}
            >
              <Text
                style={[styles.buttonText, item === category && styles.selectedButtonText]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      </View>
    <ScrollView>
      
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
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
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            {item.urlToImage && <Image style={styles.image} source={{ uri: item.urlToImage }} />}
            <Text><Text style={{fontWeight:"bold"}}>Author: </Text>{item.author}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.content}</Text>
            <Text><Text style={{fontWeight:"bold"}}>Time and Date: </Text>{item.publishedAt}</Text>
           
          </View>
        )}
      />
     </ScrollView>
    
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    margin: 6,
    fontSize: 20,
    color:"white",
    padding: 4,
    borderRadius: 13,
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'gray',
    fontSize:15,
  },
  selectedButtonText: {
    color: 'black',
    fontWeight:"bold",
  },
  dateButton: {
    backgroundColor: "deepskyblue",
    width: 130,
    padding: 5,
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
});

export default ShowNews;
