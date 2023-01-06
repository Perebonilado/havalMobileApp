import React, {FC, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {TextInput, Text, Button} from 'react-native-paper';

import {Formik} from 'formik';

import {useSignupMutation} from '../../config/features/api';
import {SignUpValidations} from '../../models/Auth';

interface Props extends NativeStackScreenProps<any, any> {
  setIsExistingUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
};

const SignupForm: FC<Props> = ({setIsExistingUser, navigation, route}) => {
  const [signup, {data, isLoading, isError, error}] = useSignupMutation();

  const handleSubmit = (values: typeof initialValues) => {
    signup({...values, isMerchant: false});
  };

  const formik = {
    initialValues: initialValues,
    onSubmit: (values: typeof initialValues) => handleSubmit(values),
    validationSchema: SignUpValidations,
  };

  useEffect(() => {
    if (data) navigation.navigate('Home');
  }, [data]);

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
            <Formik {...formik}>
              {({handleChange, handleBlur, handleSubmit, values, errors}) => (
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
                    onChangeText={handleChange('firstName')}
                    error={Boolean(errors.firstName)}
                  />

                  <Text variant="bodyMedium">Last name</Text>
                  <TextInput
                    label={'Enter last name'}
                    mode="outlined"
                    style={{marginBottom: 15}}
                    onChangeText={handleChange('lastName')}
                    error={Boolean(errors.lastName)}
                  />

                  <Text variant="bodyMedium">Username</Text>
                  <TextInput
                    label={'Enter username'}
                    mode="outlined"
                    style={{marginBottom: 15}}
                    onChangeText={handleChange('username')}
                    error={Boolean(errors.username)}
                  />

                  <Text variant="bodyMedium">Email</Text>
                  <TextInput
                    keyboardType="email-address"
                    label={'Enter a valid email address'}
                    mode="outlined"
                    style={{marginBottom: 15}}
                    onChangeText={handleChange('email')}
                    error={Boolean(errors.email)}
                  />

                  <Text variant="bodyMedium">Password</Text>
                  <TextInput
                    label={'Enter a password'}
                    mode="outlined"
                    secureTextEntry={true}
                    style={{marginBottom: 15}}
                    onChangeText={handleChange('password')}
                    error={Boolean(errors.password)}
                  />

                  <Button
                    mode="outlined"
                    onPress={() => {
                      handleSubmit();
                      Keyboard.dismiss();
                    }}
                    loading={isLoading}
                    disabled={isLoading}
                    style={{marginBottom: 10}}>
                    Create Account
                  </Button>

                  <Text style={{textAlign: 'center'}}>
                    Already have an account?
                  </Text>
                  <Button onPress={() => setIsExistingUser(true)}>Login</Button>
                </View>
              )}
            </Formik>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignupForm;
