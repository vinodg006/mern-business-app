export interface UserPreferences {
  notifications: boolean,
  theme: string
}

export interface User {
  tenantId: string,
  name: string,
  email: string,
  role: string,
  preferences: UserPreferences,
  status: string,
}

export type Users = User[];
