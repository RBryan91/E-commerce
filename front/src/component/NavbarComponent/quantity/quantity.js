import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';



export default function PanierQuantity(ajout) {
  const [error, setError] = useState(false);
  const [article, setArticle] = useState([]);
  const cookies = new Cookies();
  let id_panier = localStorage.getItem("id_panier")



  useEffect(() => {
    if (id_panier !== null && id_panier !== undefined) {
      axios("https://localhost:8000/api/panier_articles?panier=api/paniers/" + id_panier)
        .then((res) => {
          setArticle(res.data["hydra:member"])

          setError(null);
        })
        .catch(setError);
    }
    else {
      setArticle(cookies.get('article'))
    }
  }, [ajout]);


  if (error) return <p>An error occurred</p>
  let totale = [];
  if (article !== null && article !== undefined && article !== []) {
    article.forEach(item => {
      totale.push(item.quantity)
    })
  }
  
  let comptQuantity = 0;
  for (let i = 0; i < totale.length; i++) {
    comptQuantity += Number(totale[i]);
  }

  return (
    <>
      {comptQuantity > 0 && comptQuantity

      }</>
  )
}