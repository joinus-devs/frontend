import { create } from "zustand";

interface UserInfo {
  userName: string;
  userProfile: string;
  setUserName: (value: string) => void;
  setUserProfile: (value: string) => void;
}

const userStore = create<UserInfo>((set) => ({
  userName: "",
  userProfile: "",
  setUserName: (value) => set({ userName: value }),
  setUserProfile: (value) => set({ userProfile: value }),
}));

export default userStore;
