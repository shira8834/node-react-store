import React from 'react'
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';


export const HomePage = () => {
            const navigate = useNavigate();

  return (<>
  
   <div style={{ position: 'relative', width: '100%', height: '90vh', overflow: 'hidden' }}>
            <img
                src="/img/reka.jpg"
                alt="Image"
                style={{ width: '100vw',height:"150vh", display: 'block' }}
            />
              <Button
                label="Products"
                style={{
                    position: 'absolute',
                    top: '70%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: "#EB586F",      
                    color: 'white',              
                    borderColor: 'pink' ,
                    fontSize: '1.5rem',   
                    padding: '1rem 2rem', 
                    borderRadius: '12px',
                    width: '180px'
                }}
                onClick={()=>{ navigate('/card') }}
            />
        </div>
  </>
    
  )
}



        