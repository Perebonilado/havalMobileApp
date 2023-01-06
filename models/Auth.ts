import * as Yup from 'yup';

export const SignInValidations = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('required'),
  password: Yup.string().required('required'),
});
