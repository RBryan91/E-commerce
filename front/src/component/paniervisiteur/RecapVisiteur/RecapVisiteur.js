import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../../NavbarComponent/Navbar/ Navbar";
import Card from 'react-bootstrap/Card';
import Cookies from 'universal-cookie';
import axios from "axios";
import ReactToPrint from "react-to-print";


export default function RecapVisiteur() {
    let componentRef = useRef();

    return (
        <>
            <div>
                {/* button to trigger printing of target component */}
                <ReactToPrint
                    trigger={() => <button className="btn-print">Imprimer</button>}
                    content={() => componentRef}
                />

                {/* component to be printed */}
                <ComponentToPrint ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}


export const ComponentToPrint = React.forwardRef((props, ref) => {
    let quantityTotal = 0;
    let total = 0;
    const cookies = new Cookies();
    const utilisateur = cookies.get('utilisateur')
    const articles = cookies.get('article')
    const location = useLocation()
    const frais = location.state
    console.log(articles)
    const montant = parseFloat(utilisateur.frais) + parseFloat(frais.prix)

    let alph = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let numero = ''
    for (let i = 0; i < 8; i++) {
        numero += alph[Math.floor(Math.random() * 46)]
    }

    useEffect(() => {
        const configuration = { headers: { 'Content-Type': "application/json", Accept: "application/ld+json" } }
        axios.post('https://localhost:8000/api/commandes', {
            "numero": numero,
            "montant": String(montant)
        }, configuration)
            .then((res) => {
                const apicommande = res.data['@id'].substring(1)
                for (let i = 0; i < articles.length; i++) {
                    if (articles[i].Size === false) {
                        axios.post('https://localhost:8000/api/commande_articles', {
                            "commande": apicommande,
                            "articles": articles[i]['@id'].substring(1),
                            "quantity": String(articles[i].quantity),
                            "size": "api/sizes/2"
                        })
                    }
                    else {
                        axios.post('https://localhost:8000/api/commande_articles', {
                            "commande": apicommande,
                            "articles": articles[i]['@id'].substring(1),
                            "quantity": String(articles[i].quantity),
                            "size": "api/sizes/" + articles[i].size
                        })
                    }

                }
            })

        for (let i = 0; i < articles.length; i++) {
            if (frais.data[i].Size !== false) {
                const id_size = "api/sizes/" + frais.data[i].size
                const id_article = frais.data[i].id
                console.log(id_size, id_article)
                axios.get('https://localhost:8000/api/stocks?articles=' + id_article + '&size=' + id_size)
                    .then((reponse) => {
                        const quantite = parseInt(frais.data[i].quantity)
                        const id_stock = reponse.data['hydra:member'][0].id
                        const NBStock = parseInt(reponse.data['hydra:member'][0].NBStock) - quantite
                        const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/ld+json" } }
                        const apiArticle = frais.data[i]["@id"]
                        axios.patch('https://localhost:8000/api/stocks/' + id_stock, { "NBStock": NBStock }, configuration)
                        axios.get('https://localhost:8000' + apiArticle)
                            .then((ress) => {
                                const StockTotal = String(ress.data.nbStock - quantite)
                                console.log(apiArticle)
                                axios.patch('https://localhost:8000' + apiArticle, { "nbStock": StockTotal }, configuration)
                            })
                    })
            }
            else {
                const apiArticle = frais.data[i]["@id"]
                const quantite = parseInt(frais.data[i].quantity)
                const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/ld+json" } }
                axios.get('https://localhost:8000' + apiArticle)
                    .then((ress) => {
                        const StockTotal = String(ress.data.nbStock - quantite)
                        console.log(apiArticle)
                        axios.patch('https://localhost:8000' + apiArticle, { "nbStock": StockTotal }, configuration)
                    })
            }
        }

    }, []);


    articles.map((item) => {
        quantityTotal = quantityTotal + 1 * parseInt(item.quantity)

        item.Promo === true ?

            total = total + (parseFloat(item.prix) * (1 - parseFloat(item.Reduction) / 100)) * parseInt(item.quantity)
            :
            total = total + parseFloat(item.prix) * parseInt(item.quantity)

    })

    cookies.remove('article')

    return (
        <div>
            <header><Navbar /></header>
            <div className="mainReacpCommande">
                <h1>Merci pour votre commande !</h1>

                <div className="bodyRecapCommande">
                    <h2>Recapitulatif de commande</h2>
                    <h3>Votre commande numero : {numero}</h3>
                    <div className='contenaireRecapdetails'>
                        {articles.map((item) => (
                            <div className="bodyDetailsImgDetails">
                                <div className="divImgRecap">
                                    <Link to={"/article/" + item.id} className="link_none">
                                        <Card.Img className='recapCard__img' src={item.image} alt={item.titre} />
                                    </Link>
                                </div><div className="divdetailsRecap">
                                    <Card id={"produit-" + item.id} key={articles.indexOf(item)} className="cardRecap">
                                        <Card.Body className='recapCard__body'>
                                            <Link to={"/article/" + item.id} className="link_none">
                                                <Card.Title className='recapCard__title' >{item.titre}</Card.Title>
                                            </Link>
                                            {item.size === 1 ? <Card.Subtitle className='card__size'>Taille : S x {item.quantity}</Card.Subtitle> : null}
                                            {item.size === 2 ? <Card.Subtitle className='card__size'>Taille : M x {item.quantity}</Card.Subtitle> : null}
                                            {item.size === 3 ? <Card.Subtitle className='card__size'>Taille : L x {item.quantity}</Card.Subtitle> : null}
                                            {item.size === 4 ? <Card.Subtitle className='card__size'>Taille : XL x {item.quantity}</Card.Subtitle> : null}
                                            {item.size === undefined ? <Card.Subtitle className='card__quantity'>x {item.quantity}</Card.Subtitle> : null}
                                            {item.quantity === 1 && item.Promo === false ?
                                                <Card.Subtitle className='recapCard__price'>Prix : {item.prix}€</Card.Subtitle>
                                                :
                                                null
                                            }
                                            {item.quantity !== 1 && item.Promo === false ?
                                                <Card.Subtitle className='recapCard__price'>Prix : {(item.prix * item.quantity).toFixed(2)}€</Card.Subtitle>
                                                :
                                                null
                                            }
                                            {item.Promo === true && item.quantity === 1 ?
                                                <div>
                                                    <Card.Subtitle className='recapCard__newprice'>Prix : {(parseFloat(item.prix) * (1 - parseFloat(item.Reduction) / 100)).toFixed(2)}€</Card.Subtitle>
                                                </div>
                                                :
                                                null
                                            }
                                            {item.Promo === true && item.quantity !== 1 ?
                                                <div>
                                                    <Card.Subtitle className='recapCard__newprice'>Prix : {(parseFloat(item.prix) * (1 - parseFloat(item.Reduction) / 100) * item.quantity).toFixed(2)}€</Card.Subtitle>
                                                </div>
                                                :
                                                null
                                            }
                                        </Card.Body>
                                    </Card>
                                </div></div>
                        ))}
                    </div>
                    <p id="totalarticle">{quantityTotal} Articles : {total.toFixed(2)}€</p>
                    <p id="totallivraison">Livraison : {utilisateur.frais}€</p>
                    <p id="totalTTC">Total TTC : {(parseFloat(total) + parseFloat(utilisateur.frais)).toFixed(2)}€</p>
                    <div className="divBtnRetourHistorique">
                        <div className="btnRetourHistorique"><Link className="retourHome btn" to={"/"}>Retour à l'accueil</Link></div>
                    </div>
                </div>
            </div>
        </div>

    )
});
