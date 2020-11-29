import { Div, Text, Button, Input } from 'react-native-magnus';
import React from 'react';
import {KeyboardAvoidingView} from "react-native";

import {useAuthForm} from "./use-auth-form";

export default function AuthPage({ setUser }) {
    const {
        error,
        email,
        form,
        username,
        password,
        callingApi,
        handleLogin,
        handleSignup,
        toggleFormType,
        handleEmailInput,
        handleUsernameInput,
        handlePasswordInput
    } = useAuthForm(setUser);
    return (
        <KeyboardAvoidingView behavior={'padding'}>
            <Div px="lg" bg="white">
                <Text
                    fontSize="4xl"
                    textAlign="center"
                    fontWeight="bold">
                    Textr
                </Text>
                <Div mt="md" pt="xl">
                    <Text fontSize="md" mb="sm">Email</Text>
                    <Input
                        rounded="sm"
                        bg="gray200"
                        value={email}
                        editable={!callingApi}
                        autoCompleteType="email"
                        keyboardType="email-address"
                        borderWidth={0}
                        onChangeText={handleEmailInput}
                    />
                </Div>
                {form === 'signup' && <Div mt="md">
                    <Text fontSize="md" mb="sm">Username</Text>
                    <Input
                        bg="gray200"
                        rounded="sm"
                        value={username}
                        editable={!callingApi}
                        borderWidth={0}
                        onChangeText={handleUsernameInput}
                    />
                </Div>}
                <Div mt="md">
                    <Text fontSize="md" mb="sm">Password</Text>
                    <Input
                        bg="gray200"
                        secureTextEntry
                        rounded="sm"
                        value={password}
                        editable={!callingApi}
                        borderWidth={0}
                        onChangeText={handlePasswordInput}
                    />
                </Div>
                {!!error && (
                    <Text
                        color="red600"
                        py="lg">
                        {error}
                    </Text>
                )}
                <Button
                    block
                    py="lg"
                    mt="xl"
                    bg="gray500"
                    loading={callingApi}
                    onPress={form === 'signup' ? handleSignup : handleLogin}>
                    {form === 'signup' ? 'Sign up' : 'Login'}
                </Button>
                <Div alignItems="center" pt="lg">
                    <Text>
                        {
                            form === 'signup'
                                ? 'Already have an account?'
                                : "Don't have an account?"
                        }
                    </Text>
                    <Button
                        onPress={toggleFormType}
                        bg="transparent"
                        color="gray700"
                        block>

                        {
                            form === 'signup'
                                ? 'Click here to login'
                                : 'Click here to signup'
                        }
                    </Button>
                </Div>
            </Div>
        </KeyboardAvoidingView>
    );
}