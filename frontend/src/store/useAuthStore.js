import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ isCheckAuth: false });
    }
  },
}));
