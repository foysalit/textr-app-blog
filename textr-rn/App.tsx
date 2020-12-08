import React, {useState} from 'react';
import Constants from "expo-constants";
import {StatusBar} from "expo-status-bar";
import Meteor, {withTracker} from '@meteorrn/core';
import {SafeAreaView, Dimensions} from 'react-native';
import { Div, ThemeProvider } from "react-native-magnus";

import ChatPage from "./chat-page";
import AuthPage from "./auth-page";

const windowHeight = Dimensions.get('window').height;

Meteor.connect("ws://192.168.0.113:3000/websocket");

function App({ user }) {
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
                            ? <ChatPage user={user} />
                            : <AuthPage />
                    }
                </Div>
            </SafeAreaView>
        </ThemeProvider>
    );
}

export default withTracker(() => ({user: Meteor.user()}))(App);