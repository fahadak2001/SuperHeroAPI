import React from "react";
import loader from "./loader.gif";
function LoaderComponent() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', 
            width: '100vw'  
        }}>
            <div style={{
                margin: 'auto', 
                padding: '20px'
            }}>
                <img src={loader} alt="loading" />
            </div>
        </div>
    );
}

export default LoaderComponent;