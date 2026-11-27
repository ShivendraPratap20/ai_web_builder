import * as Yup from "yup";
import { isImageFile } from "../utils";

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
    state: Yup.string().optional(),
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

const ProjectDetailsSchemaValidation = Yup.object({
  websiteType: Yup.string()
    .required('Please select a website type'),

  customWebsiteType: Yup.string()
    .when('websiteType', {
      is: 'custom',
      then: (schema) =>
        schema
          .trim()
          .min(10, 'Please enter at least 10 characters')
          .required('Please specify your custom website type'),
      otherwise: (schema) => schema.notRequired(),
    }),

  websiteDescription: Yup.string()
    .trim()
    .min(20, 'Please provide at least 20 characters describing your website goals')
    .required('Website description is required'),

  referenceWebsite: Yup.string().notRequired(),
});

const WebsiteRequirementSchemaValidation = Yup.object({
  pages: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required(),
        name: Yup.string().trim().required('Page name is required'),
        purpose: Yup.string().trim().required('Page purpose is required'),
      })
    )
    .min(1, 'Please add at least one page to generate'),
});

const AssetsRequirementSchemaValidation = Yup.object({
  brandLogo: Yup.mixed<File>()
    .nullable()
    .test(
      'is-valid-image',
      'Brand logo must be a valid picture format (PNG, JPG, WEBP, SVG, GIF, etc.)',
      (value) => !value || isImageFile(value)
    ),
  assets: Yup.array().of(
    Yup.object({
      id: Yup.string().required(),
      name: Yup.string().required(),
      size: Yup.number().required(),
      type: Yup.string().required(),
      notes: Yup.string(),
    })
  ),
  filesInfo: Yup.string().trim(),
});

const WebsiteStylePreferencesSchemaValidation = Yup.object({
  design: Yup.object({
    visualStyle: Yup.string()
      .oneOf([
        'minimal',
        'professional',
        'modern',
        'creative',
        'luxury',
        'playful',
        'custom',
      ])
      .required('Please select a visual style'),
    designSystem: Yup.string()
      .oneOf(['material-ui', 'neumorphism', 'claymorphism', 'none'])
      .optional(),
    primaryColor: Yup.string()
      .trim()
      .matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, 'Use a valid hex color (e.g., #4F46E5)')
      .optional(),
    secondaryColor: Yup.string()
      .trim()
      .matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, 'Use a valid hex color (e.g., #F8FAFC)')
      .optional(),
    fontPreference: Yup.string().trim().optional(),
    referenceWebsites: Yup.array().of(Yup.string().trim()).optional(),
  }),
});

type SignInFormData = Yup.InferType<typeof SignInValidation>;
type SignUpFormData = Yup.InferType<typeof SignInValidation>;
type BusinessValidationSchemaData = Yup.InferType<typeof BusinessDetailsSchemaValidation>;
type ProjectDetailsData = Yup.InferType<typeof ProjectDetailsSchemaValidation>;
type WebsiteRequirementSchemaValidationData = Yup.InferType<typeof WebsiteRequirementSchemaValidation>;
type AssetsRequirementSchemaValidationData = Yup.InferType<typeof AssetsRequirementSchemaValidation>;
type WebsiteStylePreferencesSchemaValidationData = Yup.InferType<typeof WebsiteStylePreferencesSchemaValidation>;




export {
  SignInValidation,
  SignUpValidationSchema,
  BusinessDetailsSchemaValidation,
  ProjectDetailsSchemaValidation,
  WebsiteRequirementSchemaValidation,
  AssetsRequirementSchemaValidation,
  WebsiteStylePreferencesSchemaValidation,
};

export type {
  SignInFormData,
  SignUpFormData,
  BusinessValidationSchemaData,
  ProjectDetailsData,
  WebsiteRequirementSchemaValidationData,
  AssetsRequirementSchemaValidationData,
  WebsiteStylePreferencesSchemaValidationData,
}