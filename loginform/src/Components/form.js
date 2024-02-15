import React, { useState } from 'react'







const Form = () => {

  const [submitted, setSubmitted ] = useState(false)
 const [namecheck, setCheckName] =useState({
    "name": '',
    "email": '',
    "password": ''  
 })

 let handlechange = (e) =>{
   
  
    const{name, value} = e.target;
    setCheckName({

        ...namecheck,
        [name]: value,
    })

   
}


let handleSubmit = (e) => {
      e.preventDefault()
   
    console.log(namecheck)
    
     for(const key in namecheck){
        console.log(key)
        if(namecheck[key] == '' ){
           setSubmitted(true)
        }

        
     }
}

  return (
    <div className='body'>
      <div className='formbody'>
      <form>
    
     <div className="form-group">
     
   
    <input type="text" className="form-control" id="exampleInputLname" name='name' value={namecheck.name}  placeholder="Enter full name" onChange={handlechange} ></input>
    
     </div>
     {submitted ?<span style={{backgroundColor: "red" }}> "error: name is not entered".</span> : null }


    <div className="form-group">

     <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={namecheck.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={handlechange} ></input>
    </div>
    {submitted ?<span style={{backgroundColor: "red" }}> "error: name is not entered".</span> : null }
    
    <div className="form-group">
   
     <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={namecheck.password} placeholder="Password" onChange={handlechange}></input>
     </div>
     {submitted ?<span style={{backgroundColor: "red" }}> "error: name is not entered".</span> : null }

     

 
    

  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" ></input>
    <span>Remeber me ?</span>
   
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
</form>
      </div>
    </div>
  )
}

export default Form