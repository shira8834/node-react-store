import React from 'react'
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useState } from "react";
import { Password } from 'primereact/password';
import { NavLink } from "react-router-dom"
import { Toast } from 'primereact/toast';
import { useRef } from 'react';


const Register = () => {
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [roles, setRoles] = useState("")
    const navigate = useNavigate()
    const toast = useRef(null);

    const showError = (text) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: text, life: 3000 });
    }
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post("http://localhost:6001/api/user/register", { userName, name, password, email, phone, roles })
            console.log(data);
            navigate("/LogIn")
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


    const [showPassword, setShowPassword] = useState(false);

    const header = (
        <>
        </>
    );
    const footer = (
        <>
            <Button label="Sign Up" severity="secondary" icon="pi pi-send" disabled={!userName || !password || !name || !email} style={{ marginLeft: '0.5em' }} onClick={submitForm} />
            <h5><NavLink to="/login">כבר נרשמתי</NavLink></h5>
        </>
    );
    return (<>
        <Toast ref={toast} />
        <div className="card flex justify-content-center" style={{ padding: "50px" }}>

            <Card title="Register" subTitle="Welcome to Oreo cans" footer={footer} header={header} className="md:w-25rem" style={{ background: "rgba(255, 255, 255, 0)" }}>

                <div className="card flex flex-column md:flex-column gap-3">
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText required placeholder="Name *" onChange={(e) => setName(e.target.value)} className='input' />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-crown"></i>
                        </span>
                        <InputText required placeholder="Username *" onChange={(e) => setUserName(e.target.value)} className='input' />
                    </div>
                    {/* <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-eye-slash"></i>
                </span>
                <InputText type="password" placeholder="Password" />

            </div> */}

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
                            placeholder="Password *"
                            onChange={(e) => setPassword(e.target.value)}
                            className='input'
                        />
                    </div>
                    {/*  */}
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-at"></i>
                        </span>
                        <InputText required type="email" placeholder="Email *" onChange={(e) => setEmail(e.target.value)} className='input' />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-phone"></i>
                        </span>
                        <InputText placeholder="Phone" onChange={(e) => setPhone(e.target.value)} className='input' />
                    </div>
                    {/* <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-crown"></i>
                </span>
                <InputText placeholder="Roles" onChange={(e)=>setRoles(e.target.value)} className='input'/>
            </div> */}
                </div>

            </Card>
        </div>

    </>

    )
}

export default Register