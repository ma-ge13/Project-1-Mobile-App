import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './components/login/login-screen';
import ManagerReimbursementContainer from './components/reimbursements/reimbursement-container';
import { Provider } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';
import { sessionStore } from './sessionStore';
import ReimbursementDetails from './components/reimbursements/reimbursement-details';

export default function App() {

  const Stack = createNativeStackNavigator();
  
  return (
    <Provider store={sessionStore}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Welcome",
                contentStyle: styles.container,
              }}
            />

            <Stack.Screen
              name="Pending Reimbursements"
              component={ManagerReimbursementContainer}
            />
            
            <Stack.Screen
              name="Reimbursement Details"
              component={ReimbursementDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#525252",
    alignItems: "center",
    justifyContent: "center",
  },
});
