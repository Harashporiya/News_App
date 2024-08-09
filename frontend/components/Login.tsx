import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from "./Navigation";
import axios from 'axios';
import { API_Backend } from '../API_backend/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleSubmit = async () => {
        if(!email.trim() || !password.trim()){
            Alert.alert("Error", "All fields are required");
            return;
        }
        try {
            const res = await axios.post(`${API_Backend}/user/login`, {
                email,
                password
            });
            // console.log(res.data);
            Alert.alert("Success", "Login Successful!");
            setEmail("");
            setPassword("");
            const token = res.data.token
          await AsyncStorage.setItem('token', token);
            // console.log("login",token)
            navigation.navigate("News")
        } catch (error: any) {
            console.log(error);
            Alert.alert("Error",  "Please try again");
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQil1bJOEymH6fHg58kSZ4YjnB2P4NoYfWNw&s" }} />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:0}}>
                    <Text></Text>
                <Text onPress={()=>navigation.navigate("VerifyEmail")} style={{fontSize:18, color:"deepskyblue", fontWeight:"bold" }}>Forgot password?</Text></View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text  style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.footer}>Don't have an account? <Text style={{ color: "deepskyblue", fontWeight: "bold" }} onPress={() => navigation.navigate("Signup")}>Signup</Text></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
    },
    input: {
        borderColor: "gray",
        borderBottomWidth: 2,
        padding: 10,
        marginBottom: 10,
        fontSize: 18,
    },
    image: {
        height: 100,
        width: "90%",
        marginLeft: "5%",
        marginBottom: 20,
    },
    form: {
        paddingHorizontal: 30,
    },
    button: {
        backgroundColor: "deepskyblue",
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: "25%",
        marginTop: 20,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
        fontWeight:"bold",
    },
    footer: {
        textAlign: "center",
        margin: 20,
        fontSize: 18,
    }
});

export default Login;
