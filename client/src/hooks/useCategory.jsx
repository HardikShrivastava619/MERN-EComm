import { useState,useEffect } from "react";


export default function useCategory(){
    const [categories , setCategories] = useState([])


//get cat

const getCategories = async () =>{
    try {
        const res = await fetch (`http://localhost:8080/get-category`)
 const data= await res.json()
 setCategories(data?.category)
 
    } catch (error) {
        console.log(error)
        
    }
}




useEffect(()=>{
    getCategories()

} , [] )



return categories

}