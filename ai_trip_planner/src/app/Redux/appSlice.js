const { createSlice } = require("@reduxjs/toolkit");

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        user: "null",
        formData: {
            location: "",
            numOfDays: "",
            budget: "",
            traveler: ""
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = action.payload
        },
    }
})


export const { setUser, setFormData } = appSlice.actions;

export default appSlice.reducer