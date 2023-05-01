import React, { useEffect ,useState,useContext} from "react"
import Button from '@mui/material/Button';
import  { useNavigate  } from 'react-router-dom'
import Collapse from  '../component/collapse'
import { DataContext } from "../App"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Home = (props) => {

 
  const navigate = useNavigate()
  

  const {name,password,logout,getallusers,getpost,allusers,userdetails} = useContext(DataContext)
 

useEffect(()=>{
    getpost()
},[])




  return (
    <div className="home auth_page_wrap">
      <div className="home_wraper">
        <h1 className="homeheader" > <AccountCircleIcon className="profileicon"/>Profile </h1>
        <hr />

       {userdetails && <>
        <div className="name_property"><span className="userdetailpropertyname">Username</span><span>:&nbsp; {userdetails.uname}</span></div>
        <div className="name_property"> <span className="userdetailpropertyname">First name </span><span>:&nbsp; {userdetails.fname}</span></div>
        <div className="name_property"> <span className="userdetailpropertyname">Second name</span><span>:&nbsp; {userdetails.sname}</span></div>
        <div className="name_property"><span className="userdetailpropertyname">DOB </span><span>:&nbsp; {userdetails.dob}</span></div>
        <div className="name_property"><span className="userdetailpropertyname">Role</span><span>:&nbsp; {userdetails.role}</span></div>
       </>
       }
       <hr/>
        <Button size="small" variant="contained" className="logout_btn" onClick={logout}> Logout </Button>
      </div>
      {userdetails?.role == 'admin' && <div className="admintab">
       <h3 className="alluserlistheading">User {allusers?.length > 1 ? 'lists' : 'list'}<span className="usercounts"> ({allusers?.length})</span></h3>
       <hr />
       <div>
        <p className="admintabheader_tab"><span>username</span> <span>role</span></p>
        <hr />
        {allusers?.map((e,i)=>{
        return <Collapse key={i} details={e} index={i}/>
       })}
       </div>
      </div>
      
      }
    </div>
  )
};

export default Home;
