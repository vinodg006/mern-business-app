import { Users } from "typings/src/model/auth.d";

export interface AuthSlice {
  user: User | null;
  token: string | null;
}
