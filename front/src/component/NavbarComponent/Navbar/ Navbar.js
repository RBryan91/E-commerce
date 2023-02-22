import { Link } from 'react-router-dom'
import React from 'react'
import './Navbar.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CardCollection from '../card_collection/card_collection'
import BarreRecherche from '../Barre/barre'
import ButtonAdmin from '../admin/admin';
import PanierHover from '../panierHover/panierHover';
import PanierQuantity from '../quantity/quantity';
import PanierVisiteurHover from '../../paniervisiteur/PanierVisiteurHover/PanierVisiteurHover';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfilHover from '../../profil/profilHover/profilHover';

export default function Navbar() {
  const [categorie, setCategorie] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [isShownProfil, setIsShownProfil] = useState(false);
  const [isShownVisit, setIsShownVisit] = useState(false);
  let id_user = localStorage.getItem('id')



  useEffect(() => {
    axios("https://localhost:8000/api/categories")
      .then((response) => {
        setCategorie(response.data["hydra:member"])

      })
  }, []);

  function showPanierHover(){
    setIsShown(true); 
    setIsShownProfil(false);
  }
  function showProfilHover(){
    setIsShown(false); 
    setIsShownProfil(true);
  }
  return (
    <><nav className="Navbar">
      {categorie ?

        <ul className="liste">
          <div className="divlogo1">
            <Link to={"/"}><img src="/images/Image_Navbar/logo.png" className="logo1" alt="costume" /></Link>
          </div>
          <li><Link to={"/result/categorie/" + categorie[0].id}>Costumes</Link></li>
          <li><Link to={"/result/categorie/" + categorie[1].id}>Chemises</Link></li>

          <li className="items" id="collection_btn">Collection <img className='fleche' src='/images/Image_Navbar/fleche-removebg-preview.png' alt="fleche"></img><CardCollection /></li>

          {id_user === null ?
            <li id="panier" onMouseEnter={() => setIsShownVisit(true)}>
              <Link to={"/paniervisiteur"}><img className="logo2" src="/images/Image_Navbar/ajouter-au-panier.png" alt="panier" />
                <PanierQuantity />
              </Link>
            </li>
            :
            <li id="panier" onMouseEnter={()=>showPanierHover() }>
              <Link to={"/panier"}><img className="logo2" src="/images/Image_Navbar/ajouter-au-panier.png" alt="panier" />
                <PanierQuantity />
              </Link>
            </li>
          }

          {id_user != null ?
            <Link to={"/profil"} onMouseEnter={() => showProfilHover()}><AccountCircleIcon className='profilIcon'/></Link>
          :null}
          {id_user === null ?
          <li><Link to={"/login"} state={{data: "home"}}><img className="logo2" src="/images/Image_Navbar/logoprofil.png" alt="costume" /></Link></li>
          : 
          <li><Link to={"/disconnect"}><img className="logo2" src="/images/Image_Navbar/close-door.png" alt="deconnexion" /></Link></li>
          }


          <BarreRecherche></BarreRecherche>

        </ul>
        : null}

    </nav>
      {isShown ? (
        <div onMouseLeave={() => setIsShown(false)}>
          <PanierHover ></PanierHover>
        </div>
      ) : null}

      {isShownVisit ? (
        <div onMouseLeave={() => setIsShownVisit(false)}>
          <PanierVisiteurHover ></PanierVisiteurHover>
        </div>
      ) : null}

      {isShownProfil ? (
        <div onMouseLeave={() => setIsShownProfil(false)}>
          <ProfilHover></ProfilHover>
        </div>
      ) : null}
    </>
  )
}