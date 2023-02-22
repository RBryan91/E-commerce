import React from 'react';
import "./profilHover.css"
import { Link } from 'react-router-dom';
import ButtonAdmin from '../../NavbarComponent/admin/admin';

export default function ProfilHover() {

    return(
        <div className='profilhoverMain'>
            <div className='profilLinksDiv'>
          
        <Link to={"/profil"} className='profilLinks'>Votre Compte</Link><br></br>
        <Link  to={"/historiqueCommandes"}  className='profilLinks'>Vos Commandes</Link><br></br>
        <ButtonAdmin className="btnAdminHover"></ButtonAdmin>
            </div>
        </div>
    )
}