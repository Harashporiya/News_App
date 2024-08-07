import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from "./Navigation";
import axios from 'axios';
import { API_Backend } from '../API_backend/API';

const VerifyEmail = () => {
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleSubmit = async () => {
        if (!email.trim()) {
            Alert.alert("Error", "All fields are required");
            return;
        }
        try {
            const res = await axios.post(`${API_Backend}/send-code`, { email });
            console.log(res.data);
            Alert.alert("Success", "Verification code sent successfully");
        } catch (error: any) {
            console.log(error);
            Alert.alert("Error", "Please try again");
        }
    };

    const verifyCode = async () => {
        if (!email.trim()|| !code.trim()) {
            Alert.alert("Error", "All fields are required");
            return;
        }
        try {
            const res = await axios.post(`${API_Backend}/verify-code`, { code, email });
            console.log(res.data);
            Alert.alert("Success", "Verification successfully");
            setEmail("");
            setCode("");
            navigation.navigate("ForgotPassword")
        } catch (error) {
            Alert.alert("Error", "Invalid Verification code");
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQil1bJOEymH6fHg58kSZ4YjnB2P4NoYfWNw&s" }} />
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TouchableOpacity style={styles.btnotp} onPress={handleSubmit}>
                        <Text style={styles.btnotpText}>OTP send</Text>
                    </TouchableOpacity>
                    <Text style={styles.line}></Text>
                </View>
                <TextInput
                    style={{fontSize:18, padding:16, borderColor:"gray", borderBottomWidth:2}}
                    placeholder='Verification code'
                    value={code}
                    onChangeText={text => setCode(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={verifyCode}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.footer}>Don't have an account? <Text style={styles.signupText} onPress={() => navigation.navigate("Signup")}>Signup</Text></Text>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line:{
        borderColor: "gray",
        borderBottomWidth: 2,
    },
    input: {
        flex: 1,
        borderColor: "gray",
        borderBottomWidth: 2,
        padding: 20,
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
        padding:20
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
        fontWeight: "bold",
    },
    footer: {
        textAlign: "center",
        margin: 20,
        fontSize: 18,
    },
    btnotp: {
        backgroundColor: "deepskyblue",
        borderRadius: 20,
        padding: 10,
        marginLeft: -80,
    
    },
    btnotpText: {
        color: "white",
        fontWeight: "bold",
    },
    signupText: {
        color: "deepskyblue",
        fontWeight: "bold",
    },
});

export default VerifyEmail;
