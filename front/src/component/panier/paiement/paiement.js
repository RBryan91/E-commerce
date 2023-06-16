import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './paiement.css';
import Navbar from '../../NavbarComponent/Navbar/ Navbar';


export default function Paiement() {
  const [carte, setCarte] = useState("");
  const [cvc, setCvc] = useState("");
  const [date, setDate] = useState("");
  const [livraison, setLivraison] = useState("");
  const [fraistotal, setFraistotal] = useState(0);
  const [tariflivraison, setTariflivraison] = useState([])
  const [knownPaye, setKnownPaye] = useState(false)
  const [articles,setArticles] =useState(useLocation().state.data)
  const [frais, setFrais] = useState(useLocation().state.frais)
  const PrixPoid = useLocation().state.poid
  const total = useLocation().state.prix
  const [paiement, setPaiement] = useState(null);
  const navigate = useNavigate();
  const [livraisonSelect, setLivraisonSelect] = useState(0)
  const [knownAdresse, setKnownAdresse] = useState(true)
  const [adresse, setAdresse] = useState("");
  const [adressebis, setAdressebis] = useState("");
  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [userAdresse, setUserAdresse] = useState("");
  const [checked, setCheked] = useState(false)
  const [user_id, setUser_id] = useState("");
  const from = useLocation().state.from;
  const id_panier = localStorage.getItem('id_panier')

  const id_user = localStorage.getItem('id')

  useEffect(() => {
    axios('http://localhost:8000/api/users/' + id_user)
      .then((response) => {
        setUser_id(response.data['@id'])
        setUserAdresse(response.data.Adresse)
        if (response.data.paiement !== undefined) {
          setPaiement(response.data.paiement)
          setKnownPaye(true)
        }
      })
    if(from === "login"){
      axios.get("http://localhost:8000/api/panier_articles?panier=" + id_panier)
        .then((res)=>{
          setArticles(res.data["hydra:member"])
        })
    }
    axios('http://localhost:8000/api/livraisons')
      .then((res) => {
        setTariflivraison(res.data['hydra:member'])
      })
  }
    , [fraistotal])

  function radiochange(e) {
    setLivraison(e.target.value,);
    axios.get('http://localhost:8000/api/livraisons?methode=' + e.target.value)
      .then((res) => {
        setLivraisonSelect(parseFloat(res.data['hydra:member'][0].prix))
      })
  }

  function commande(e) {
    e.preventDefault()
    if (knownPaye === true && knownAdresse === true) {
      if (livraison === "") {
        alert("Veuillez choisir un mode de livraison")
      }
      else {
        axios.get('http://localhost:8000/api/livraisons?methode=' + livraison)
          .then((res) => {
            setFraistotal(parseFloat(frais) + parseFloat(res.data['hydra:member'][0].prix))
          })
      }
    }

    if (knownPaye !== true && knownAdresse === true) {
      if (carte === "" || cvc === "" || livraison === "" || date === "") {
        alert("Veuillez renseigner tous les champs")
      }
      else {
        axios.get('http://localhost:8000/api/livraisons?methode=' + livraison)
          .then((res) => {
            setFraistotal(parseFloat(frais) + parseFloat(res.data['hydra:member'][0].prix))
          })
      }
      if (checked === true) {
        const configuration = { headers: { 'Content-Type': "application/json", Accept: "application/ld+json" } }
        axios.post('http://localhost:8000/api/paiements', {
          "user": user_id,
          "carte": carte,
          "CVC": cvc,
          "date": date
        }, configuration)
      }
    }

    if (knownAdresse !== true && knownPaye === true) {
      if (adresse === "" || ville === "" || pays === "" || zipcode === "") {
        alert("Veuillez renseigner tous les champs")
      }
      else {
        axios.get('http://localhost:8000/api/pays?pays=' + pays)
          .then((res) => {
            if (res.data["hydra:totalItems"] !== 0) {
              let fraisPays = (parseFloat(res.data['hydra:member'][0].prix))
              axios.get('http://localhost:8000/api/livraisons?methode=' + livraison)
                .then((res) => {
                  setFraistotal(fraisPays + parseFloat(PrixPoid) + parseFloat(res.data['hydra:member'][0].prix))
                  setFrais(fraisPays + parseFloat(PrixPoid))
                })
            }
            else {
              axios.get('http://localhost:8000/api/pays?pays=autre')
                .then((res) => {
                  let fraisPays = (parseFloat(res.data['hydra:member'][0].prix))
                  axios.get('http://localhost:8000/api/livraisons?methode=' + livraison)
                    .then((res) => {
                      setFraistotal(fraisPays + parseFloat(PrixPoid) + parseFloat(res.data['hydra:member'][0].prix))
                      setFrais(fraisPays + parseFloat(PrixPoid))
                    })
                })
            }
          })
      }
    }

    if (knownAdresse !== true && knownPaye !== true) {
      if (carte === "" || cvc === "" || livraison === "" || date === "" || adresse === "" || ville === "" || pays === "" || zipcode === "") {
        alert("Veuillez renseigner tous les champs")
      }
      else {
        axios.get('http://localhost:8000/api/pays?pays=' + pays)
          .then((res) => {
            if (res.data["hydra:totalItems"] !== 0) {
              let fraisPays = (parseFloat(res.data['hydra:member'][0].prix))
              axios.get('http://localhost:8000/api/livraisons?methode=' + livraison)
                .then((res) => {
                  setFraistotal(fraisPays + parseFloat(PrixPoid) + parseFloat(res.data['hydra:member'][0].prix))
                  setFrais(fraisPays + parseFloat(PrixPoid))
                })
            }
            else {
              axios.get('http://localhost:8000/api/pays?pays=autre')
                .then((res) => {
                  let fraisPays = (parseFloat(res.data['hydra:member'][0].prix))
                  axios.get('http://localhost:8000/api/livraisons?methode=' + livraison)
                    .then((res) => {
                      setFraistotal(fraisPays + parseFloat(PrixPoid) + parseFloat(res.data['hydra:member'][0].prix))
                      setFrais(fraisPays + parseFloat(PrixPoid))
                    })
                })
            }
          })
        if (checked === true) {
          const configuration = { headers: { 'Content-Type': "application/json", Accept: "application/ld+json" } }
          axios.post('http://localhost:8000/api/paiements', {
            "user": user_id,
            "carte": carte,
            "CVC": cvc,
            "date": date
          }, configuration)
        }
      }
    }
  }

  function modifPaye(e) {
    e.preventDefault()
    console.log(paiement)
    setKnownPaye(false)
  }

  function modifAdresse(e) {
    e.preventDefault()
    setKnownAdresse(false)
  }

  function cancelPaye(e) {
    e.preventDefault()
    setKnownPaye(true)
  }

  function cancelAdresse(e) {
    e.preventDefault()
    setKnownAdresse(true)
  }

  function Validation() {
    console.log(fraistotal)
    navigate("/recapitulatif", { state: { fraistotal, articles, total } })
  }

  function handleCheck() {
    setCheked(!checked)
  }

  return (
    <div>  
      {fraistotal !== 0 ?
        <div className='form-style-4'>
          <h2>Validation de commande</h2>
          {knownAdresse === true ?
            <p className='pdeladiv'>Adresse : {userAdresse}</p>
            :
            <div>
              <p className='pdeladiv'> Adresse : {adresse}</p>
              <p className='pdeladiv'> Ville : {ville}</p>
              <p className='pdeladiv'>CodePostale : {zipcode}</p>
              <p className='pdeladiv'> Pays : {pays}</p>
            </div>
          }
          <div>
            {articles.map((item) => (
              <p className='pdeladiv' key={articles.indexOf(item)}>{item.articles.titre} x {item.quantity} : {parseFloat(item.articles.prix) * parseInt(item.quantity)} €</p>
            ))}
          </div>
          <p className='pdeladiv'>Total articles : {total} €</p>
          <p className='pdeladiv'>Frais de livraison : {fraistotal} €</p>
          <p className='pdeladiv'>Total TTC : {parseFloat(total)+parseFloat(fraistotal)} €</p>
          <div className='inputtypesumbit'>
            <input  onClick={() => setFraistotal(0)} type="submit" value="RETOUR" />
            <input  onClick={Validation} type="submit" value="VALIDER MA COMMANDE" />
          </div>    
        </div>
        :
        <div>
          <header><Navbar /></header>
          <div className=''>
          
            {knownAdresse !== true ?
            <div className='containerpaiementvisiteurrrr'>
              
              <form className='formee'>
                <div className="namepaiementvisiteur">
                <label htmlFor="adresse"></label>
                  <input
                    id="name_input"
                    value={adresse}
                    onChange={e => setAdresse(e.target.value)}
                    placeholder="Adresse"
                    type="text"
                    name="adresse"
                    required
                  />
                </div>
                <div className="emailpaiementvisiteur">
                  <label htmlFor="adresseBis"></label>
                  <input
                    id="email_input"
                    value={adressebis}
                    onChange={e => setAdressebis(e.target.value)}
                    placeholder="Complément d'adresse"
                    type="text"
                    name="adresseBis"
                    required
                  />
                </div>
                <div className='namepaiementvisiteur'>
                  <label htmlFor="ville"></label>
                  <input
                    id="name_input"
                    value={ville}
                    onChange={e => setVille(e.target.value)}
                    placeholder="Ville"
                    type="text"
                    name="ville"
                    required
                  />
                </div>
                <div className='emailpaiementvisiteur'>
                  <label htmlFor="zipcode"></label>
                  <input
                    id="email_input"
                    value={zipcode}
                    onChange={e => setZipcode(e.target.value)}
                    placeholder="Code postal"
                    type="text"
                    name="zipcode"
                    required
                  />
                </div>
                <div className='namepaiementvisiteur'>
                  <label htmlFor='pays'></label>
                  <input
                    id="name_input"
                    value={pays}
                    onChange={e => setPays(e.target.value)}
                    placeholder="Pays"
                    type="text"
                    name="pays"
                    required
                  />
                </div>
                <div className="submitpaiementvisiteur">
                  <button type="submit" id="form_buttonpaiementvisiteurrrr"  onClick={(e) => cancelAdresse(e)}>Annuler</button>
                </div>
              </form>
            </div>
              
              :
              <div className='adresseknown'>
                <p>Adresse enregistré :</p>
                <p>{userAdresse}</p>
                <button class="butondepaiementvs btn-white" onClick={(e) => modifAdresse(e)}>Utiliser une autre adresse</button>
              </div>
              
            }
          </div>

          <div>
            {knownPaye !== true ?
              <form className='containerpaiementvisiteurrrr form22'>
                <div className='emailpaiementvisiteur'>
                <label htmlFor='carte'></label>
                <input
                  value={carte}
                  onChange={e => setCarte(e.target.value)}
                  placeholder="Numero de carte"
                  id='email_input'
                  type="text"
                  name="carte"
                  required
                />
                </div>
                <div className='namepaiementvisiteur'>
                <input
                  value={cvc}
                  onChange={e => setCvc(e.target.value)}
                  placeholder="CVC"
                  type="text"
                  name="cvc"
                  id='name_input'
                  required
                />

                </div>
                <div className='emailpaiementvisiteur'>
                <input
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  placeholder="Date d'expiration"
                  type="text"
                  name="date"
                  id='name_input'
                  required
                />

                </div>
                <div className='emailpaiementvisiteur'>
                  <label>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={handleCheck}
                    />
                    Enregistrer ce moyen de paiement pour mes futurs achats
                  </label>
                </div>
                {paiement !== null ?
                  <button type="submit" id="form_buttonpaiementvi"   onClick={(e) => cancelPaye(e)}>Annuler</button>
                  : null}
              </form>
              :
              <div className='paiementknown'>
                
                  <p className='whitepp'>Moyen de Paiement enregistré :</p>
                  <p className='whitepp'>Carte finissant par {paiement.carte.substring(12)}</p>  
                <button class="butondepaiementvs btn-white" onClick={(e) => modifPaye(e)}>Utiliser un autre moyen de paiement</button>
              </div>
            }
            <div className="radiopaiement" onChange={radiochange}>
            <div className='radiopimp'>
              {tariflivraison.map((item) => (
                
                  <label className='radio' key={item.id}>
                    <input name='livraison' type="radio" value={item.methode}></input>
                    <span>{item.methode} {item.prix}€</span>
                  </label>
                
                
              ))}
            </div>
              <p>Total à payer :{(parseFloat(total) + parseFloat(frais) + parseFloat(livraisonSelect)).toFixed(2)}</p>
              <button className='butondepaiementvs' type="submit" onClick={(e) => commande(e)}>Commander</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
} 
