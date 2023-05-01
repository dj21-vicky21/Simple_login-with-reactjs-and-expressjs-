import React,{useState} from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Password from '../component/password'
import Checkbox from '@mui/material/Checkbox';
import  { useNavigate  } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControlLabel from '@mui/material/FormControlLabel';


const label = { inputProps: { 'aria-label': 'Checkbox demo' }};

const Register = (props) => {
    
    const [date, setDate] = useState();
    const [senddate, setSenddate] = useState();
    const [firstname, setFirstname] = useState('');
    const [secondname, setSecondname] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorrequired,seterrorrequired] = useState(false)
    const [role,setrole] = useState(false)
    const navigate = useNavigate()

    const notify = (e) => toast(e, {
        position: "bottom-right",
        autoClose: 5000,
        // hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    const registerdata=()=>{
        if(!firstname || !secondname || !date || !password || !username){
            return seterrorrequired(true)
        }

        var formdata = new FormData();
        formdata.append("f_name", firstname);
        formdata.append("s_name", secondname);
        formdata.append("u_name", username);
        formdata.append("password", password);
        formdata.append("dob", senddate);
        formdata.append("role", role?'admin':'user');

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        fetch("/resigter", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result));
            if(JSON.parse(result).msg == 'Username already taken' ){
                notify(JSON.parse(result).msg)
            }
            else{
                setDate('')
                setFirstname('')
                setUsername('')
                setSecondname('')
                setrole(false)
                setPassword('')
                notify('Successfully registered')
                setTimeout(() => {
                    navigate('./login')
                },2000);
            }
            
        })
        .catch(error => console.log('error', error));



    }

  return (
      <div className="auth_page_wrap ">
          <div className="auth_page signup_page">
              <h2 className="login_header">Register</h2>
              <div className="signup_form">
              
                 <TextField
                        error={errorrequired && !firstname ? true : false }
                      label="Firstname"
                      variant="standard"
                      value={firstname}
                      onChange={(e)=>{
                        setFirstname(e.target.value)
                      }}
                  />
                  <TextField
                        error={errorrequired && !secondname ? true : false }
                      label="Lastname"
                      variant="standard"
                      value={secondname}
                      onChange={(e)=>{
                        setSecondname(e.target.value)
                      }}
                  />
                  <span  className="datepicker">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker', 'DatePicker']}>
                              <DatePicker
                            required={errorrequired && !date && true}

                                slotProps={{ textField: { size: 'small' } }}
                                  label="Date of birth"
                                  value={date}
                                  onChange={(newValue) => {setDate(newValue);
                                    console.log(newValue)
                                    setSenddate(`${newValue.$D < 10 ? '0'+newValue.$D : newValue.$D }/${(Number(newValue.$M)+1) < 10 ? '0'+(Number(newValue.$M)+1) : newValue.$M+1 }/${newValue.$y}`)
                                }}
                              />
                          </DemoContainer>
                      </LocalizationProvider>
                  </span>
              </div>
              <TextField
                  label="Usename"
                  variant="standard"
                  autoComplete="false"
                  value={username}
                  onChange={(e)=>{
                    setUsername(e.target.value)
                  }}
                  error={errorrequired && !username ? true :false}
                 
              />
              <Password 
                setpassword={setPassword}
                password={password}
                error={errorrequired}
              />
              <div className="button_submit sign_up">
              <FormControlLabel control={<Checkbox {...label}  checked={role} label={'label'}   onChange={(e)=>{setrole(e.target.checked);}} />} label="Admin" />
              {/* <Checkbox   /> */}
                  <Button size="small" variant="contained" className="login_btn" onClick={registerdata}> signup </Button>
              </div>
              <span className="linkroredirect login_link">Already have an account?&nbsp; <a href="/login"> login</a></span>
          </div>
          <ToastContainer />
      </div>
  )
};

export default Register;
