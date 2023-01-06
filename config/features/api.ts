import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {HAVAL_BASE_URI} from '@env';
import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from '../../types/Auth';

export const api = createApi({
  reducerPath: 'haval-api',
  baseQuery: fetchBaseQuery({
    baseUrl: HAVAL_BASE_URI,
  }),
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: payload => ({
        url: 'auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: payload => ({
        url: 'auth/signup',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {useLoginMutation, useSignupMutation} = api;
