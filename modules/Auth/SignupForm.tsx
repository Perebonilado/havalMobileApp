import React, {useState, FC, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {TextInput, Text, Button} from 'react-native-paper';

import {useSignupMutation} from '../../config/features/api';

interface Props extends NativeStackScreenProps<any, any> {
  setIsExistingUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupForm: FC<Props> = ({setIsExistingUser, navigation, route}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          padding: 10,
          backgroundColor: '#fff',
        }}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={{padding: 10}}>
              <Text
                variant="headlineSmall"
                style={{marginBottom: 20, textAlign: 'center'}}>
                Create a Haval account
              </Text>

              <Text variant="bodyMedium">First name</Text>
              <TextInput
                label={'Enter first name'}
                mode="outlined"
                style={{marginBottom: 15}}
              />

              <Text variant="bodyMedium">Last name</Text>
              <TextInput
                label={'Enter last name'}
                mode="outlined"
                style={{marginBottom: 15}}
              />

              <Text variant="bodyMedium">Username</Text>
              <TextInput
                label={'Enter username'}
                mode="outlined"
                style={{marginBottom: 15}}
              />

              <Text variant="bodyMedium">Email</Text>
              <TextInput
                keyboardType='email-address'
                label={'Enter a valid email address'}
                mode="outlined"
                style={{marginBottom: 15}}
              />

              <Text variant="bodyMedium">Password</Text>
              <TextInput
                label={'Enter a password'}
                mode="outlined"
                secureTextEntry={true}
                style={{marginBottom: 15}}
              />

              <Button mode="outlined" style={{marginBottom: 10}}>
                Create Account
              </Button>

              <Text style={{textAlign: 'center'}}>
                Already have an account?
              </Text>
              <Button onPress={() => setIsExistingUser(true)}>Login</Button>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignupForm;
