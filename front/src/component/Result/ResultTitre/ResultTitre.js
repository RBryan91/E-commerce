import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ResultTitre.css";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../NavbarComponent/Navbar/ Navbar"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Sidebar from "../sidebar/SideBar";
import ArianneResult from "../filArianne/ArianneResult";

function ResultSearch() {
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  let categorie = [];
  let souscategorie = [];


  const path = useLocation().pathname.substring(
    useLocation().pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/articles?titre=" + path)

      .then((response) => {
        setProduct(response.data["hydra:member"]);
        setError(null);
      })
      .catch(setError);
  }, [path]);
  if (error) return <p>An error occurred</p>;

  if (product === null) {
    return <p>Loading...</p>;
  }

  product.map((element) => {
    categorie.push(element["categorie"])
    if (element["souscategorie"] !== undefined) {
      souscategorie.push(element["souscategorie"])
    }
  });

  return (
    <div>
      <header className="navResult"><Navbar /></header>
      <ArianneResult></ArianneResult>
      <div className="container-product">
        <div className="SideBarResult"><Sidebar
          titre={path}
          cat={categorie}
          souscat={souscategorie}
        /></div>

        {product.length > 0 ? product.map((item) => (

          <Link to={"/article/" + item.id} key={item.id} style={{textDecoration: "none"}}>
            <Card id={"produit-" + item.id} className="card">
              <Card.Img
                className="card__img"
                src={item.image}
                alt={item.titre} />
              <Card.Body className="card__body">
                <Card.Title className="card__title">
                  {item.titre}
                </Card.Title>
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
          :

          <div className="messageErreur"><p className="">Aucun article ne correspond à votre recherche <SentimentVeryDissatisfiedIcon className="sad" /></p>
            <Link to={"/"} className='retourLink'>Retour à l'accueil</Link>
          </div>}
      </div>
    </div>

  );
}
export default ResultSearch;
