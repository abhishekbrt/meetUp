import React from "react";
import { useState } from "react";
import MyContext from './MyContext';

const MyProvider=({children})=>{
    const [userEmail,setUserEmail]=useState('');

    return(
        <MyContext.Provider value={{userEmail,setUserEmail}}>
            {children}
        </MyContext.Provider>
        
    );

}

export default MyProvider;