import axios from "axios";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { actions, UserState } from "../../sessionStore";

export default function LoginScreen({navigation}) {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const user = useSelector((state: UserState) => state);
    const dispatch = useDispatch();

    function authenticate() {
        if (!username || !password) {
            return Alert.alert("Enter a username and password.");
        }

        axios.post(
            "https://ponzi-bank.azurewebsites.net/employee",
            JSON.stringify({
                username: username,
                password: password
            }),
            { headers: { "Content-Type": "application/json" } }
        ).then((response) => {
            if (response.status !== 200 || !response.data.isManager) {
                Alert.alert(`ERROR: ${response.data}`);
            }
            else {
                const employeeId = response.data.employeeId;
                const username = response.data.username;
                const lastName = response.data.lastName;
                const firstName = response.data.firstName;
                const isManager = response.data.isManager;

                AsyncStorage.setItem("@username", username);
                AsyncStorage.setItem("@employeeId", employeeId);
                AsyncStorage.setItem("@firstName", firstName);
                AsyncStorage.setItem("@lastName", lastName);
                AsyncStorage.setItem("@isManager", isManager);
                
                dispatch(actions.updateUser());
                
                navigation.navigate("Pending Reimbursements");
            }
        });
    }

    return (
        <View>
            <Text style={design.title}>Ponzi Bank</Text>
            <Text style={design.title}>Employee Reimbursements App</Text>
            <TextInput
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor={"#FFFFFF"}
                selectTextOnFocus={true}
            />
            <TextInput
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={"#FFFFFF"}
                secureTextEntry={true}
                selectTextOnFocus={true}
            />
            <Button color="#B68F40" title="Login" onPress={authenticate}></Button>
        </View>
    );
}

const design = StyleSheet.create({
    title: {
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: "bold"
    }
});