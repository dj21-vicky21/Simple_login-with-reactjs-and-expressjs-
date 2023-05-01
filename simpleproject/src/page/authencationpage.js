import React,{useEffect, useState,useContext,useRef} from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Password from '../component/password'
import  { useNavigate  } from 'react-router-dom'
import { DataContext } from "../App";


const Authentication = (props) => {

  const [username,setusetname] = useState('')
  const [passwordS,setpassword] = useState('')
  const [error,setError] = useState(false)
  const navigate = useNavigate()
  const {name,password,logout,getallusers,getpost,allusers,userdetails} = useContext(DataContext)
  const container = useRef(null)

  useEffect(()=>{
    getpost()
  },[])

  
 const getpostS=async()=>{
  if(!username && !passwordS){
    return setError(true)
  }
  setError(false)
  var formdata = new FormData();
  formdata.append("name", username);
  formdata.append("password", passwordS);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
    fetch("/check", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.auth == true) {
          setError(false)
          sessionStorage.setItem("name", result.name)
          sessionStorage.setItem("password", result.password)
          navigate("/home")
        } else {
          setError(true)
        }
      }
      )
      .catch(error => console.log('error', error));
  }  

  


  return (
    <div className="auth_page_wrap" ref={container}>
      <div className="auth_page">
        <h1 className="welcomeclass">Welcome back!</h1>
        {/* <h2 className="login_header"  >Login</h2> */}
        <TextField
          label="Usename"
          variant="standard"
          onChange={(e)=>{
            setusetname(e.target.value)
          }}
        />
        <Password 
          setpassword={setpassword}
          password={password}
          error={error}
        />
        {error&&<span className="error_login">Incorrect username and password</span>}


        <div className="button_submit">
          <Button size="small" variant="contained" className="login_btn" onClick={getpostS}> Login </Button>
        </div>
        <span className="linkroredirect signup_link">Don’t have an account?&nbsp; <a href="/signup"> Register</a></span>
      </div>
    </div>
  )
};

export default Authentication;
