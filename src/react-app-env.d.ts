/// <reference types="react-scripts" />

type UserProfile = {
  email: string;
  name: string;
  nickname: string;
  picture: string;
  created_at: string;
  updated_at: string;
};

type UserType = {
  id: string;
  refreshTokens: string[];
  createdAt?: string;
  updatedAt?: string;
};

declare global {
  module "@mui/material/styles" {
    interface TypographyVariants {
      highLighted1: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
      highLighted1?: React.CSSProperties;
    }
  }

  // Update the Typography's variant prop options
  module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
      highLighted1: true;
    }
  }

  module "axios" {
    interface AxiosRequestConfig {
      withAuth?: boolean;
    }
  }
}
