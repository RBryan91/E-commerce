import { Link } from 'react-router-dom'
import React from 'react'
import './PanierVisiteurHover.css'
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Cookies from 'universal-cookie';



export default function PanierHover(ajout) {
    const [error, setError] = useState(false);
    const [article, setArticle] = useState([]);
    const cookies = new Cookies();
    let compt = 0;

    useEffect(() => {
        if (cookies.get('article') !== undefined) {
            setArticle(cookies.get('article'))
        }
    }, [ajout]);

    if (error) return <p>An error occurred</p>

    if (article !== undefined) {
        article.map((item) => {
            compt = compt + parseFloat(item.prix) * parseInt(item.quantity);
        })
    }

    return (
        <>


            <div className='contenuPanier'  >

                <>
                    <>
                        {article.length > 0 ? article.map((item) => (
                            <><div className='imgPanier'>
                                <Link to={"/article/" + item.id} className="link_none" >
                                    <Card.Img className='panierCard__img' src={item.image} alt={item.titre} />
                                </Link>
                            </div>
                                <div className='bodyPanier'>
                                    <Card id={"produit-" + item.id} className="MainCard">

                                        <Card.Body className='panierCard__body'>
                                            <Link to={"/article/" + item.id} className="link_none">
                                                <Card.Title className='panierCard__title'>{item.titre}</Card.Title>
                                            </Link>
                                            {item.size === 1 ? <Card.Subtitle className='panierCard__size'>Taille : S</Card.Subtitle> : null}
                                            {item.size === 2 ? <Card.Subtitle className='panierCard__size'>Taille : M</Card.Subtitle> : null}
                                            {item.size === 3 ? <Card.Subtitle className='panierCard__size'>Taille : L</Card.Subtitle> : null}
                                            {item.size === 4 ? <Card.Subtitle className='panierCard__size'>Taille : XL</Card.Subtitle> : null}
                                            <Card.Subtitle className='panierCard__quantity'>Q:{item.quantity}</Card.Subtitle>
                                            <Card.Subtitle className='panierCard__price'>{item.prix}€</Card.Subtitle>
                                           
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
                    <p>Votre Total : {compt.toFixed(2)}€</p>
                    <Link to={"/paniervisiteur"} className="link_none">
                        <button>Voir le panier</button>
                    </Link>
                </div>
            </div>
        </>
    )
}