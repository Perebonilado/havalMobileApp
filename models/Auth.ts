import * as Yup from 'yup';

export const SignInValidations = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('required'),
  password: Yup.string().required('required'),
});

export const SignUpValidations = Yup.object({
  firstName: Yup.string().required('required'),
  lastName: Yup.string().required('required'),
  username: Yup.string().required('required'),
  password: Yup.string().required('required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('required'),
});
