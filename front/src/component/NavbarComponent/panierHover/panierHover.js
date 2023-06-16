import { Link } from 'react-router-dom'
import React from 'react'
import './panierHover.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


export default function PanierHover(ajout) {

  const [error, setError] = useState(false);
  const [article, setArticle] = useState([]);
  let compt = 0;
  let id_panier = localStorage.getItem('id_panier');
  

  useEffect(() => {
    if (id_panier !== null && id_panier !== undefined) {
      axios("http://localhost:8000/api/panier_articles?panier=api/paniers/" + id_panier)
        .then((res) => {
          setArticle(res.data["hydra:member"])
          setError(null);
        })
        .catch(setError);
    }
  }, [ajout,id_panier]);

  if (error) return <p>An error occurred</p>

  article.map((item) => {

    compt = compt + parseFloat(item.articles.prix) * parseInt(item.quantity);
  })

  return (
    <>


      <div className='contenuPanier1'  >

        <>
          <>
            {article.length > 0 ? article.map((item) => (
              <><div className='imgPanier'>
                <Link to={"/article/" + item.articles.id} className="link_none" >
                  <Card.Img className='panierCard__img' src={item.articles.image} alt={item.articles.titre} />
                </Link>
              </div>
                <div className='bodyPanier'>
                  <Card id={"produit-" + item.articles.id} className="MainCard">

                    <Card.Body className='panierCard__body'>
                      <Link to={"/article/" + item.articles.id} className="link_none">
                        <Card.Title className='panierCard__title'>{item.articles.titre}</Card.Title>
                      </Link>
                      <Card.Subtitle className='panierCard__size'>Taille : {item.size.name}</Card.Subtitle>
                      <Card.Subtitle className='panierCard__quantity'>Q:{item.quantity}</Card.Subtitle>
                      <Card.Subtitle className='panierCard__price'>{item.articles.prix}€</Card.Subtitle>
                      
                    </Card.Body>
                  </Card>
                </div>
              </>
            ))

              :
              <div>
                <p className='vide'>Votre panier est vide.</p>
              </div>
            }
          </>

        </>
        <div className='total'>
          <p>Votre Total : {compt}€</p>
          <Link to={"/panier/"} className="link_none">

            <button>Voir le panier</button>
          </Link>
        </div>
      </div>

    </>
  )
}