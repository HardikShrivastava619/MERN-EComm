
const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <form  onSubmit={handleSubmit} > 
    
    <div>
    
<input type="text"  value={value}   placeholder="Enter New Category "    className="form-control"   onChange={(e)=> [ setValue(e.target.value) , ...value  ]  } />


        </div>

<button  style={{margin:"1rem"}} type="submit" className="btn btn-primary" > Submit  </button>

      </form>
        
  
  
  )
}

export default CategoryForm