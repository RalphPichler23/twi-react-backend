import { create } from 'zustand';
import createUserSlice, { type UserSlice } from './createUserSlice';

type Store = UserSlice;

const useZustand = create<Store>((set, get, store) => ({
    ...createUserSlice(set, get, store),
}));

export { useZustand };