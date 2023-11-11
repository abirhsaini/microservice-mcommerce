import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const Commander = () => {
    const { id } = useParams();
    const history = useHistory();
  const total = new URLSearchParams(window.location.search).get('total');
    const [payment, setPayment] = useState({
        idCommande: id,
        montant: total,
        numeroCarte:325252525
       
    });

    const handleSubmit=async()=>{
        try{
        const response = await fetch("http://localhost:5002/payments",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },body: JSON.stringify(payment)
            
        }
        
        )
        history.push(`/payment`)
    }
        catch (error) {
            console.error('Error submitting order:', error);
          }
}

    return (
        <div >
              <h2 className='text-center  pt-4'>Application mcommerce</h2>
              <div className='d-flex justify-content-center align-items-center pt-4' >
              <div className='card' style={{width:"400px"}}>
                <div className='card-text m-4'> Paiement électronique, système de paiement informatisé qui permet d'opérer un transfert de fonds instantané d'un compte bancaire vers un autre. (L'acheteur doit être porteur d'une carte plastifiée nominative contenant certaines informations [carte de paiement] et le vendeur disposer d'un terminal informatique spécial, dit terminal point de vente.)</div>
                <div className='card-text m-4'> totale: {total}</div>
                <a  className='card-text text-center m-4' onClick={handleSubmit}> payer ma commande</a>
              </div></div>
        </div>
    );
};

export default Commander;