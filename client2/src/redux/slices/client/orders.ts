import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getUserData } from "./authSession";
import { resetCart } from "../cart";
import i18next from "i18next";
import { axiosPoster } from "@/utils/requests";
import { RootState } from "@/redux/store/store";

const initialState = {
  orders: [],
};

export const postClientOrder = createAsyncThunk(
  "client/postClientOrder",
  async (data, { dispatch, getState }) => {
    const state = getState() as RootState;
    const id = state.client.authSession.session.current.id;
    try {
      await axiosPoster({
        url: `orders`,
        body: data,
        headers: {
          userid: id,
        },
      });

      await dispatch(getUserData(id));
      await dispatch(resetCart());
      return;
    } catch (error) {
      console.error("postClientOrder error", error);
      throw error;
    }
  }
);

//-------------------- SLICE -------------------//

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    //--------------------
    //SET ORDERS
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postClientOrder.fulfilled, () => {
        let trad = i18next?.language == "en" ? "Order loaded" : "Orden cargada";
        toast.success(trad);
      })
      .addCase(postClientOrder.rejected, () => {
        toast.error("action.payload");
      });
  },
});

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
