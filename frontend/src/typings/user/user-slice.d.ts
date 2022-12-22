import { Users } from "typings/src/model/user.d";

export interface UserSlice {
  users: Users | null;
  loadingUsers: boolean;
  errorUsers: string | null;
}
