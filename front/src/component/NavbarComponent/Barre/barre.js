import React from 'react';
import "./barre.css"
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function BarreRecherche() {
  const [article, setArticle] = useState("");
  const navigate = useNavigate();
  const [loupe, SetLoupe] = useState(true);
  const [barre, SetBarre] = useState(false);
  const [product, setProduct] = useState(null);


  useEffect(() => {
    axios
      .get("https://localhost:8000/api/articles?titre=")

      .then((response) => {
        setProduct(response.data["hydra:member"]);
      })

  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value
    const newFilter = product.filter((item) => {
      return item.titre.toLowerCase().includes(searchWord.toLowerCase());
    })
    if (searchWord === "") {
      setArticle([]);
    } else {
      setArticle(newFilter);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      SearchArticle();
    }
  }

  function SearchArticle() {
    let valInput = document.getElementById("searchBarre").value;
    if (valInput !== "") {
      SetLoupe(true)
      SetBarre(false)
      navigate("/result/" + valInput);
    } else {
      alert("Veuillez écrire quelques choses dans la barre de recherche!");
    }
  }

  function Click() {

    SetLoupe(false)
    SetBarre(true)

  }
  function UnClick() {
    SetLoupe(true)
    SetBarre(false)
  }
  return (
    <div className='container_recherche'>
      <div className='search'>
        {(loupe ? <div className='searchIcon'> <button onClick={Click}><SearchIcon className='icon' /></button> </div> : <div className='croixIcone'> <button onClick={UnClick}><CloseIcon className='icon' /></button></div>)}
      </div>
      <div className='searchInputs'>
        {(barre ? <><div className='searchInputs'> <input type="text" className='inID' id='searchBarre' onChange={handleFilter} placeholder="Recherche" onKeyDown={handleKeyDown} required />

          <div className='searchIcon2'> <button onClick={SearchArticle}><SearchIcon className='icon' /></button> </div>

        </div>
          {(article.length !== 0 ?
            <div className='InstResult'>
              {article.map((item) => (
                <>
                  <div className='imageCd'>
                    <Link to={"/article/" + item.id} className="link_none">
                      <Card.Img className='searchCard__img' src={item.image} alt={item.titre} />
                    </Link>
                  </div>
                  <div className='bodyCd'>
                    <Card id={"produit-" + item.id} className="searchCadre">
                      <Link to={"/article/" + item.id} className="link_none">

                        <Card.Body className='searchCard__body'>
                          <Card.Title className='searchCard__title'>{item.titre}</Card.Title>
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
                      </Link>

                    </Card>
                  </div></>

              ))}

            </div> : null)}</>
          : null)}
      </div>
    </div>
  )
}