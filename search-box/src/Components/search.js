import React, { useEffect, useState } from 'react'




const Search = () => {

    const [searchedText, setSearchedText] = useState("")
    const [searchedList, setSearchdlist] =useState([])
    const list1 = ["Maruti",
        "Tata",
        "Honda",
        "Volkswagen",
        "Ford",
        "Audi",
        "Toyota",
        "Mahindra",
        "Hyundai",
        "Tata Motors" ]

        useEffect(() => { if(searchedText.length >= 3 ){
            const filtredArray = list1.filter(carName => carName.includes(searchedText))
            setSearchdlist(filtredArray)
        }else{setSearchdlist([])}
}, [searchedText])
    


    const handleChange = (event) => {
        
        setSearchedText(event.target.value)
       
    }
     console.log(searchedText)

  return (
    <div style={{marginBottom:"300px"}}>
        <input placeholder='search' type='text' value={searchedText} onChange={handleChange}/>
        {searchedList.map(carName => <div> {carName} </div>)}

    </div>
  )
}

export default Search