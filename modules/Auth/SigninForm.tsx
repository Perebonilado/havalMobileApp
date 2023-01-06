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

import {Formik} from 'formik';

import {useLoginMutation} from '../../config/features/api';
import {SignInValidations} from '../../models/Auth';

interface Props extends NativeStackScreenProps<any, any> {
  setIsExistingUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
  email: '',
  password: '',
};

const SigninForm: FC<Props> = ({setIsExistingUser, navigation}) => {
  const [login, {data, isLoading, isError, error}] = useLoginMutation();

  const handleLogin = (values: typeof initialValues) => {
    const {email, password} = values;
    login({email, password});
  };

  useEffect(() => {
    if (data) navigation.navigate('Home');
  }, [data]);

  const formik = {
    initialValues: initialValues,
    onSubmit: (values: typeof initialValues) => handleLogin(values),
    validationSchema: SignInValidations,
  };

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
            <View>
              <View style={{marginBottom: 35}}>
                <Text
                  variant="displaySmall"
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    marginBottom: 20,
                  }}>
                  Login to Haval
                </Text>
                <Image
                  source={require('../../assets/auth/login.png')}
                  style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'cover',
                    alignSelf: 'center',
                  }}
                />
              </View>
              <Formik {...formik}>
                {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                  <View>
                    <Text variant="bodyLarge">Email</Text>
                    <TextInput
                      mode="outlined"
                      label={'Enter a valid email address'}
                      style={{marginBottom: 15}}
                      keyboardType="email-address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      error={Boolean(errors.email)}
                    />

                    <Text variant="bodyLarge">Password</Text>
                    <TextInput
                      mode="outlined"
                      label={'Enter password'}
                      secureTextEntry={true}
                      style={{marginBottom: 15}}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      error={Boolean(errors.password)}
                    />
                    <Button
                      mode="contained"
                      buttonColor="#000"
                      style={{marginBottom: 15}}
                      onPress={() => {
                        handleSubmit();
                        Keyboard.dismiss();
                      }}
                      disabled={isLoading}
                      loading={isLoading}>
                      Login
                    </Button>
                    <Text variant="bodyMedium" style={{textAlign: 'center'}}>
                      Don't have an account?{' '}
                    </Text>
                    <Button onPress={() => setIsExistingUser(false)}>
                      Create an account
                    </Button>
                  </View>
                )}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SigninForm;
