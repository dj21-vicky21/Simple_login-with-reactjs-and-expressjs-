import React, { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Password = (props) => {

    const { 
      password,
      setpassword,
      error
    }=props

    const [showpassword, setShowpassword] = useState(false)



    return (
      <div className="password_container">
         <TextField
            label="Password"
            type={showpassword ? 'text' : "password" }
            variant="standard"
            value={password == null ?password : undefined}
            onChange={(e)=>{
              setpassword(e.target.value)
            }}
            error={error && !password ? true : false }
        />
        <span className="eye_icon" onClick={()=>{setShowpassword(prev=>!prev)}}>
            {showpassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
        </span>
      </div>
    )
};

export default Password;
