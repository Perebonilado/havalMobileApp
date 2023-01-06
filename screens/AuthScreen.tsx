import React, {FC, useState} from 'react';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import SigninForm from '../modules/Auth/SigninForm';
import SignupForm from '../modules/Auth/SignupForm';

const AuthScreen: FC<NativeStackScreenProps<any, any>> = ({
  navigation,
  route,
}) => {
  const [isExistingUser, setIsExistingUser] = useState<boolean>(true);
  const props = {
    setIsExistingUser,
    navigation,
    route,
  };

  return isExistingUser ? (
    <SigninForm {...props}/>
  ) : (
    <SignupForm {...props}/>
  );
};

export default AuthScreen;
