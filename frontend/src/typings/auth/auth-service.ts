import { User } from "./auth";

export interface AuthResponse {
    user: User | null;
    access_token: string | null;
}