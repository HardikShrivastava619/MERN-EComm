import { useState,useEffect } from "react";


export default function useCategory(){
    const [categories , setCategories] = useState([])


//get cat

const getCategories = async () =>{
    try {
        const res = await fetch (`https://onestmern-ecommerce-8.onrender.com/get-category`)
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