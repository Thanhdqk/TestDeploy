import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { setLoading } from './LoadingReducer';

const initialState = {
  ListProductThisWeek: [],
  ListProductTopSale: [],
  ListProductDiscount: [],
  ListProductSearch: [],
  PopupList: []
}

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {

    ListProductThisWeek: (state, action) => {
      state.ListProductThisWeek = action.payload
    },
    ListProductTopSale: (state, action) => {
      state.ListProductTopSale = action.payload
    },
    ListProductDiscount: (state, action) => {
      state.ListProductDiscount = action.payload
    },
    ListProductSearch: (state, action) => {
      state.ListProductSearch = action.payload
    },
    PopupList1: (state, action) => {
      state.PopupList = action.payload
    }

  }
});

export const { ListProductThisWeek, ListProductTopSale, ListProductDiscount, ListProductSearch ,PopupList1} = productReducer.actions

export default productReducer.reducer

export const Call_API_Products = () => {

  return async (dispatch) => {

    try {
      const turnonloading = setLoading('block');
      dispatch(turnonloading)
      const [ListProductThisWeekAPI, ListProductTopSaleAPI, PopupList, ListProductDiscountAPI] = await Promise.all([
        axios({ url: 'http://localhost:8080/FindProductThisWeek', method: 'GET' }),
        axios({ url: 'http://localhost:8080/FindBySanPhamTopSellByMonth', method: 'GET' }),
        axios({ url: 'http://localhost:8080/api/popup/FindAllPopUp', method: 'GET' }),
        axios({ url: 'http://localhost:8080/FindProductThisWeekTOP100', method: 'GET' })
      ]);

      // const ListProductThisWeek = await axios({url:'',method:'GET'});

      // const ListProductTopSale = await axios({url:'',method:'GET'});

      // const ListProductDiscount = await axios({url:'',method:'GET'});

      const API_ListProductThisWeek = ListProductThisWeek(ListProductThisWeekAPI.data);

      const API_ListProductTopSale = ListProductTopSale(ListProductTopSaleAPI.data);

      const API_ListProductDiscount = ListProductDiscount(ListProductDiscountAPI.data);
      const API_ListPopup = PopupList1(PopupList.data);

      dispatch(API_ListProductThisWeek);
      dispatch(API_ListProductTopSale);
      dispatch(API_ListProductDiscount);
      dispatch(API_ListPopup);

      // tắt loading
      const turnoffloading = setLoading('none');
      dispatch(turnoffloading);
    } catch (error) {

    }

  }


}