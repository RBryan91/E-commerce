import React from 'react'
import { useState, useEffect } from 'react';
import './paniervisiteur.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../NavbarComponent/Navbar/ Navbar';
import Cookies from 'universal-cookie';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function PanierVisiteur() {
  const navigate = useNavigate()
  let total = 0;
  let weight = 0;
  let quantityTotal = 0;
  const [length, setLength] = useState(null)
  const cookies = new Cookies();
  const [array, setArray] = useState(null);
  const [articlevide, setArticlevide] = useState([])
  const [PrixPoid, setPrixPoid] = useState(0)

  useEffect(() => {
    setArray(cookies.get('article'))

    if (array === null || array.length === 0 || array === []) {
      axios.get("https://localhost:8000/api/articles")
        .then((res) => {
          setArticlevide(res.data["hydra:member"])
        })
    }
  }, [length]);


  if (array !== null && array !== undefined) {
    array.map((item) => {
      weight = weight + parseFloat(item.Poid) * parseInt(item.quantity)
      quantityTotal = quantityTotal + 1 * parseInt(item.quantity)

      item.Promo === true ?

        total = total + (parseFloat(item.prix) * (1 - parseFloat(item.Reduction) / 100)) * parseInt(item.quantity)
        :
        total = total + parseFloat(item.prix) * parseInt(item.quantity)

    })

    total = total.toFixed(2)
    weight = weight.toFixed(2)
    weight = parseFloat(weight)
    weight = Math.round(weight)
    if (weight > 6) {
      weight = 6
    }
  }
  if (array !== null) {
    axios('https://localhost:8000/api/poids?poid=' + weight)
      .then((res) => {
        setPrixPoid(parseFloat(res.data["hydra:member"][0].prix))
      })
    cookies.set('Frais', PrixPoid)
  }



  if (array !== null && array !== undefined) {
    array.filter((item) => {

      if (parseInt(item.quantity) === 0) {
        DeleteItem(item.Newid)
      }
    })
  }

  function DeleteItem(id) {
    const id_article = id
    array.filter((res) => {
      if (res.Newid !== undefined) {
        if (parseInt(res.Newid) === parseInt(id_article)) {
          delete array.splice(array.indexOf(res), 1)
          setArray(array)
          cookies.set('article', array)
          setLength(array.length)
        }
      }
      else {
        if (parseInt(res.id) === parseInt(id_article)) {
          delete array.splice(array.indexOf(res), 1)
          setArray(array)
          cookies.set('article', array)
          setLength(array.length)
        }
      }
    })
  }
  function setMoreQuantity(e) {
    let id_article = e.target.value.substring(14)

    array.map((item) => {

      if (parseInt(id_article) === parseInt(item.id)) {
        item.quantity = item.quantity + 1;
        setArray(array)
        cookies.set('article', array)
        setLength(length + 1);
      }
    })
  }


  function setLessQuantity(e) {
    let id_article = e.target.value.substring(14)

    array.map((item) => {
      if (parseInt(id_article) === parseInt(item.id)) {
        item.quantity = item.quantity - 1;
        setArray(array)
        cookies.set('article', array)
        setLength(length - 1);
      }
    })
  }

  function commander(){
    if(parseFloat(total) > 500){
      alert("Vous ne pouvez pas dépasser 500€ sans vous connecter")
    }
    else{
      navigate("/connect", {state:{ data: array, frais: PrixPoid, prix: total }})
    }
  }
  const element = articlevide.splice(0, 3);
  return (
    <div>
      <header><Navbar /></header>
      {array === undefined || array === null || array.length === 0 ?
        <div>
          <div className='paniervisiteurdisplay'>
            <p className='paniervide'>PANIER</p>
            <p className='votrepanierestvide'>VOTRE PANIER EST VIDE</p>
            <div className='panniervidenoconnect'>
              <p>LIVRAISON : 0,00 € </p>
              <p>0 Articles</p>

              <p className='totalpaniervisiteur'>TOTAL TTC : {total}€</p>
              {array !== undefined && array !== null && array.length > 0 ?
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
                  <Card.Img className='card__img' src={item.image} alt={item.titre} />
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

        :

        <div className='mainPanier'>
          <div className='titrePanier'>
            <h2>Panier</h2>
          </div>
          <div className='bodyCardPanier'>
            <div className='containeur'>
              {array.map((item) => (
                <Card id={"produit-" + item.id} key={array.indexOf(item)} className="panniervisiteurcard">
                  <Card.Img className='card__img' src={item.image} alt={item.titre} />
                  <Card.Body className='card__body'>
                    <Link to={"/article/" + item.id} className="link_none">
                      <Card.Title className='paniervisiteurtitre'>{item.titre}</Card.Title>
                    </Link>
                    {item.size === 1 ? <Card.Subtitle className='panniervisiteursize'>Taille : S</Card.Subtitle> : null}
                    {item.size === 2 ? <Card.Subtitle className='panniervisiteursize'>Taille : M</Card.Subtitle> : null}
                    {item.size === 3 ? <Card.Subtitle className='panniervisiteursize'>Taille : L</Card.Subtitle> : null}
                    {item.size === 4 ? <Card.Subtitle className='panniervisiteursize'>Taille : XL</Card.Subtitle> : null}

                    {item.quantity === 1 && item.Promo === false ?
                      <Card.Subtitle className='card__price'>{item.prix}</Card.Subtitle>
                      :
                      null
                    }
                    {item.quantity !== 1 && item.Promo === false ?
                      <Card.Subtitle className='card__price'>{(item.prix * item.quantity).toFixed(2)}</Card.Subtitle>
                      :
                      null
                    }
                    {item.Promo === true && item.quantity === 1 ?
                      <div>
                        <Card.Subtitle className='card__promo'>Promo : {item.Reduction}%</Card.Subtitle>
                        <Card.Subtitle className='card__newprice'>{(parseFloat(item.prix) * (1 - parseFloat(item.Reduction) / 100)).toFixed(2)}</Card.Subtitle>
                      </div>
                      :
                      null
                    }
                    {item.Promo === true && item.quantity !== 1 ?
                      <div>
                        <Card.Subtitle className='card__promo'>Promo : {item.Reduction}%</Card.Subtitle>
                        <Card.Subtitle className='card__newprice'>{(parseFloat(item.prix) * (1 - parseFloat(item.Reduction) / 100) * item.quantity).toFixed(2)}</Card.Subtitle>
                      </div>
                      :
                      null
                    }
                    <div className='button'>
                      <button value={item["@id"]} onClick={(e) => setLessQuantity(e)}>-</button>
                      <input type="text" className='changeQuantity' value={item.quantity} readOnly></input>
                      <button value={item["@id"]} onClick={(e) => setMoreQuantity(e)}>+</button>
                      {item.Newid !== undefined ?

                        <DeleteForeverIcon className="trash" id={"btn_" + item.id} onClick={() => DeleteItem(item.Newid)} />
                        :
                        <DeleteForeverIcon className="trash" id={"btn_" + item.id} onClick={() => DeleteItem(item.id)} />
                      }
                    </div>

                  </Card.Body>
                </Card>

              ))
              }
            </div>
            <div className='commander'>
              <p className='totalpaniervisiteur'>{quantityTotal} Articles : {total}€</p>
              {array !== undefined && array !== null && array.length > 0 ?
                <div>
                  <p id="totalfrais">Livraison à partir de : {parseFloat(PrixPoid) + 4}€</p>
                  <p className='totalpaniervisiteur'>Total TTC : {(parseFloat(total) + parseFloat(PrixPoid) + 4).toFixed(2)}€</p>
                  <button className='btn-commander commandeVisiteur' onClick={commander}>Passer commande</button>
                </div>
                : null}
              <br />
              <Link className="btn-cont" to={"/"}>Continuer mes achats</Link>
            </div>
          </div>
        </div>
      }
    </div>

  )
}

export default PanierVisiteur;
