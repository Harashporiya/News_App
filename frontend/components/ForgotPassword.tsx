import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from "./Navigation";
import axios from 'axios';
import { API_Backend } from '../API_backend/API';


const ForgotPassword = () => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const passwordSet = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        try {
            const res = await axios.put(`${API_Backend}/user/${userId}/password`, { password });
            console.log(res.data);
            Alert.alert("Success", res.data.message);
        } catch (error) {
            Alert.alert("Error", "Failed to set password");
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQil1bJOEymH6fHg58kSZ4YjnB2P4NoYfWNw&s" }} />
            <View style={styles.form}>
                <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: "deepskyblue", marginBottom: 20 }}>New Password Set</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter New password'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Re Enter Your Password'
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={passwordSet}>
                <Text style={styles.buttonText}>Sign in</Text>
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
        fontWeight: "bold",
    },
    footer: {
        textAlign: "center",
        margin: 20,
        fontSize: 18,
    }
});

export default ForgotPassword;
