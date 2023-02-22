import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./login.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useLocation } from 'react-router-dom';



const Login = () => {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [tableau, setTableau] = useState(null);
  const [role, setRole] = useState(null);
  const [id_user, setId_user] = useState(null);
  const location = useLocation()
  const From = location.state.data

  useEffect(() => {
    if (From === "profil") {
      const ID = localStorage.getItem('id')
      axios('https://localhost:8000/api/users/' + ID)
        .then((res) => {
          setEmail(res.data.email)
        })
    }
    if (tableau === 0) {
      setTableau(null)
      setEmail("")
      setPassword("")
      alert("Email ou mot de passe Incorrect")
    }
    if (tableau === 1) {


      axios.get('https://localhost:8000/api/paniers?user=' + id_user)
        .then((rep) => {
          const path = rep.data["hydra:member"][0]["@id"]
          let array = path.split("/")
          const id_panier = array.pop()
          if (cookies.get("article") !== undefined && cookies.get('article').length > 0) {
            let cook = cookies.get("article")
            console.log(cook)
            let article = [];
            let total = 0;
            let weighttotal = 0;
            let weight = 0;
            let PrixPays = 0;
            let PrixPoid = 0;
            let country = "";
            for (let i = 0; i < cook.length; i++) {
              let id_size = "api/sizes/2"
              if (cook[i].Size === true) {
                id_size = "api/sizes/" + cook[i].size
              }
              axios.post('https://localhost:8000/api/panier_articles', {
                "panier": "api/paniers/" + id_panier,
                "articles": cook[i]['@id'],
                "quantity": cook[i].quantity,
                "size": id_size
              })
            }
            axios.get("https://localhost:8000/api/panier_articles?panier=" + id_panier)
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
                axios('https://localhost:8000/api/poids?poid=' + weight)
                  .then((response) => {
                    PrixPoid = (response.data["hydra:member"][0].prix)
                  })
                axios('https://localhost:8000/api/users/15')
                  .then((res) => {
                    country = res.data.Pays
                    axios("https://localhost:8000/api/pays?pays=" + country)
                      .then((res) => {
                        if (res.data["hydra:totalItems"] !== 0) {
                          PrixPays = (res.data["hydra:member"][0].prix)
                        }
                        else {
                          axios("https://localhost:8000/api/pays?pays=autre")
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
          else {
            if (From === "profil") {
              navigate("/profil", { state: "login" })
            }
            else {
              navigate('/')
            }
          }
          localStorage.setItem('role', role)
          localStorage.setItem('id', id_user)
          localStorage.setItem('id_panier', id_panier)
        })
    }
  }, [tableau, navigate, role, id_user, cookies])


  async function connection(e) {
    e.preventDefault()
    await axios('https://localhost:8000/api/users?email=' + email + '&password=' + password)
      .then((res) => {
        setTableau(res.data["hydra:member"].length)
        setRole(res.data["hydra:member"][0].role);
        setId_user(res.data["hydra:member"][0].id);
        setError(null)

      })
      .catch(setError);
    if (error) return <p>An error occurred</p>
    if (email === "" || password === "") {
      alert("Champs vide")
    }


  }
  return (
    <div className='container cont2 col-md-7'>
      <form className='form2 col-md-5'>
        <div className="form-group emaildiv2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button id='button' type="submit" className="btn btn-primary" onClick={(e) => connection(e)}>Connection</button>
        <div className='form-register link-register'>
          {From !== "profil" ?
            <div>
              <p>Pas encore de compte ?</p>
              <Link to="/register" state={{ data: "home" }} className='btn btn-primary btn-registerlogin'>Inscrivez-vous</Link>
            </div>
            : null}
          {From !== "panier" ?
            <Link to="/" className='btn btn-primary btn-retour'>Retour</Link>
            :
            <Link to="/paniervisiteur" className='btn btn-primary btn-retour'>Retour</Link>
          }
        </div>
      </form>
    </div>


  );
}
export default Login;