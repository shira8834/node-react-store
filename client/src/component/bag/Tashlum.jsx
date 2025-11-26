
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Tashlum = ({ letashlum }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    console.log(letashlum);
    const handleSubmit = () => {
        console.log({ cardNumber, cardHolder, expiryDate, cvv });
    };

    const header = (<>
        <div className="p-card-title">Credit card details</div>
        <div className="p-card-title">To pay: {letashlum}</div>
    </>
    );

    const footer = (
        <Button label="Pay now" icon="pi pi-check" onClick={handleSubmit} style={{ backgroundColor: '#EB586F', borderColor: '#EB586F' }} />
    );

    return (
        <div
            className="p-d-flex p-jc-center p-ai-center"
            style={{
                position: 'fixed', 
                top: '50%', 
                left: '84%', 
                transform: 'translate(-50%, -50%)',
                minHeight: 'auto', 
                zIndex: 1000 
            }}
        >
            <Card title={header} footer={footer} style={{ width: '400px' }}>
                <div className="p-fluid">
                    <div className="p-field p-mb-3">
                        <label htmlFor="cardNumber">Card number</label>
                        <InputMask
                            id="cardNumber"
                            mask="9999-9999-9999-9999"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.value)}
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                        />
                    </div>
                    <div className="p-field p-mb-3">
                        <label htmlFor="cardHolder">Cardholder name</label>
                        <InputText
                            id="cardHolder"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Name as appears on card"
                        />
                    </div>
                    <div className="p-grid p-formgrid p-mb-3">
                        <div className="p-col-6">
                            <label htmlFor="expiryDate">Expiration date (MM/YY)</label>
                            <InputMask
                                id="expiryDate"
                                mask="99/99"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.value)}
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="p-col-6">
                            <label htmlFor="cvv">CVV</label>
                            <InputText
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="XXX"
                                maxLength="3" 
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Tashlum;