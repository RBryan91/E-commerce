import { Link } from "react-router-dom";
import './connect.css';
import { useLocation } from "react-router-dom";

export default function Connect(){
    const location = useLocation()
    const frais = location.state
    const array = frais.data
    const PrixPoid = frais.frais
    const total = frais.prix
    console.log(total)
    return (
    <div className="containerr">
        <header>
            <h1>
                    <img src={"http://tfgms.com/sandbox/dailyui/logo-1.png"} alt={"Authentic Collection"}/>
            </h1>
        </header>
        <h1 className="text-center">Vous n'etes pas connecté !</h1>
        <form className="registration-form">
            <div className="text-center">
            <Link  to={"/register"} state={{data: "panier"}}><button className="submit" name="register">S'inscrire</button></Link>
            <Link  to={"/login"} state={{data: "panier"}}><button className="submit" name="register"> Se Connecter</button></Link>
            </div>
            <div className="text-centerSansCo">
                <Link to={"/paiementVisiteur"} state={{ data: array, frais: PrixPoid, prix: total }} className="sansconnection">Passer au paiement sans me connecter</Link>
            </div>
        </form>
        <div id="div-cnt-achat">
        <Link to={"/"} id="cnt-achat">Continuer vos achats</Link>
        </div>
        
    </div>   
    )
}