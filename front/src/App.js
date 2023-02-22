import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Component } from 'react';
import AdminPannel from './component/pannel_admin/Admin_pannel';
import SingleProduct from './component/single_product_page/single_product_page';
import Register from './component/register/register';
import Login from './component/login/login';
import ResultCategorie from './component/Result/ResultCategorie/ResultCategorie';
import ResultSousCategorie from './component/Result/ResultSousCategorie/ResultSousCategorie';
import ResultSearch from './component/Result/ResultTitre/ResultTitre';
import Panier from './component/panier/panier';
import Disconnect from './component/NavbarComponent/disconnect';
import Home from './component/Home/Home';
import ResultFilter from './component/Result/ResultFilter/ResultFilter';
import PanierVisiteur from './component/paniervisiteur/paniervisiteur';
import Connect from './component/paniervisiteur/connect/connect';
import Paiement from './component/panier/paiement/paiement';
import PaiementVisiteur from './component/paniervisiteur/paiementVisiteur/paiementVisiteur';
import RecapCommande from './component/RecapCommande/RecapCommande'
import RecapVisiteur from './component/paniervisiteur/RecapVisiteur/RecapVisiteur';
import Profil from './component/profil/profil';
import HistoriqueCommandes from './component/historiqueCommandes/commandes';
import ModifPaiement from './component/profil/modifPaiement/modifPaiement';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        </div>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>;
          <Route exact path="/register" element={<Register />}></Route>;
          <Route exact path="/" element={<Home />}></Route>;
          <Route path="/admin/*" element={<AdminPannel />}></Route>
          <Route path="/article/:id" element={<SingleProduct />}></Route>
          <Route path="/result/categorie/:id" element={<ResultCategorie />}></Route>
          <Route path="/result/souscategorie/:id" element={<ResultSousCategorie />}></Route>
          <Route path="/result/:titre" element={<ResultSearch />}></Route>
          <Route path="/result/:titre/CAT/:cat" element={<ResultFilter />}></Route>
          <Route path="/result/:titre/SCAT/:cat" element={<ResultFilter />}></Route>
          <Route path="/panier" element={<Panier />}></Route>
          <Route path="/paniervisiteur" element={<PanierVisiteur />}></Route>
          <Route path="/connect" element={<Connect />}></Route>
          <Route path="/paiement" element={<Paiement />}></Route>
          <Route path="/paiementVisiteur" element={<PaiementVisiteur />}></Route>
          <Route path="/disconnect" element={<Disconnect />}></Route>
          <Route path="/recapitulatif" element={<RecapCommande />}></Route>
          <Route path="/recapitulatifVisiteur" element={<RecapVisiteur />}></Route>
          <Route path="/profil" element={<Profil/>}></Route>
          <Route path="/historiqueCommandes" element={<HistoriqueCommandes/>}></Route>
          <Route path="/modifPaiement" element={<ModifPaiement/>}></Route>
        </Routes>
      </Router>
    );
  }
}

