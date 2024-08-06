import { View, Text, StyleSheet, Image, TouchableHighlight, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from "./Navigation";
import { API_Backend } from '../API_backend/API';
import axios from 'axios';

const Signup = () => {
    
    const [name, setname] = useState<string>('');
    const [email, setEmail] = useState<string>('')
    const [phoneNumber, setmobile] = useState<string>('');
    const [password, setpassword] = useState<string>('')
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handelSubmit = async () => {
        if(!name.trim() || !email.trim() || !phoneNumber.trim() || !password.trim()){
            Alert.alert("Error", "All fields are required");
            return;
        }
        try {
           

            const response = await axios.post(`${API_Backend}/user/signup`, {
                name,
                email,
                phoneNumber,
                password,
            });
            // console.log(response.data);
            Alert.alert("Success", "Create Account Successful!");
            setname('');
            setEmail("");
            setmobile("");
            setpassword("");
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Failed to Create Account");
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQil1bJOEymH6fHg58kSZ4YjnB2P4NoYfWNw&s" }} />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    value={name}
                    onChangeText={text => setname(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Mobile Number'
                    value={phoneNumber}
                    onChangeText={text => setmobile(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry
                    value={password}
                    onChangeText={text => setpassword(text)}
                />
            </View>
            <TouchableHighlight style={styles.button} >
                <Text onPress={handelSubmit} style={styles.buttonText}>Signup</Text>
            </TouchableHighlight>
            <View>
                <Text style={styles.footer}>Already have an account? <Text style={{color:"deepskyblue", fontWeight:"bold"}} onPress={()=>navigation.navigate("Login")}>Login</Text></Text>
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
        marginBottom: 40,
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
    footer:{
        textAlign:"center",
        margin:20,
        fontSize:18,
    }
});

export default Signup;
