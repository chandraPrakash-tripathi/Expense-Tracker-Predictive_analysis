import { UserState } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: UserState={

    
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,

}

const userSlice  =createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser: (state, action : PayloadAction<UserState['user']>)=>{
            state.user = action.payload,
            state.isAuthenticated = !!action.payload
            state.loading = false
            state.error = null
        },
        setLoading:(state, action : PayloadAction<boolean>)=>{
            state.loading = action.payload

        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
          },
          clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
          },

    }

})

export const {setUser, setLoading, setError, clearUser} = userSlice.actions;
export default userSlice.reducer;