import * as Yup from "yup";


const SignInValidation = Yup.object({
  userID: Yup.string()
    .trim()
    .required("Enter valid userID"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignUpValidationSchema = Yup.object({
  userName: Yup.string()
    .trim()
    .min(5, "Name must be at least 5 characters")
    .max(30, "User name must be at most 30 characters long")
    .required("Name is required"),

  userID: Yup
    .string()
    .trim()
    .required("Enter valid userID/email")
    .email('Please enter valid email')
    .max(254, 'Email cannot be exceed 254 characters')
    .transform((email) => email.toLowerCase()),

  phoneNumber: Yup.string()
    .min(10, "Phone Number must be of 10 digits")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, 'Password cannot exceed 128 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include letters, numbers, and special characters"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .required("Confirm the password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const BusinessDetailsSchemaValidation = Yup.object().shape({
  businessName: Yup.string()
    .trim()
    .required('Business Name is required')
    .min(5, 'Business Name must be at least 5 characters')
    .max(10, 'Business Name cannot exceed 10 characters'),

  ownerName: Yup.string()
    .trim()
    .required('Owner Name is required')
    .min(5, 'Owner Name must be at least 5 characters')
    .max(10, 'Owner Name cannot exceed 10 characters'),

  targetAudience: Yup.string()
    .trim()
    .notRequired()
    .max(30, 'Explanation cannot exceed 30 characters')
    .test(
      'min-length',
      'Explanation must be at least 10 characters',
      value => !value || value.length >= 10
    ),

  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Please enter a valid email')
    .max(254, 'Email cannot exceed 254 characters'),

  contactNumber: Yup.string()
    .required('Phone Number is required')
    .matches(
      /^[0-9]{10}$/,
      'Phone Number must contain exactly 10 digits'
    ),

  whatsappNumber: Yup.string()
    .notRequired()
    .test(
      'valid-phone',
      'WhatsApp Number must contain exactly 10 digits',
      value => !value || /^[0-9]{10}$/.test(value)
    ),

  sameAsContact: Yup.boolean(),

  address: Yup.object().shape({
    street: Yup.string().optional(),
    city: Yup.string().optional(),
    country: Yup.string().optional(),
    postalCode: Yup.string().optional(),
  }),

  socialLinks: Yup.object().shape({
    instagram: Yup.string()
      .url('Please enter a valid Instagram URL')
      .optional(),
    facebook: Yup.string()
      .url('Please enter a valid Instagram URL')
      .optional(),
    youtube: Yup.string()
      .url('Please enter a valid Instagram URL')
      .optional(),
  }),
});

type SignInFormData = Yup.InferType<typeof SignInValidation>;
type SignUpFormData = Yup.InferType<typeof SignInValidation>;
type BusinessValidationSchemaData = Yup.InferType<typeof BusinessDetailsSchemaValidation>;


export {
  SignInValidation,
  SignUpValidationSchema,
  BusinessDetailsSchemaValidation,
};

export type {
  SignInFormData,
  SignUpFormData,
  BusinessValidationSchemaData,
}