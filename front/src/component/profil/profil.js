import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './profil.css';
import Navbar from "../NavbarComponent/Navbar/ Navbar";
import { Link } from "react-router-dom";


export default function Profil() {
    const id_user = localStorage.getItem('id');
    const navigate = useNavigate();
    const location = useLocation()
    const [users, setUsers] = useState([]);
    const [modif, setModif] = useState(false);

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pays, setPays] = useState("");
    const [Adresse, setAdresse] = useState("");
    const [Tel, setTel] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [Ville, setVille] = useState("");



    useEffect(() => {
        if (location.state !== "login") {
            navigate("/login", { state: { data: "profil" } })
        }
        else {
            axios("http://localhost:8000/api/users/" + id_user)
                .then((response) => {
                    setUsers(response.data)
                    setNom(response.data.Nom)
                    setPrenom(response.data.Prenom)
                    setEmail(response.data.email)
                    setPassword(response.data.password)
                    setPays(response.data.Pays)
                    setAdresse(response.data.Adresse)
                    setVille(response.data.Ville)
                    setTel(response.data.Tel)
                    setZipcode(response.data.zipcode)
                })
        }
    }, [])

    function modifier() {
        setModif(true);
    }

    function savemodif() {
        if (nom !== "" && prenom !== "" && email !== "" && password !== "" && pays !== "" && Adresse !== "" && Ville !== "" && Tel !== "" && zipcode !== "") {
            users.Nom = nom
            users.Prenom = prenom
            users.email = email
            users.password = password
            users.Pays = pays
            users.Adresse = Adresse
            users.Ville = Ville
            users.Tel = Tel
            users.zipcode = zipcode

            const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/ld+json" } }
            axios.patch('http://localhost:8000/api/users/' + id_user,
                {
                    email: users.email,
                    password: users.password,
                    Nom: users.Nom,
                    Prenom: users.Prenom,
                    Tel: users.Tel,
                    Adresse: users.Adresse,
                    Ville: users.Ville,
                    zipcode: users.zipcode
                }
                , configuration)
            setModif(false)
        }
        else {
            alert("Veuillez renseigner tous les champs")
        }
    }

    console.log(users)

    return (
        users !== [] && users.length !== 0 ?

            <div className="mainprofiluser">
                <header><Navbar></Navbar></header>
                {modif === false ?

                 <div className='containerProfil col-md-8'>
                 <form className='form col-md-3'>
                 
                 <div className="form-group">
                   <label htmlFor="exampleInputEmail1">Nom</label>
                   <p className="form-control" id="exampleInputEmail1">{users.Nom}</p>
                 </div>
                 <div className="form-group">
                   <label htmlFor="exampleInputPassword1">Prenom</label>
                   <p className="form-control" id="exampleInputPassword1">{users.Prenom}</p>
                 </div>

                 <div className="form-group">
                   <label htmlFor="text">Email</label>
                   <p className="form-control" id="nom">{users.email}</p>
                 </div>

                 <div className="form-group">
                   <label htmlFor="text">Password</label>
                   <p className="form-control" id="prenom">{users.password}</p>
                 </div>
                 <div className="form-group">
                   <label htmlFor="text">Pays</label>
                   <p className="form-control" id="tel">{users.Pays}</p>
                   <button id='buttonprofilchange' type="button" className="btn btn-primary"  onClick={modifier}>Modifier mes informations</button>
                 </div>

                   </form>
                   <form className='form col-md-3 '>

                   <div className="form-group">
                     <label htmlFor="text">Ville</label>
                     <p className="form-control" id="adress">{users.Adresse}</p>
                   </div>

                   <div className="form-group">
                     <label htmlFor="text">Adresse</label>
                     <p className="form-control" id="city">{users.Ville}</p>
                   </div>

                   <div className="form-group">
                     <label htmlFor="text">Tel</label>
                     <p className="form-control" id="zipcode" >{users.Tel}</p>
                   </div>

                   <div className="form-group">
                     <label htmlFor="text">ZipCode</label>
                     <p className="form-control" id="country">{users.zipcode}</p>
                   </div>
                   {users.paiement !== undefined ?
                            <div className="form-group">
                                <p>Moyen de paiement enregistré : </p>
                                <p>Carte finissant par {(users.paiement.carte).substring(12)}</p>
                                <button id="buttonnnn" className="btn btn-primary" ><Link id="linkkk" to={"/modifPaiement"} state={{ data: users }}>Modifier moyen de paiement</Link></button>
                            </div>
                            :
                            <div className="form-group">
                                <p>Aucun moyen de paiement enregistré</p>
                               <button id='button' type="button" className="btn btn-primary"><Link to={"/modifPaiement"} state={{ data: users }}>Ajouter un moyen de paiement</Link></button> 
                            </div>
                        }
                     
                 </form>

             </div>


                    :
                <div className='containerRgister col-md-8'>
                    <form className='form col-md-3'>
                    
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Nom</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" value={nom} onChange={e => setNom(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Prenom</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" value={prenom} onChange={e => setPrenom(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="text">Email</label>
                      <input type="text" className="form-control" id="nom" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="text">Password</label>
                      <input type="text" className="form-control" id="prenom" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="text">Pays</label>
                      <input type="text" className="form-control" id="tel" value={pays} onChange={e => setPays(e.target.value)} />
                    </div>

                      </form>
                      <form className='form col-md-3 '>

                      <div className="form-group">
                        <label htmlFor="text">Ville</label>
                        <input type="text" className="form-control" id="adress" value={Ville} onChange={e => setVille(e.target.value)} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="text">Adresse</label>
                        <input type="text" className="form-control" id="city" value={Adresse} onChange={e => setAdresse(e.target.value)} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="text">Tel</label>
                        <input type="text" className="form-control" id="zipcode" value={Tel} onChange={e => setTel(e.target.value)} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="text">ZipCode</label>
                        <input type="text" className="form-control" id="country" value={zipcode} onChange={e => setZipcode(e.target.value)} />
                      </div>

                      <button id='button' type="button" className="btn btn-primary" onClick={savemodif}>Enregistrer les modifications</button>
                        
                    </form>

                </div>
            
                }
            </div>

            : null

    )
}

