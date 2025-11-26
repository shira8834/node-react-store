import {createSlice} from "@reduxjs/toolkit"


const countInitState={
    userName:"",
    name:"",
    password:"",
    email:"",
    phone:"",
    roles:"",


}

const counterSlice=createSlice({
    name:"counter",
    initialState:countInitState,
    reducers:{
        addOne: (state)=>{
            state.count+=1
        },
        minusOne: (state)=>{
            state.count-=1
        },
        addValue:(state,action)=>{
            state.count+=Number(action.payload)
        },
        reset:(state)=>{
            state.count=0
        },
        setNumber:(state)=>{
            state.number=8
        }

    }
})

export const {addOne,minusOne,addValue,reset,setNumber} = counterSlice.actions
export default counterSlice.reducer