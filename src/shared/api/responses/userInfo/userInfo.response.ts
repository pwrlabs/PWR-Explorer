export interface UserInfoResponse {
    user: {
      address: string;
      name: string;
      bio: string;
      websiteUrl: string;
      twitterUrl: string;
      linkedInUrl: string;
      telegramUrl: string;
    };
  }
  export interface UserImageErrorResponse {
    message: string;
  }