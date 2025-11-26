
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import axios from "axios"
import { InputNumber } from 'primereact/inputnumber';
import { useSelector } from "react-redux"
import Tashlum from './Tashlum';

export default function Bag() {
    const [products, setProducts] = useState([]);
    const [prod, setProd] = useState([]);
    // const [value, setValue] = useState(1);
    const [values, setValues] = useState({});
    const [visible, setVisible] = useState(false);
    const [letashlum, setLetashlum] = useState(0);
    const token = useSelector((state) => state.auth.token)

    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:6001/api/bag/bag", { headers: { "authorization": `Bearer ${token}` } })
        // console.log({ dataaaaaaa: data });


        let sum = 0
        setProducts(data);
        setVisible(true)
        data.map(p => {
            if (p.code)
                sum += (p.code.price) * (p.count)
            //console.log(p.code);
        })
        console.log({ sum });
        setLetashlum(sum)
        console.log({letashlum});
        //{visible&&<Tashlum letashlum={letashlum}/>}

    }
    useEffect(() => {
        fetchData()
    }, []);
    // useEffect(() => {
    //     console.log({ letashlum });
    // }, [letashlum]);
    const deleteOne = async (id) => {
        try {
            console.log("in");
            const { data } = await axios.delete(`http://localhost:6001/api/bag/${id}`, { headers: { "authorization": `Bearer ${token}` } })
            console.log(data.message);
            fetchData()
        }
        catch (error) {
            if (error.response) {
                console.log("Error status: ", error.response.status);
                console.log("Error message: ", error.response.data.message);
                // alert(error.response.data.message)
                alert("Invalid")
            }
        }
    }


    const itemTemplate = (product, index) => {
        // console.log(product);
        if (product.code !== null) {
            // console.log(letashlum);
            // const sum = (Number(product.code.price) * Number(product.count))
            // console.log(sum);
            // setLetashlum(sum)
            // console.log();
            // // console.log(letashlum);
            // console.log("hgbf");            
            //  setLetashlum(sum) 


            return (<>
                <div className="col-8" key={product.id}  style={{ 
    padding: "10px",
    width: "60vw",   
    overflow: "hidden" 
  }}>
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-center p-4 gap-4')} style={{ backgroundImage: "url(/img/201.jpeg)" }}>
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`img/${product.code.img}.jpg`} alt={product.name} />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{product.code.name}</div>
                                <div className="text-2xl font-bold text-900">Quantity:{product.count}</div>
                            </div>
                            <div className="flex sm:flex-row align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">${product.code.price}</span>
                                <Button icon="pi pi-trash" severity="secondary" aria-label="Bookmark" onClick={() => { deleteOne(product._id) }} />
                                <div className="card flex justify-content-center ">
                                 <InputNumber
                                        value={values[product._id] || product.count}
                                        onValueChange={(e) => {
                                            setValues(prev => ({
                                                ...prev,
                                                [product._id]: e.value,
                                            }));
                                        }}
                                        showButtons
                                        buttonLayout="vertical"
                                        style={{ width: '4rem' }}
                                        decrementButtonClassName="p-button-secondary"
                                        incrementButtonClassName="p-button-secondary"
                                        incrementButtonIcon="pi pi-plus"
                                        decrementButtonIcon="pi pi-minus"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div></>
            );
        }
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        const fetchData = async (code) => {

            try {
                const { data } = await axios.get(`http://localhost:6001/api/prod/id/${code}`)
                setProd(data);
                // alert(data.message)
                console.log(data.message);
                fetchData()
            }
            catch (error) {
                if (error.response) {
                    console.log("Error status: ", error.response.status);
                    console.log("Error message: ", error.response.data.message);
                    // alert(error.response.data.message)
                }
                //   else
                //   alert("NetWork")
            }

        }

        let list = items.map((product, index) => {
            // console.log(product.code);
            // fetchData(product.code)
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter ">{list}</div>;
    };

    return (<div className={classNames('flex flex-row xl:flex-row xl:align-items-start p-4')} style={{ padding: "50px" }} >
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} />
            <Tashlum letashlum={letashlum} />
        </div>
    </div>)
}
