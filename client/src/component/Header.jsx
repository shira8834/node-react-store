import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
import {useDispatch} from "react-redux"
import {setToken} from "./store/authSlice"
import {  clearToken } from "./store/authSlice";


export default function TemplateDemo() {
    const navigate = useNavigate();
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const token = useSelector((state) => state.auth.token) || null
    const [useName, setUseName] = useState("");
    const [flag, setFlag] = useState(false);
const dispatch = useDispatch();
  
    useEffect(() => {
        if (isUserLoggedIn) {
            try {
                const tokenGood = jwtDecode(token)
                setUseName(tokenGood.userName)
                if (tokenGood.roles === 'Admin') {
                    setFlag(true)
                }
            }
            catch {
                console.log("שגיאה בפענוח טוקן");

            }
        }
    }
    )

    // Custom renderer for menu items to apply consistent styling
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link custom-menu-item" onClick={item.command}>
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items = [
       !isUserLoggedIn &&  {
            label: 'Login',
            icon: 'pi pi-users',
            command: () => { navigate('/login') },
            template: itemRenderer
        },
         isUserLoggedIn &&  {
            label: 'LogOut',
            icon: 'pi pi-sign-out',
            command: () => {    dispatch(clearToken());
                 navigate('/login') },
            template: itemRenderer,
        },
        {
            label: 'Home', 
            icon: 'pi pi-home',
            command: () => { navigate('/') },
            template: itemRenderer
        },
        {
            label: 'Products', 
            icon: 'pi pi-star',
            command: () => { navigate('/card') },
            template: itemRenderer
        },

        isUserLoggedIn && {
            label: 'Bag',
            icon: 'pi pi-shopping-cart',
            command: () => { navigate('/bag') },
            template: itemRenderer
        }
    ];

    const start = <img alt="logo" src="img/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-5">
            {flag && <h3>Admin</h3>}
            <Avatar
                label={useName.charAt(0)}
                size="xlarge"
                shape="circle"
                style={{ backgroundColor: '#0084ff', color: '#fff' }}
            />
        </div>
    );

    return (
        <div className="card custom-menubar-container">
            <Menubar model={items} start={start} end={end} className="custom-menubar" />
        </div>
    );
}