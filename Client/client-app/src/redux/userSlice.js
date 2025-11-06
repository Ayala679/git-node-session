import { createSlice } from '@reduxjs/toolkit'
const initValue = {
    role: {}
}

const userSlice = createSlice({
    name: "role",
    initialState: initValue,
    reducers: {
        setRole: (state, action) => 
        {
            state.role = action.payload
        },
        clearRole: (state, action) =>{
            state.role = {}
        }
    }
})
export const {setRole,clearRole} = userSlice.actions
export default userSlice.reducer