import React from "react"

import { useState } from 'react';
import Spreadsheet from "react-spreadsheet";



const Mainsheet = () => {
    
    const generateEmptyData = (rows, columns) => {
       return Array.from({ length: rows }, () => Array.from({ length:   columns }, () => ""));

    }
    console.log()
        
    
      const [defaultData, setDefaultData] = useState(generateEmptyData(10, 10));
    
      return (<Spreadsheet data={defaultData} />);

    };
    

export default Mainsheet