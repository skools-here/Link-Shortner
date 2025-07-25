import axios from "axios"

export const handleOnClick=async (inputValue:string)=>{
    const res=await axios.post(`${window.location.origin}/api`,{
        inputValue,
    });
    const shortendUrl=res.data.shortendUrl
    return shortendUrl
}