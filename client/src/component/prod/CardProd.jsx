
import React, { useState, useEffect } from 'react';
// import { ProductService } from './service/ProductService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Paginator } from 'primereact/paginator'
import axios from "axios"
import AddProd from './AddProd';
import NewProd from './NewProd';
import UpdateProd from './UpdateProd';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { Image } from 'primereact/image';
import { jwtDecode } from "jwt-decode";

import { useSelector } from "react-redux"
import DeleteProd from './DeleteProd';

const CardProd = () => {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [showProducts, setShowProducts] = useState([]);
    const toast = useRef(null);
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const [flag, setFlag] = useState(false);

    const showContrast = () => {
        toast.current.show({ severity: 'contrast', summary: 'Add', detail: 'Product to bag', life: 3000 });
    };

    const showError = (Message) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: Message, life: 3000 });
    }

    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:6001/api/prod/")
        setProducts(data);
    }

    useEffect(() => {
           if (isUserLoggedIn) {
                    try {
                        const tokenGood = jwtDecode(token)
                        if (tokenGood.roles === 'Admin') {
                            setFlag(true)
                        }
                    }
                    catch {
                        console.log("שגיאה בפענוח טוקן");
                    }
                }
        fetchData()
    }, []);

    useEffect(() => {
        setShowProducts(products.slice(0, 8))
    }, [products]);

    const token = useSelector((state) => state.auth.token)
    console.log(token);

    const addProduct = async (productId) => {
        const { data } = await axios.post("http://localhost:6001/api/bag", { "code": productId }, { headers: { "authorization": `Bearer ${token}` } })
        console.log(data.message);
        showContrast()

    }

    const clickDelete = async (id) => {
        // return(<DeleteProd/>)

        try {
            //  id.preventDefault() 
            const { data } = await axios.delete(`http://localhost:6001/api/prod/${id}`,{ headers: { "authorization": `Bearer ${token}` } })
            showError(data.message)
            // alert(data.message)
            console.log(data.message);
            fetchData()
        }
        catch (error) {
            if (error.response) {
                console.log("Error status: ", error.response.status);
                console.log("Error message: ", error.response.data.message);
                // alert(error.response.data.message)
                showError("Invalid")
            }
            //   else
            //   alert("NetWork")
        }
    }

    const listItem = (product, index) => {
        
        return (
            <div className="col-10" key={product.id} style={{ padding: "10px" }}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4')} style={{ backgroundImage: "url(/img/201.jpeg)" }}>
                    {/* <Image className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`img/${product.img}.jpg`} alt={product.name} /> */}
                    <Image src={`img/${product.img}.jpg`} alt="Image" width="180" preview />

                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>

                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>

                            <div className="flex sm:flex-row align-items-center sm:align-items-end gap-3 sm:gap-2">
                                {/* <Button icon="pi pi-pencil" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                               {flag && <UpdateProd product={product} fetchData={fetchData} />}
                               {flag &&  <Button icon="pi pi-trash" className="p-button-rounded focus-button color2" disabled={product.inventoryStatus === 'OUTOFSTOCK'} onClick={() => clickDelete(product._id)}
                                    style={{ backgroundColor: '#EB586F', borderColor: '#EB586F' }}></Button>}
                             {isUserLoggedIn && <Button icon="pi pi-shopping-cart" className="p-button-rounded focus-button color2" disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                            style={{ backgroundColor: '#EB586F', borderColor: '#EB586F', color: 'white' }} onClick={() => { addProduct(product._id) }}></Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
   
    
  
    const gridItem = (product) => {
        const header = (
            // <img className="w-12  border-round" src={`img/${product.img}.jpg`} alt="Card" />
            <img alt="Card" src={`img/${product.img}.jpg`} style={{ borderTopLeftRadius: "2%", borderTopRightRadius: "2%", maxHeight: "35vh" }} />

        );
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id} style={{ maxWidth: "20vw", borderRadius: "20%" }}>

                <Card title={product.name} header={header} style={{ maxWidth: "17vw", backgroundImage: "url(/img/201.jpeg)" }}>
                    <div className="flex align-items-center justify-content-between" style={{ height: "0px", backgroundColor: "red" }}>
                        <span className="text-2xl font-semibold">${product.price}</span>
                        {isUserLoggedIn && <Button icon="pi pi-shopping-cart" className="p-button-rounded focus-button color2" disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                            style={{ backgroundColor: '#EB586F', borderColor: '#EB586F', color: 'white' }} onClick={() => { addProduct(product._id) }}></Button>}
                    </div>
                </Card>

            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter" style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff00" }}>{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <>
                <div className="flex justify-content-end">
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
                <div className="flex justify-content-start">
                    {/* <a href="http://localhost:3000/prod/add" target="_blank" rel="noopener noreferrer" className="p-button font-bold">
                AddProdact
                 </a>      */}
                    {/* <AddProd /> */}
                   {flag &&  <NewProd fetchData={fetchData} />}
                </div>
            </>

        );
    };
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(8);

    const onPageChange = (event) => {
        console.log({ event });

        setFirst(event.first);
        setRows(event.rows);
        console.log({ first, rows });
        console.log(products.slice(first, first + 8));
        setShowProducts(products.slice(event.page * rows, event.page * rows + rows))

    };
    return (
        <>
            <Toast ref={toast} />

            <div className="card">
                {console.log({ showProducts })}
                <DataView value={showProducts} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>


            <div className="card">
                <Paginator first={first} rows={rows} totalRecords={products.length} onPageChange={onPageChange} style={{ background: "#ffffff00" }} />
            </div></>
    );
}
export default CardProd