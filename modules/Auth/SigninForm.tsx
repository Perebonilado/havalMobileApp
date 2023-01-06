import React, {useState, FC, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {TextInput, Text, Button} from 'react-native-paper';

import { useLoginMutation } from '../../config/features/api';

interface Props extends NativeStackScreenProps<any, any> {
    setIsExistingUser: React.Dispatch<React.SetStateAction<boolean>>
}

const SigninForm:FC<Props> = ({setIsExistingUser, navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [ login, { data, isLoading, isError, error}] = useLoginMutation()

  const handleLogin = () => {
    if(email && password) {
        login({email, password})
    }
  }

  useEffect(()=>{
    if(data) navigation.navigate("Home")
  },[data])

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
              <View>
                <TextInput
                  mode="outlined"
                  label={'Email'}
                  style={{marginBottom: 15}}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={text=>setEmail(text)}
                />
                <TextInput
                  mode="outlined"
                  label={'Password'}
                  secureTextEntry={true}
                  style={{marginBottom: 15}}
                  value={password}
                  onChangeText={text=>setPassword(text)}
                />
                <Button
                  mode="contained"
                  buttonColor="#000"
                  style={{marginBottom: 15}}
                  onPress={()=>{
                    handleLogin()
                    Keyboard.dismiss()
                }}
                  disabled={isLoading || !email || !password}
                  loading={isLoading}
                  >
                  Login
                </Button>
                <Text variant="bodyMedium" style={{textAlign: 'center'}}>
                  Don't have an account?{' '}
                </Text>
                <Button onPress={()=>setIsExistingUser(false)}>Create an account</Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SigninForm;
