import React from 'react'
import { useState, useEffect } from 'react';
import './card_product.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';



function CardProduct() {
  const [error, setError] = useState(null);
  const [product, setProduct] = useState([]);
  let promotion = 0;
  let nouveauté = 0;



  useEffect(() => {
    axios("http://localhost:8000/api/articles")
      .then((response) => {
        setProduct(response.data["hydra:member"])
        setError(null);
      })
      .catch(setError);

  }, []);
  if (error) return <p>An error occurred</p>

  product.filter(res => {
    if (res.Promo === true) {
      promotion = (promotion + 1)
    }
    if(res.Nouveauté === true){
      nouveauté = (nouveauté +1)
    }
  })

  console.log(product)

  return (
    <div className="contenaire">
      {promotion !== 0 ?
        <div className="promo">
          <h2>Promotion !</h2>
          <div className="container-product-promo">
            {product.map((item) => (
              item.Promo === true ?
                <Card id={"produit-" + item.id} key={item.id} className="card">
                  <Link to={"/article/" + item.id} className="link_none">
                    <Card.Img className='card__img' src={item.image} alt={item.titre} />
                    <Card.Body className='card__body'>
                      <Card.Title className='card__title' >{item.titre}</Card.Title>
                      <Card.Subtitle className='card__promo'>Promo !</Card.Subtitle>
                      <Card.Subtitle className='card__reduc'>{item.Reduction}%</Card.Subtitle>
                      <Card.Subtitle className='card__oldprice'>{item.prix}</Card.Subtitle>
                      <Card.Subtitle className='card__newprice'>{(parseFloat(item.prix) * (1 - parseFloat(item.Reduction) / 100)).toFixed(2)}</Card.Subtitle>
                    </Card.Body>
                  </Link>
                </Card>
                :
                null
            ))}
          </div>
        </div>
        : null
      }

      {nouveauté !== 0 ?
        <div className="nouveau">
          <h2>Nouveautés !</h2>
          <div className="container-product-nouveau">
            {product.map((item) => (
              item.Nouveauté === true ?
                <Card id={"produit-" + item.id} key={item.id} className="card">
                  <Link to={"/article/" + item.id} className="link_none">
                    <Card.Img className='card__img' src={item.image} alt={item.titre} />
                    <Card.Body className='card__body'>
                      <Card.Title className='card__title' >{item.titre}</Card.Title>
                      <Card.Subtitle className='card__nouveau'>Nouveau !</Card.Subtitle>
                      <Card.Subtitle className='card__price'>{item.prix}</Card.Subtitle>
                    </Card.Body>
                  </Link>
                </Card>
                :
                null
            ))}
          </div>
        </div>
        : null
      }


      <div className='container-product'>
        {product.map((item) => (
          item.Promo === false && item.Nouveauté === false ?
            <Card id={"produit-" + item.id} key={item.id} className="card">
              <Link to={"/article/" + item.id} className="link_none">
                <Card.Img className='card__img' src={item.image} alt={item.titre} />
                <Card.Body className='card__body'>
                  <Card.Title className='card__title' >{item.titre}</Card.Title>
                  <Card.Subtitle className='card__price'>{item.prix}€</Card.Subtitle>
                </Card.Body>
              </Link>
            </Card>
            : null
        ))};

      </div>
    </div >
  );

}


export default CardProduct;
