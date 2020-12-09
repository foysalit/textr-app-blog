import {Mongo} from '@meteorrn/core';
import { IMessage } from 'react-native-gifted-chat';

export interface Message extends IMessage {
    text: string;
    userId: string;
}

export const MessagesCollection = new Mongo.Collection('messages');
