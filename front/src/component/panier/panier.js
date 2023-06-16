import React from 'react'
import { useState, useEffect } from 'react';
import './panier.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Navbar from '../NavbarComponent/Navbar/ Navbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function Panier() {
  const [article, setArticle] = useState([]);
  const [length, setLength] = useState(null)
  const [articlevide, setArticlevide] = useState([]);
  const [PrixPays, setPrixPays] = useState(0);
  const [PrixPoid, setPrixPoid] = useState(0);

  let total = 0;
  let weight = 0;
  let quantityTotal = 0;
  let weighttotal = parseFloat(PrixPays) + parseFloat(PrixPoid);
  let id_panier = localStorage.getItem("id_panier")

  useEffect(() => {
    console.log(article)
    if (id_panier !== null) {
      axios.get("http://localhost:8000/api/panier_articles?panier=" + id_panier)
        .then((response) => {
          if (response.data["hydra:totalItems"] === 0) {
            axios.get("http://localhost:8000/api/articles")
              .then((res) => {
                setArticlevide(res.data["hydra:member"])
              })
          }
          setArticle(response.data["hydra:member"]);
        })

    }
  }, [id_panier, length]);

  article.map((item) => {
    weight = weight + parseFloat(item.articles.Poid) * parseInt(item.quantity);
    quantityTotal = quantityTotal + 1 * parseInt(item.quantity)

    item.articles.Promo === true ?

      total = total + (parseFloat(item.articles.prix) * (1 - parseFloat(item.articles.Reduction) / 100)) * parseInt(item.quantity)
      :
      total = total + parseFloat(item.articles.prix) * parseInt(item.quantity)
  })
  total = total.toFixed(2)
  weight = weight.toFixed(1)
  weight = parseFloat(weight)
  weight = Math.round(weight)
  if (weight > 6) {
    weight = 6
  }

  if (article.length > 0) {
    let country = article[0]['panier']['user'].Pays
    axios("http://localhost:8000/api/pays?pays=" + country)
      .then((res) => {
        if (res.data["hydra:totalItems"] !== 0) {
          setPrixPays(res.data["hydra:member"][0].prix)
        }
        else {
          axios("http://localhost:8000/api/pays?pays=autre")
            .then((resp) => {
              setPrixPays(resp.data["hydra:member"][0].prix)
            })
        }
        axios('http://localhost:8000/api/poids?poid=' + weight)
          .then((response) => {
            setPrixPoid(response.data["hydra:member"][0].prix)
          })
      })
  }


  async function DeleteItem(id) {
    const id_panier = id
    article.filter((res) => {
      if (parseInt(res.id) === parseInt(id_panier)) {
        article.splice(article.indexOf(res), 1);
        axios.delete('http://localhost:8000' + res["@id"])
          .then((res) => {
            setLength(article.length)
            setArticle(article)
          })
      }
    })
  }

  article.filter((product) => {
    if (parseInt(product.quantity) === 0) {
      DeleteItem(product.id)
    }
  })

  async function setMoreQuantity(e) {
    let id_panier = e.target.value.substring(21)
    axios("http://localhost:8000/api/panier_articles/" + id_panier)
      .then((response) => {
        let quantité = parseInt(response.data.quantity) + 1
        const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/ld+json" } }
        axios.patch('http://localhost:8000/api/panier_articles/' + id_panier, { quantity: quantité }, configuration)
          .then((res) => {
            setArticle(article)
            setLength(length + 1);
          })
      })
  }

  async function setLessQuantity(e) {
    let id_panier = e.target.value.substring(21)
    axios("http://localhost:8000/api/panier_articles/" + id_panier)
      .then((response) => {
        let quantité = parseInt(response.data.quantity) - 1
        const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/ld+json" } }
        axios.patch('http://localhost:8000/api/panier_articles/' + id_panier, { quantity: quantité }, configuration)
          .then((res) => {
            setArticle(article)
            setLength(length - 1);
          })
      })

  }

  const element = articlevide.splice(0, 3);

console.log(article)
  return (
    <div className='mainPanier'>
      <header><Navbar /></header>
      <div className='titrePanier'>
        <h2>Panier</h2>
      </div>
      <div className='bodyCardPanier'>
        <div className='containeur'>
          {article.length > 0 ? article.filter(product => product.quantity > 0).map((item) => (
            <Card id={"produit-" + item.articles.id} key={article.indexOf(item)} className="panniervisiteurcard">
              <Link to={"/article/" + item.articles.id} className="link_none">
                <Card.Img className='card__imguser' src={item.articles.image} alt={item.articles.titre} />
              </Link>

              <Card.Body className='card__body'>
                <Card.Title className='paniervisiteurtitre' >{item.articles.titre}</Card.Title>
                {item.articles.Size !== false ?
                <Card.Subtitle className='panniervisiteursize'>Taille : {item.size.name}</Card.Subtitle>
                :null}

                {item.quantity === 1 && item.articles.Promo === false ?
                  <Card.Subtitle className='paniervisiteurprice'>{item.articles.prix}</Card.Subtitle>
                  :
                  null
                }
                {item.quantity !== 1 && item.articles.Promo === false ?
                  <Card.Subtitle className='paniervisiteurprice'>{(item.articles.prix * item.quantity).toFixed(2)}</Card.Subtitle>
                  :
                  null
                }
                {item.articles.Promo === true && item.quantity === 1 ?
                  <div>
                    <Card.Subtitle className='card__promo'>Promo !</Card.Subtitle>
                    <Card.Subtitle className='card__reduc'>{item.articles.Reduction}%</Card.Subtitle>
                    <Card.Subtitle className='card__newprice'>{(parseFloat(item.articles.prix) * (1 - parseFloat(item.articles.Reduction) / 100)).toFixed(2)}</Card.Subtitle>
                  </div>
                  :
                  null
                }
                {item.articles.Promo === true && item.quantity !== 1 ?
                  <div>
                    <Card.Subtitle className='card__promo'>Promo !</Card.Subtitle>
                    <Card.Subtitle className='card__reduc'>{item.articles.Reduction}%</Card.Subtitle>
                    <Card.Subtitle className='card__newprice'>{(parseFloat(item.articles.prix) * (1 - parseFloat(item.articles.Reduction) / 100) * item.quantity).toFixed(2)}</Card.Subtitle>
                  </div>
                  :
                  null
                }
                <div className='button'>
                  <button value={item["@id"]} onClick={(e) => setLessQuantity(e)}>-</button>
                  <input id={item["@id"]} type="text" className='changeQuantity' value={item.quantity} readOnly></input>
                  <button value={item["@id"]} onClick={(e) => setMoreQuantity(e)}>+</button>
                  <DeleteForeverIcon className='trash' id={"btn_" + item.articles.id} onClick={() => DeleteItem(item.id)} />
                </div>
              </Card.Body>
            </Card>
          ))

            :
            <div>
              <div className='paniervisiteurdisplay'>
                <p className='paniervide'>PANIER</p>
                <p className='votrepanierestvide'>VOTRE PANIER EST VIDE</p>
                <div className='panniervidenoconnect'>
                  <p>LIVRAISON : 0,00 € </p>
                  <p>0 Articles</p>

                  <p className='totalpaniervisiteur'>TOTAL TTC : {total}€</p>
                  {article !== undefined && article !== null && article.length > 0 ?
                    <button className='btn-commander'><Link className="link-decoration" to={"/connect"}>COMMANDER</Link></button>
                    : null}
                  <Link className="btn-cont" to={"/"}>Continuer mes achats</Link>

                </div>
                <h3>PRODUITS POPULAIRES</h3>
              </div>

              <div className='noproduitpanier'>
                {element.map((item) => (
                  <Link to={"/article/" + item.id} key={item.id} className="link_none">
                    <Card id={"produit-" + item.id} className="card">
                      <Card.Img className='card__imguser' src={item.image} alt={item.titre} />
                      <Card.Body className='card__body'>

                        <Card.Title className='card__title' >{item.titre}</Card.Title>
                        {item.Nouveauté === true ?
                          <Card.Subtitle className='product_nouveau'>Nouveau !</Card.Subtitle>
                          : null}

                        {item.Promo === true ?
                          <div>
                            <Card.Subtitle className='card__promo'>Promo !</Card.Subtitle>
                            <Card.Subtitle className='card__reduc'>{item.Reduction}%</Card.Subtitle>
                            <Card.Subtitle className='card__oldprice'>{item.prix}</Card.Subtitle>
                            <Card.Subtitle className='card__newprice'>{(parseFloat(item.prix) * (1 - parseFloat(item.Reduction) / 100)).toFixed(2)}</Card.Subtitle>
                          </div>
                          :
                          <Card.Subtitle className='card__price'>{item.prix}</Card.Subtitle>
                        }
                      </Card.Body>
                    </Card>
                  </Link>
                ))
                }
              </div>
            </div>
          }
        </div>
        {article.length > 0 ?
          <div className='commander'>
            <p>LIVRAISON : </p>
            <p className='totalpaniervisiteur' id="totalarticle">{quantityTotal} Articles : {total}€</p>
            {article.length > 0 ?
              <div>
                <p id="totalfrais">Livraison à partir de : {weighttotal}€</p>
                <p id="totalTTC">Total TTC : {(parseFloat(total) + parseFloat(weighttotal)).toFixed(2)}€</p>
                <button className='btn-commander'><Link className="link-decoration linkConnected" to={"/paiement"} state={{ data: article, frais: weighttotal, prix: total, poid: PrixPoid}}>Passer commande</Link></button>
              </div>
              : null}
            <br />
            <Link className="btn-cont" to={"/"}>Continuer mes achats</Link>
          </div>
          : null}
      </div>
    </div >
  );

}


export default Panier;

