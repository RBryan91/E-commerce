import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./card_collection.css";
export default function Card_collection() {


  const [error, setError] = useState(false);
  const [categorie, setCategorie] = useState(null);
  const [SousCategorie, setSousCategorie] = useState(null);





  useEffect(() => {
    axios("http://localhost:8000/api/categories")
      .then((response) => {
        setCategorie(response.data["hydra:member"])
        setError(null);
      })
      .catch(setError);

    axios("http://localhost:8000/api/souscategories")
      .then((res) => {
        setSousCategorie(res.data["hydra:member"])
        setError(null);
      })
      .catch(setError);

  }, []);
  if (error) return <p>An error occurred</p>
  return (

    <div className='collection'>
      {SousCategorie && categorie ?
        <div className='text-collection'>
          <div className='Vetement'>
            <h1><Link to={"/result/categorie/" + categorie[2].id}>Vêtements</Link></h1>
            <ul className='Vetement_ul'>
              <li><Link to={"/result/souscategorie/" + SousCategorie[3].id}>Pantalon</Link></li>
              <li><Link to={"/result/souscategorie/" + SousCategorie[4].id}>Gilet</Link></li>
              <li><Link to={"/result/souscategorie/" + SousCategorie[5].id}>Veste</Link></li>
              <li><Link to={"/result/souscategorie/" + SousCategorie[6].id}>Pull</Link></li>
              <li><Link to={"/result/souscategorie/" + SousCategorie[7].id}>Manteaux</Link></li>
            </ul>
          </div>
          <div className='Accessoire'>
            <h1><Link to={"/result/categorie/" + categorie[3].id}>Accessoire</Link></h1>
            <ul className='Accesoire_ul'>
              <li><Link to={"/result/souscategorie/" + SousCategorie[0].id}>Cravate</Link></li>
              <li><Link to={"/result/souscategorie/" + SousCategorie[1].id}>Chaussures</Link></li>
              <li><Link to={"/result/souscategorie/" + SousCategorie[2].id}>Ceinture</Link></li>
              <li><Link to={"/result/souscategorie/" + SousCategorie[8].id}>Echarpes</Link></li>

            </ul>
          </div>
        </div>
        : null}
    </div>

  )
}


