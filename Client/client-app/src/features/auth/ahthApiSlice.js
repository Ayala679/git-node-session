import apiSlice from "../../app/apiSlice;"

const authApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        registerFunc:build.mutation({
            query:(regsiterUser)=>({
                url:"/api/register",
                method:"POST",
                body:regsiterUser
            })
        }),
        login:build.mutation({
            query:(loginUser)=>({
                url:"/api/login",
                method:"POST",
                body:loginUser
            }),
            
        })
    })

})


export const {useRegisterFuncMutation,useLoginMutation}=authApiSlice;