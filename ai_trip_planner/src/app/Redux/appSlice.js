const { createSlice } = require("@reduxjs/toolkit");

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        user: null,
        formData: {
            location: "",
            numOfDays: "",
            budget: "",
            traveler: ""
        },
        alert: {
            openSnackbar: false,
            msg: "",
            type: ""
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setAlert: (state, action) => {
            state.alert = action.payload;
        }
    }
})


export const { setUser, setFormData, setAlert } = appSlice.actions;

export default appSlice.reducer