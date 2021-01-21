import React from "react";
import Constants from 'expo-constants';
import {Alert, Platform} from "react-native";
import * as Notifications from 'expo-notifications';
import {Button, Div, Icon} from "react-native-magnus";
import Meteor, {withTracker} from '@meteorrn/core';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const registerForPushNotification = async () => {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Alert.alert('Something went wrong!', 'Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        Meteor.call('messages.notifications.register', token, (err: any) => {
            Alert.alert(
                err ? 'Something went wrong!' : 'Push notification enabled',
                err ? err.message : 'Press the notification icon any time to disable push notification'
            );
        });
    } else {
        Alert.alert('Something went wrong!', 'Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const enablePushNotification = () => {
    Alert.alert(
        "Enable Notification",
        "You will receive push notification for every new message in group chat. Are you sure you want to enable push notification?",
        [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Yes, Enable", onPress: () => registerForPushNotification() }
        ],
        { cancelable: false }
    );
};

const disablePushNotification = () => {
    Alert.alert(
        "Disable Notification",
        "You will stop receiving push notification from textr. Are you sure you want to disable push notification?",
        [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Yes, Disable",
                onPress: () => Meteor.call('messages.notifications.disable', (err) => {
                    Alert.alert(
                        err ? 'Something went wrong!' : 'Push notification disabled',
                        err ? err.message : 'Press the notification icon any time to re-enable push notification'
                    );
                })
            }
        ],
        { cancelable: false }
    );
};

const NotificationSetting = ({hasEnabledPushNotification = false}) => {
    console.log({hasEnabledPushNotification});
  return (
      <Div row justifyContent="flex-end">
          <Button
              bg="white"
              borderless
              h={40}
              w={40}
              rounded="circle"
              alignSelf="center"
              onPress={hasEnabledPushNotification ? disablePushNotification : enablePushNotification}
          >
              <Icon
                  rounded="circle"
                  name={hasEnabledPushNotification ? "ios-notifications-off" : "ios-notifications"}
                  fontSize="4xl"
                  fontFamily="Ionicons"
              />
          </Button>
      </Div>
  );
};


export default withTracker(() => {
    const user = Meteor.user();
    return {hasEnabledPushNotification: user?.profile?.enablePushNotification};
})(NotificationSetting);