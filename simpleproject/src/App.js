import './App.css';
import './responsive.css';
import React ,{createContext,useState} from "react"
import Simpleroutering from './route'
import  { useNavigate  } from 'react-router-dom'


export const DataContext = createContext()


const App=()=> {

  const navigate = useNavigate()
  const name = sessionStorage?.getItem("name");
  const password = sessionStorage?.getItem("password");
  const [userdetails,setuserdetails] = useState()
  const [allusers,setallusers] = useState()
 


  const logout=()=>{
    sessionStorage.setItem("name", null)
    sessionStorage.setItem("password", null)
    setuserdetails()
    setallusers()
    navigate("/login")
  }
 
  
  const getallusers = () => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("/alluser", requestOptions)
      .then(response => response.json())
      .then(result => {
        setallusers(result);
      })
      .catch(error => console.log('error', error));
}

const getpost=async()=>{
  if(!name || !password){
    return logout()
  }
  var formdata = new FormData();
  formdata.append("name", name);
  formdata.append("password", password);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
    fetch("/userdetail", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (!result.message) {
            setuserdetails(result)
            navigate('/home')
            if(result.role == 'admin'){
              getallusers()
            }        
        } else {
          console.log('error');
          logout()
        }
      }
      )
      .catch(error => console.log('error', error));
}  


  return (
    <React.Fragment>
      <DataContext.Provider  value={{name,password,logout,getallusers,getpost,userdetails,allusers}}>
          <Simpleroutering/>
      </DataContext.Provider>
    </React.Fragment>
  );
}

export default App;
