import React, {useCallback} from 'react';
import Meteor, {withTracker} from '@meteorrn/core';
import { GiftedChat, User } from 'react-native-gifted-chat';
import {KeyboardAvoidingView, Platform} from "react-native";
import {Message, MessagesCollection} from "./messages";

type ChatPageProps = {
    user: User,
    messages: Message[]
}

function ChatPage({ user, messages }: ChatPageProps) {
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
    const user = Meteor.user();
    const messagesReady = Meteor.subscribe('messages').ready();
    const messages = MessagesCollection.find({}, {sort: {createdAt: -1}}).fetch().map(message => {
        const user = Meteor.users.findOne(message.userId);
        return {
            ...message,
            user: {name: user.username, _id: user._id}
        };
    });
    return {loading: !messagesReady, messages, user};
})(ChatPage);