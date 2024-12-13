import { transactions } from "@/api/query/transactions/transactions-query";
import { createSlice } from "@reduxjs/toolkit";

interface TransactionState {
  data: {
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: string;
    total_amount: number;
    created_on: string;
  };

  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  data: {
    invoice_number: "",
    service_code: "",
    service_name: "",
    transaction_type: "",
    total_amount: 0,
    created_on: "",
  },
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(transactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(transactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { logout } = authSlice.actions;
export default paymentSlice.reducer;
