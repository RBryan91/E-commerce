import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./register.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';


const Register = () => {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Tel, setTel] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [Pays, setPays] = useState("");
  const [Ville, setVille] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [role] = useState(0);
  const [isActive] = useState(1);
  const [id_user, setId_user] = useState(null)
  const navigate = useNavigate();
  const location = useLocation();
  const From = location.state.data;

  useEffect(() => {
    if (id_user !== null) {
      axios.post('http://localhost:8000/api/paniers', {
        "user": "api/users/" + id_user
      })
        .then((res) => {
          const path = res.data["@id"]
          let array = path.split("/")
          const id_panier = array.pop()
          if (cookies.get("article") !== undefined && cookies.get('article').length > 0) {
            let cook = cookies.get("article")
            let article = [];
            let total = 0;
            let weighttotal = 0;
            let weight = 0;
            let PrixPays = 0;
            let PrixPoid = 0;
            let country = "";
            for (let i = 0; i < cook.length; i++) {
              axios.post('http://localhost:8000/api/panier_articles', {
                "panier": "api/paniers/" + id_panier,
                "articles": cook[i]['@id'],
                "quantity": cook[i].quantity,
                "size": "api/sizes/" + cook[i].size
              })
            }
            axios.get("http://localhost:8000/api/panier_articles?panier=" + id_panier)
              .then((res) => {
                article = res.data["hydra:member"];
                cook.map((item) => {
                  weight = weight + parseFloat(item.Poid) * parseInt(item.quantity);

                  item.Promo === true ?

                    total = total + (parseFloat(item.prix) * (1 - parseFloat(item.Reduction) / 100)) * parseInt(item.quantity)
                    :
                    total = total + parseFloat(item.prix) * parseInt(item.quantity)
                })
                total = total.toFixed(2)
                weight = weight.toFixed(1)
                weight = parseFloat(weight)
                weight = Math.round(weight)
                if (weight > 6) {
                  weight = 6
                }
                axios('http://localhost:8000/api/poids?poid=' + weight)
                  .then((response) => {
                    PrixPoid = (response.data["hydra:member"][0].prix)
                  })
                axios('http://localhost:8000/api/users/15')
                  .then((res) => {
                    country = res.data.Pays
                    axios("http://localhost:8000/api/pays?pays=" + country)
                      .then((res) => {
                        if (res.data["hydra:totalItems"] !== 0) {
                          PrixPays = (res.data["hydra:member"][0].prix)
                        }
                        else {
                          axios("http://localhost:8000/api/pays?pays=autre")
                            .then((resp) => {
                              PrixPays = (resp.data["hydra:member"][0].prix)
                            })
                        }
                        weighttotal = parseFloat(PrixPays) + parseFloat(PrixPoid)
                        console.log(article)
                        console.log(weighttotal + "/" + total + "/" + PrixPays + "/" + PrixPoid)
                        cookies.remove('article')
                        if (From === "panier") {
                          navigate('/paiement', { state: { data: article, frais: weighttotal, prix: total, poid: PrixPoid, from: "login" } })
                        }
                        else {
                          navigate("/")
                        }
                      })
                  })
              })
          }
          localStorage.setItem('id_panier', id_panier);
          localStorage.setItem('id', id_user);
          if(From !== "panier"){
          navigate("/")
          }
        })
    }
  }, [id_user, navigate])


  function inscription() {


    if (email === "" || password === "" || Nom === "" || Prenom === "" || Tel === "" || Adresse === "" || Pays === "" || Ville === "" || zipcode === "") {
      alert("Veuillez renseigner tous les champs")
    }
    else {
      const configuration = { headers: { 'Content-Type': "application/json", Accept: "application/json" } }
      axios.post('http://localhost:8000/api/users', { email, password, role, isActive, Nom, Prenom, Tel, Adresse, Pays, Ville, zipcode }, configuration)
        .then((res) => {
          setId_user(res.data.id)
        });
    }
  }
  return (
    <div className='containerRgister col-md-8'>

      <form className='form col-md-3'>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
        </div>

        <div className="form-group">
          <label htmlFor="text">Nom</label>
          <input type="text" className="form-control" onChange={(e) => setNom(e.target.value)} value={Nom} id="nom" aria-describedby="text" placeholder="Enter nom" required></input>
        </div>

        <div className="form-group">
          <label htmlFor="text">Prenom</label>
          <input type="text" className="form-control" onChange={(e) => setPrenom(e.target.value)} value={Prenom} id="prenom" aria-describedby="text" placeholder="Enter prenom" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="text">Tel</label>
          <input type="text" className="form-control" onChange={(e) => setTel(e.target.value)} value={Tel} id="tel" aria-describedby="text" placeholder="Enter tel" required></input>
        </div>

      </form>
      <form className='form col-md-3 '>


        <div className="form-group">
          <label htmlFor="text">Adresse</label>
          <input type="text" className="form-control" onChange={(e) => setAdresse(e.target.value)} value={Adresse} id="adress" aria-describedby="text" placeholder="Enter adress" required></input>
        </div>

        <div className="form-group">
          <label htmlFor="text">City</label>
          <input type="text" className="form-control" onChange={(e) => setVille(e.target.value)} value={Ville} id="city" aria-describedby="text" placeholder="Enter city" required></input>
        </div>

        <div className="form-group">
          <label htmlFor="text">Code Postal</label>
          <input type="text" className="form-control" onChange={(e) => setZipcode(e.target.value)} value={zipcode} id="zipcode" aria-describedby="text" placeholder="Code Postal" required></input>
        </div>

        <div className="form-group">
          <label htmlFor="text">Country</label>
          <input type="text" className="form-control" onChange={(e) => setPays(e.target.value)} value={Pays} id="country" aria-describedby="text" placeholder="Enter country" required></input>
        </div>

        <button id='button' type="button" className="btn btn-primary" onClick={() => inscription()}>S'inscrire</button>
        <div className="form-group btn-ret">
        {From !== "panier" ?
            <Link to="/" className='btn btn-primary btn-retour'>Retour</Link>
            :
            <Link to="/paniervisiteur" className='btn btn-primary btn-retour'>Retour</Link>
          }
        </div>
      </form>

    </div>
  );
};
export default Register;
