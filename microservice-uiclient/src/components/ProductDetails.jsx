import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState({
    productId: match.params.id,
    quantite: 1,
    commandePayee: false,
  });

  const history = useHistory();

  const commandHandler = async () => {
    try {
      const response = await fetch('http://localhost:5001/commandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      const totalprix= quantity * product.prix
      history.push(`/commander/${data._id}?total=${totalprix}`)
      // Handle response data if necessary
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const handleQuantityChange = (event) => {
    setOrder({ ...order, quantite: event.target.value });
    setQuantity(event.target.value);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/produits/${match.params.id}`);
        const data = await response.json();
        setProduct(data);
        console.log(product)
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [match.params.id]);

  return (
    <div>
      <h2 className='text-center'>Application mcommerce</h2>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className='card' style={{ width: '25rem' }}>
          <img className='card-img-top' src={product.image} alt={product.titre} style={{ width: '300px' }} />
          <h3 className='card-title'>{product.titre}</h3>
          <p className='card-text'>{product.description}</p>
          <div className='mb-3'>
            <p>Quantité: </p>
            <input type='number' value={quantity} onChange={handleQuantityChange} />
          </div>
          <button onClick={commandHandler} className='btn btn-primary'>
            Commander
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
