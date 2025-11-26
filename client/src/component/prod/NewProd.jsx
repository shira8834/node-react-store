
import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"

export default function AddProd({ fetchData }) {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        code: '',
        img: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token)

    const openNew = () => {
        setProduct({
            name: '',
            price: '',
            code: '',
            img: ''
        });
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setProductDialog(false);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        setProduct({ ...product, [name]: val });
    };

    const showError = (message) => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!product.name || !product.price || !product.code || !product.img) {
            showError("All fields are required");
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:6001/api/prod/", product, { headers: { "authorization": `Bearer ${token}` } });
            toast.current.show({ severity: 'success', summary: 'Success', detail: data.message, life: 3000 });
            setProductDialog(false);
            fetchData();
            // navigate('/prod');
        } catch (error) {
            if (error.response) {
                showError(error.response.data.message);
            } else {
                showError("Network error");
            }
        }
    };

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} style={{color: '#EB586F',borderBlockColor:"#EB586F"}}/>
            <Button label="Create" icon="pi pi-check" onClick={submitForm} style={{ backgroundColor: '#EB586F', borderColor: '#EB586F' }} />
        </>
    );

    const leftToolbarTemplate = () => (
        <Button label="New Product" icon="pi pi-plus" severity="success" onClick={openNew} style={{backgroundColor: '#EB586F'}} />
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar left={leftToolbarTemplate} />
            </div>

            <Dialog visible={productDialog} style={{ width: '30rem' }} header="Add Product" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">Name</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={submitted && !product.name ? 'p-invalid' : ''} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="price" className="font-bold">Price</label>
                    <InputText id="price" type="number" prefix="$" value={product.price} onChange={(e) => onInputChange(e, 'price')}  required autoFocus className={submitted && !product.price ? 'p-invalid' : ''} />
                    {submitted && !product.price && <small className="p-error">Price is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="code" className="font-bold">Code</label>
                    <InputText id="code" type="number"  value={product.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={submitted && !product.code ? 'p-invalid' : ''} />
                    {submitted && !product.code && <small className="p-error">Price is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="img" className="font-bold">Image Name</label>
                    <InputText id="img" value={product.img} onChange={(e) => onInputChange(e, 'img')} required autoFocus className={submitted && !product.img ? 'p-invalid' : ''} />
                    {submitted && !product.img && <small className="p-error">Price is required.</small>}
                </div>
            </Dialog>
        </div>
    );
}
