import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
import { searchSliceAction } from "../../store/SearchSlice"

const SearchInput = () => {

const navigate = useNavigate()

const searchData = useSelector(store=> store.searchData)
const dispatch = useDispatch()

const handleSubmit = async(e)=>{
    e.preventDefault()
     try {
        const res =  await fetch(`https://onestmern-ecommerce-12.onrender.com/search/${searchData.keyword}`)
        const data = await res.json()
              
              
dispatch(searchSliceAction.searchedResults(data))
navigate("/search")
}catch(error){
console.log(error)}}



  return (
    <div  style={{width:"24rem" ,border:'none' }} >

<form className="d-flex" role="search" onSubmit={handleSubmit} >

<input type="search" className="form-control me-2" placeholder="Search" aria-label="Search"  onChange={(e)=> dispatch(searchSliceAction.searchedkeyword(e.target.value))  }     />
<button  className="btn btn-outline-success" type="submit" > Search  </button>
</form>

    </div>
  )
}

export default SearchInput