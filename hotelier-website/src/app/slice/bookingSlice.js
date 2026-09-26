import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const getCookieData = (cookieName) => {

    const cookieValue = Cookies.get(cookieName);

    if (
        !cookieValue ||
        cookieValue === "undefined" ||
        cookieValue === "null"
    ) {
        return null;
    }

    try {
        return JSON.parse(cookieValue);
    } catch (error) {

        Cookies.remove(cookieName);

        return null;
    }

};


const initialState = {

    // Selected room already contains hotel_id
    selectedRoom: getCookieData("selectedRoom"),

};


export const bookingSlice = createSlice({

    name: "booking",

    initialState,

    reducers: {

        setSelectedRoom: (state, action) => {

            state.selectedRoom = action.payload;

            Cookies.set(
                "selectedRoom",
                JSON.stringify(action.payload)
            );

        },


        removeSelectedRoom: (state) => {

            state.selectedRoom = null;

            Cookies.remove("selectedRoom");

        },


        clearBooking: (state) => {

            state.selectedRoom = null;

            Cookies.remove("selectedRoom");

        }

    }

});


export const {

    setSelectedRoom,
    removeSelectedRoom,
    clearBooking

} = bookingSlice.actions;


export default bookingSlice.reducer;