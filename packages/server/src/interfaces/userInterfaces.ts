export interface IUserProfile {
  id: string;
  email: string;
  role: string;
  mfaEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPasswordChange {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}