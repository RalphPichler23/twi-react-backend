import type { IUser } from "@utils/types";
import type { StateCreator } from 'zustand';

export interface UserState {
    user: IUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthLoading: boolean;
}

export interface UserActions {
    setUser: (user: IUser | null) => void;
    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
    setAuthLoading: (loading: boolean) => void;
    resetUserState: () => void;
}

export type UserSlice = UserState & UserActions;

const defaultState: UserState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthLoading: true,
};

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
    ...defaultState,
    setUser: (user) => set({ user }),
    setAccessToken: (token) => set({ accessToken: token }),
    setRefreshToken: (token) => set({ refreshToken: token }),
    setAuthLoading: (loading) => set({ isAuthLoading: loading }),
    resetUserState: () => set(defaultState),
});

export default createUserSlice;