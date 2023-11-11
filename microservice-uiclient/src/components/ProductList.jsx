import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/produits/');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div >
      <h2 className='text-center'>Application mcommerce</h2>
      <div className='row pt-1'>
      {products.map((product) => (
        <div className='col pt-3'>
        <div className="card " style={{width: "25rem"}} key={product._id}>
        
        <img src={product.image} style={{width: "300px"}} className="card-img-top " alt="..."/>
  <div className="card-body">
  <Link to={`/products/${product._id}`}> <h5 className="card-title">{product.titre}</h5></Link>
        </div>
        </div>
        </div>
      ))}
</div>
</div>

  );
};

export default ProductList;
