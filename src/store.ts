import { configureStore, Middleware } from "@reduxjs/toolkit";
import authReducer from "./state/auth/authSlice";
import servicesReducer from "./state/dashboard/services/servicesSlice";
import balanceReducer from "./state/dashboard/balance/balanceSlice";
import bannerReducer from "./state/dashboard/banner/bannerSlice";
import profileReducer from "./state/dashboard/profile/profileSlice";
import topUpReducer from "./state/dashboard/topUp/topUpSlice";
import paymentReducer from "./state/dashboard/payment/paymentSlice";
import transactionsReducer from "./state/dashboard/transactions-history/transactionHistorySlice";

const asyncDispatchMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};
export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    balance: balanceReducer,
    banner: bannerReducer,
    profile: profileReducer,
    topUp: topUpReducer,
    payment: paymentReducer,
    history: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncDispatchMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
