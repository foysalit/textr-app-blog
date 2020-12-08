import React, {useCallback} from 'react';
import Meteor, {withTracker, Mongo} from '@meteorrn/core';
import { GiftedChat } from 'react-native-gifted-chat';
import {KeyboardAvoidingView, Platform} from "react-native";

const MessagesCollection = new Mongo.Collection('messages');

function ChatPage({ user, messages }) {
    const onSend = useCallback((allMessages = []) => {
        Meteor.call('messages.add', allMessages.slice(-1)?.[0]?.text);
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

export default withTracker(() => {
    const messagesReady = Meteor.subscribe('messages').ready();
    const messages = MessagesCollection.find().fetch().map(message => ({
        ...message,
        user: Meteor.users.findOne(message.userId)
    }));
    return {loading: !messagesReady, messages};
})(ChatPage);