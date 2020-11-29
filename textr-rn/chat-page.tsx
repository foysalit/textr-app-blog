import { GiftedChat } from 'react-native-gifted-chat'
import React, {useEffect, useCallback, useState} from 'react';
import {KeyboardAvoidingView, Platform} from "react-native";

export default function ChatPage({ user }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, []);

    return (
        <>
            <GiftedChat
                user={user}
                messages={messages}
                renderUsernameOnMessage
                onSend={messages => onSend(messages)}
            />
            { Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" /> }
        </>
    );
};