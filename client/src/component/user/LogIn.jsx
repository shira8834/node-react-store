import React from 'react'
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useState } from "react";
import { Password } from 'primereact/password';
import { NavLink } from "react-router-dom"
import {useDispatch} from "react-redux"
import {setToken} from "../store/authSlice"
import { Toast } from 'primereact/toast';
import  { useRef } from 'react';

const LogIn = () => {


  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch();

    const toast = useRef(null);  
  const showError = (text) => {
        toast.current.show({severity:'error', summary: 'Error', detail:text, life: 3000});
    }
  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("http://localhost:6001/api/user/login", { userName, password })
      console.log(data);
      dispatch(setToken({token:data.accessToken}))

      navigate("/card")
    }
    catch (error) {
      if (error.response) {
        console.log("Error status: ", error.response.status);
        console.log("Error message: ", error.response.data.message);
        showError(error.response.data.message)
      }
      else
        showError("NetWork")
    }

  }

  const header = (
    <>
    </>
  );
  const footer = (
    <>
      <Button label="Sign In" severity="secondary" icon="pi pi-send"  disabled={!userName || !password} style={{ marginLeft: '0.5em' }} onClick={submitForm} />
      <h5><NavLink to="/register">עוד לא רשום</NavLink></h5>

    </>
  );
  return (<>
     <Toast ref={toast} />
    <div className="card flex justify-content-center" style={{padding:"50px"}}>

      <Card title="LogIn" subTitle="Welcome to Oreo cans" footer={footer} header={header} className="md:w-25rem" style={{ background:"rgba(255, 255, 255, 0)"}}>

        <div className="card flex flex-column md:flex-column gap-3">

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText placeholder="Username" required onChange={(e) => setUserName(e.target.value)} className='input'/>
          </div>

          {/* סיסמא */}
          <div className="p-inputgroup flex-1">
            <span
              className="p-inputgroup-addon"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? 'pi pi-eye' : 'pi pi-eye-slash'}></i>
            </span>
            <InputText
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className='input'
            />
          </div>
          {/*  */}

        </div>

      </Card>
    </div>

  </>

  )
}

export default LogIn