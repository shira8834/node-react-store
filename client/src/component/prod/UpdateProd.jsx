


import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"

import { InputText } from 'primereact/inputtext';

export default function UpdateProd({product,fetchData}) {
  
  const token = useSelector((state) => state.auth.token)



  const navigate = useNavigate()

  const [formData,setFormData]=useState({
    name:product.name,
    price:product.price,
    img:product.img
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    })
}

  const submitForm = async (e) => {
    try {
      const { data } = await axios.put("http://localhost:6001/api/prod", { ...formData ,_id: product._id },{ headers: { "authorization": `Bearer ${token}` } })
      console.log(data);

      hideDialog()  
      fetchData()
      navigate("/card")

    }
    catch (error) {
      if (error.response) {
        console.log("Error status: ", error.response.status);
        console.log("Error message: ", error.response.data.message);
        // alert(error.response.data.message)
        alert("Invalid")
      }
      else
        alert("NetWork")
    }
  }

  const [productDialog, setProductDialog] = useState(false);
  const toast = useRef(null);

  const openDialog = () => {
    setProductDialog(true);
  };

  const hideDialog = () => {
    setProductDialog(false);
  };

  const saveProduct = () => {
    toast.current?.show({ severity: 'success', summary: 'Saved', detail: 'Product saved' });
    setProductDialog(false);
  };

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} style={{color: '#EB586F',borderBlockColor:"#EB586F"}} />
      <Button label="Save" icon="pi pi-check" onClick={submitForm}  style={{ backgroundColor: '#EB586F', borderColor: '#EB586F' }}/>
    </>
  );

  return (
    <>


      <Toast ref={toast} />
      <Button icon="pi pi-pencil" className="p-button-rounded focus-button color3"
        style={{ backgroundColor: '#EB586F', borderColor: '#EB586F', color: 'white' }} onClick={openDialog}></Button>
      <Dialog
        visible={productDialog}
        style={{ width: '32rem' }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {/*  תוכן */}

        <div>
          <h3>Add Prod</h3>
          {/* <form onSubmit={submitForm} className="p-fluid" style={{ maxWidth: '300px' }}> */}


            <div className="field">
              <label htmlFor="name">Enter prod name</label>
              <InputText id="name" type="text" required defaultValue={product.name}   name='name' onChange={(e) => handleChange(e)} autoFocus />
            </div>



            <div className="field">
              <label htmlFor="price">Enter prod price</label>
              <InputText id="price"  type="number" required defaultValue={formData.price}  name='price' onChange={(e) => handleChange(e)} />

            </div>

            <div className="field">
              <label htmlFor="img">Enter prod img</label>
              <InputText id="img" type="text" required defaultValue={product.img}  name='img'  onChange={(e) =>  handleChange(e)} />
            </div>
            {/* <Button type="submit" label="Save" icon="pi pi-send" onClick={saveProduct} /> */}

            {/* <Button label="Send" icon="pi pi-send" type="submit" className="mt-2" /> */}
          {/* </form> */}
        </div>

      </Dialog>
    </>
  );
}

