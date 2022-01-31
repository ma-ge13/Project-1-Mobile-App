import { createSlice, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserState {
  username: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  isManager: boolean;
}

const initialState: UserState = {
  username: null,
  employeeId: null,
  lastName: null,
  firstName: null,
  isManager: null,
};

const sessionSlice = createSlice({
  name: "UserSession",
  initialState,
  reducers: {
    updateUser(state) { async () => {
      state.username = await AsyncStorage.getItem("@username");
      state.employeeId = await AsyncStorage.getItem("@employeeId");
      state.firstName = await AsyncStorage.getItem("@firstName");
      state.lastName = await AsyncStorage.getItem("@lastName");
      state.isManager = (await AsyncStorage.getItem("@isManager")).toString() === "true";
    }},
  },
});

export const sessionStore = configureStore({ reducer: sessionSlice.reducer });
export const actions = sessionSlice.actions;