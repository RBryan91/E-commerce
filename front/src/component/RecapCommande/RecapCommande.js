import React, { useState, useEffect,useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../NavbarComponent/Navbar/ Navbar";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import "./RecapCommande.css";
import ReactToPrint from "react-to-print";


export default function RecapCommande() {
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
    const user = localStorage.getItem('id')
    const location = useLocation()
    const frais = location.state
    const montant = parseFloat(frais.fraistotal) + parseFloat(frais.total)
    const NBArticle = frais.articles
    const [numero, setNumero] = useState("")


    let id_panier = localStorage.getItem("id_panier")
    const [id_delete, setId_delete] = useState(null)
    let quantityTotal = 0;

    frais.articles.map((item) => (
        quantityTotal = quantityTotal + 1 * parseInt(item.quantity)
    ))

    useEffect(() => {
        let alph = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let numero = '';
        for (let i = 0; i < 8; i++) {
            numero += alph[Math.floor(Math.random() * 46)]
        }
        setNumero(numero)
        axios.get("http://localhost:8000/api/panier_articles?panier=" + id_panier)
            .then((response) => {
                setId_delete(response.data["hydra:member"])
            })
        const configuration = { headers: { 'Content-Type': "application/json", Accept: "application/ld+json" } }
        axios.post('http://localhost:8000/api/commandes', {
            "user": "api/users/" + user,
            "numero": numero,
            "montant": String(montant)
        }, configuration)
            .then((res) => {

                const apicommande = res.data['@id'].substring(1)
                for (let i = 0; i < NBArticle.length; i++) {
                    axios.post('http://localhost:8000/api/commande_articles', {
                        "commande": apicommande,
                        "articles": NBArticle[i].articles['@id'].substring(1),
                        "quantity": String(NBArticle[i].quantity),
                        "size": NBArticle[i].size['@id'].substring(1)
                    })
                }
            })

        for (let i = 0; i < NBArticle.length; i++) {
            if (frais.articles[i].articles.Size !== false) {
                const id_size = frais.articles[i].size["@id"].split("/").pop()
                const id_article = parseInt(frais.articles[i].articles.id)
                axios.get('http://localhost:8000/api/stocks?articles=' + id_article + '&size=' + id_size)
                    .then((reponse) => {
                        const quantite = parseInt(frais.articles[i].quantity)
                        const id_stock = reponse.data['hydra:member'][0].id
                        const NBStock = parseInt(reponse.data['hydra:member'][0].NBStock) - quantite
                        const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/ld+json" } }
                        const apiArticle = frais.articles[i].articles["@id"]
                        axios.patch('http://localhost:8000/api/stocks/' + id_stock, { "NBStock": NBStock }, configuration)
                        axios.get('http://localhost:8000' + apiArticle)
                            .then((ress) => {
                                const StockTotal = String(ress.data.nbStock - quantite)
                                console.log(apiArticle)
                                axios.patch('http://localhost:8000' + apiArticle, { "nbStock": StockTotal }, configuration)
                            })
                    })
            }
            else {
                const apiArticle = frais.articles[i].articles["@id"]
                const quantite = parseInt(frais.articles[i].quantity)
                const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/ld+json" } }
                axios.get('http://localhost:8000' + apiArticle)
                    .then((ress) => {
                        const StockTotal = String(ress.data.nbStock - quantite)
                        console.log(apiArticle)
                        axios.patch('http://localhost:8000' + apiArticle, { "nbStock": StockTotal }, configuration)
                    })
            }
        }
    }, []);

    if (id_delete !== null) {
        id_delete.map((item) => {
            axios.delete("http://localhost:8000/api/panier_articles/" + item.id)
        })
    }

    return (
        <div>
            <header><Navbar /></header>
            <div className="mainReacpCommande" ref={ref}>
                <h1>Merci pour votre commande !</h1>

                <div className="bodyRecapCommande">
                    <h2>Recapitulatif de commande</h2>
                    <h3>Votre commande numero : {numero}</h3>
                    <div className='contenaireRecapdetails'>
                        {frais.articles.map((item) => (


                            <div className="bodyDetailsImgDetails"><div className="divImgRecap">
                                <Link to={"/article/" + item.articles.id} className="link_none">
                                    <Card.Img className='recapCard__img' src={item.articles.image} alt={item.articles.titre} />
                                </Link>
                            </div><div className="divdetailsRecap">
                                    <Card id={"produit-" + item.articles.id} key={item.id} className="cardRecap">
                                        <Card.Body className='recapCard__body'>
                                            <Card.Title className='recapCard__title'>{item.articles.titre}</Card.Title>
                                            {item.size === undefined ? <Card.Subtitle className='card__quantity'>x {item.quantity}</Card.Subtitle> : null}
                                            {item.articles.Size !== false ?
                                                <Card.Subtitle className='reacpCard__size'>Taille : {item.size.name} x {item.quantity}</Card.Subtitle>
                                                : null}

                                            {item.quantity === 1 && item.articles.Promo === false ?
                                                <Card.Subtitle className='recapCard__price'>Prix : {item.articles.prix}</Card.Subtitle>
                                                :
                                                null}
                                            {item.quantity !== 1 && item.articles.Promo === false ?
                                                <Card.Subtitle className='recapCard__price'>Prix : {(item.articles.prix * item.quantity).toFixed(2)}</Card.Subtitle>
                                                :
                                                null}
                                            {item.articles.Promo === true && item.quantity === 1 ?
                                                <div>
                                                    <Card.Subtitle className='recapCard__newprice'>Prix : {(parseFloat(item.articles.prix) * (1 - parseFloat(item.articles.Reduction) / 100)).toFixed(2)}</Card.Subtitle>
                                                </div>
                                                :
                                                null}
                                            {item.articles.Promo === true && item.quantity !== 1 ?
                                                <div>
                                                    <Card.Subtitle className='card__promo'>Promo !</Card.Subtitle>
                                                    <Card.Subtitle className='card__reduc'>{item.articles.Reduction}%</Card.Subtitle>
                                                    <Card.Subtitle className='card__newprice'>{(parseFloat(item.articles.prix) * (1 - parseFloat(item.articles.Reduction) / 100) * item.quantity).toFixed(2)}</Card.Subtitle>
                                                </div>
                                                :
                                                null}
                                        </Card.Body>
                                    </Card>
                                </div></div>

                        ))}
                    </div>
                    <p id="totalarticle">{quantityTotal} Articles : {frais.total}€</p>
                    <p id="totallivraison">Livraison :{frais.fraistotal}€</p>
                    <p id="totalTTC">Total TTC : {(parseFloat(frais.total) + parseFloat(frais.fraistotal)).toFixed(2)}€</p>
                    <div className="divBtnRetourHistorique">
                        <div className="btnRetourHistorique"><Link className="retourHome btn" to={"/"}>Retour à l'accueil</Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
});