
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
    BusinessValidationSchemaData,
    ProjectDetailsData,
    WebsiteRequirementSchemaValidationData,
    WebsiteStylePreferencesSchemaValidationData,
} from "../../schema/validationSchema";


// interface AssetsRequirementsData {
//     assets: {
//         id: string;
//         name: string;
//         size: number;
//         type: string;
//         notes?: string;
//     }[];

//     filesInfo?: string;
// }

export interface AssetFileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface UploadedAssetItem {
  id: string;
  name: string;
  size: number;
  type: string;
  notes: string;
}

interface AssetsRequirementsData {
  brandLogo: AssetFileMetadata | null;

  assets: UploadedAssetItem[];

  filesInfo: string;
}

interface WebsiteCreationState {
    businessDetails: BusinessValidationSchemaData | null;
    projectDetails: ProjectDetailsData | null;
    websiteRequirements: WebsiteRequirementSchemaValidationData | null;
    assetsRequirements: AssetsRequirementsData | null;
    websiteStylePreferences: WebsiteStylePreferencesSchemaValidationData | null;
}


const initialState: WebsiteCreationState = {
    businessDetails: {
        businessName: "",
        ownerName: "",
        targetAudience: "",
        email: "",
        contactNumber: "",
        whatsappNumber: "",
        sameAsContact: false,
        address: {
            street: "",
            city: "",
            state: "",
            country: "",
            postalCode: ""
        },
        socialLinks: {
            instagram: "",
            facebook: "",
            youtube: "",
        }
    },
    projectDetails: {
        websiteType: '',
        customWebsiteType: '',
        websiteDescription: '',
        referenceWebsite: '',
    },
    websiteRequirements: {
        pages: [
            {
                id: 'home-initial',
                name: 'Home',
                purpose: '',
            },
        ],
    },
    assetsRequirements: null,
    websiteStylePreferences: {
        design: {
            visualStyle: 'modern',
            designSystem: 'none',
            primaryColor: '#4F46E5',
            secondaryColor: '#F8FAFC',
            fontPreference: '',
            referenceWebsites: [],
        },
    },
};


const websiteCreationSlice = createSlice({
    name: "websiteCreation",

    initialState,

    reducers: {
        setBusinessDetails: (
            state,
            action: PayloadAction<BusinessValidationSchemaData>
        ) => {
            state.businessDetails = action.payload;
        },

        setProjectDetails: (
            state,
            action: PayloadAction<ProjectDetailsData>
        ) => {
            state.projectDetails = action.payload;
        },

        setWebsiteRequirements: (
            state,
            action: PayloadAction<WebsiteRequirementSchemaValidationData>
        ) => {
            state.websiteRequirements = action.payload;
        },

        setAssetsRequirements: (
            state,
            action: PayloadAction<AssetsRequirementsData>
        ) => {
            state.assetsRequirements = action.payload;
        },

        setWebsiteStylePreferences: (
            state,
            action: PayloadAction<WebsiteStylePreferencesSchemaValidationData>
        ) => {
            state.websiteStylePreferences = action.payload;
        },

        resetWebsiteCreation: () => initialState,
    },
});


export const {
    setBusinessDetails,
    setProjectDetails,
    setWebsiteRequirements,
    setAssetsRequirements,
    setWebsiteStylePreferences,
    resetWebsiteCreation,
} = websiteCreationSlice.actions;


export default websiteCreationSlice.reducer;

export type { WebsiteCreationState };
