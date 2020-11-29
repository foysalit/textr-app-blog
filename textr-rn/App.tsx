import React, {useState} from 'react';
import Constants from "expo-constants";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView, Dimensions} from 'react-native';
import { Div, ThemeProvider } from "react-native-magnus";

import ChatPage from "./chat-page";
import AuthPage from "./auth-page";

const windowHeight = Dimensions.get('window').height;

export default function App() {
    const [user, setUser] = useState(null);
    return (
        <ThemeProvider>
            <StatusBar style="auto" />
            <SafeAreaView>
                <Div
                    flex={1}
                    minH={windowHeight}
                    justifyContent="center"
                    pt={Constants.statusBarHeight}>
                    {
                        user
                            ? <ChatPage user={{ _id: user }} />
                            : <AuthPage setUser={setUser} />
                    }
                </Div>
            </SafeAreaView>
        </ThemeProvider>
    );
}