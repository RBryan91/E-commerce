import axios from 'axios'
import './single_card.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../NavbarComponent/Navbar/ Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import './single_card.css';
import Bread from '../Result/breadcrumpSingle/breadcrumpSingle';
import PanierHover from '../NavbarComponent/panierHover/panierHover';
import PanierQuantity from '../NavbarComponent/quantity/quantity';
import Cookies from 'universal-cookie';
import PanierVisiteurHover from '../paniervisiteur/PanierVisiteurHover/PanierVisiteurHover'
import { Link } from 'react-router-dom';

export default function SingleProduct() {
    const [product, setProduct] = useState({});
    const path = useParams();
    const [isShown, setIsShown] = useState(false);
    const [isShownVisit, setIsShownVisit] = useState(false);
    const [size, setSize] = useState(2);
    const [stock, setStock] = useState(0);
    const [color, setColor] = useState(false);
    const [list, setList] = useState(null)
    const cookies = new Cookies();
    const [comments, setComments] = useState(null)
    const [avis, setAvis] = useState("")
    const [change, setChange] = useState(false)


    let id = localStorage.getItem('id')

    useEffect(()=> {
        setChange(false)
    },[change])

    useEffect(() => {
        axios("http://localhost:8000/api/comments?article=" + path.id)
            .then((resp) => {
                if (resp.data["hydra:totalItems"] !== 0) {
                    setComments(resp.data["hydra:member"])
                }
            })
    }, [avis,change])


    useEffect(() => {
        setInterval(() => {
            setIsShown(false);
            setIsShownVisit(false)
        }, 3000);
        

        axios("http://localhost:8000/api/articles/" + path.id)
            .then((response) => {
                setProduct(response.data)
                setColor(response.data.color)
                let tabId = cookies.get('click')
                if (tabId === undefined) {
                    cookies.set('click', [path.id])
                    const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/json" } }
                    axios.patch('http://localhost:8000/api/articles/' + path.id, { click: response.data["click"] + 1 }, configuration)
                }
                else {
                    if (tabId.indexOf(path.id) === -1) {
                        const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/json" } }
                        axios.patch('http://localhost:8000/api/articles/' + path.id, { click: response.data["click"] + 1 }, configuration)
                        tabId.push(path.id)
                        cookies.set('click', tabId)
                    }
                }
            })


        axios("http://localhost:8000/api/stocks?articles=" + path.id + "&size=" + size)
            .then((response) => {
                if (response.data["hydra:totalItems"] !== 0) {
                    setStock(response.data["hydra:member"][0].NBStock)
                }
                else {
                    setStock(null)
                }
            })

    }, [size,change]);

    useEffect(() => {
        if (color === true) {
            let titre = product.titre.split(" ").shift()
            axios("http://localhost:8000/api/articles?titre=" + titre + "&color=true")
                .then((res) => {
                    setList(res.data["hydra:member"])
                })
        }
    }, [color,change])


    function AddPanier(e) {
        let id_article = "api/articles/" + e.currentTarget.id.substring(4);
        let id_panier = "api/paniers/" + localStorage.getItem('id_panier');
        let id_size = "api/sizes/" + size;

        axios("http://localhost:8000/api/panier_articles?panier=" + id_panier + "&articles=" + id_article + "&size=" + id_size)
            .then((response) => {
                let NumberArticle = response.data["hydra:totalItems"];

                if (NumberArticle === 0) {
                    const configuration = { headers: { 'Content-Type': "application/json", Accept: "application/json" } }
                    axios.post("http://localhost:8000/api/panier_articles", { "panier": id_panier, "articles": id_article, "quantity": 1, "size": id_size }, configuration)
                }

                if (NumberArticle !== 0) {
                    let id = response.data["hydra:member"][0].id
                    axios("http://localhost:8000/api/panier_articles/" + id)
                        .then((response) => {
                            const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/json" } }
                            axios.patch('http://localhost:8000/api/panier_articles/' + id, { quantity: response.data["quantity"] + 1 }, configuration)
                        })

                }
            setIsShown(true);
            })
        

    }
    function AddPanierVisiteur() {
        const description = product.description;
        delete product.description
        delete product["@context"]
        delete product["@type"]
        delete product.categorie
        delete product.click
        delete product.nbStock
        delete product.enRupture
        const cookies = new Cookies();
        if (cookies.get('article') === undefined) {

            product.quantity = 1
            if (product.Size === true) {
                product.Newid = product.id + size.toString()
                product.size = parseInt(size)
            }
            cookies.set('article', [product])
        }
        else {
            let compt = 0
            let mookie = cookies.get('article')
            mookie.map((item) => {
                if (item.id === product.id && parseInt(item.size) === parseInt(size)) {
                    item.quantity = item.quantity + 1;
                    compt++;
                }
            })
            if (compt > 0) {
                cookies.set('article', mookie)
            }
            else {
                let value = cookies.get("article")
                product.quantity = 1
                if (product.Size === true) {
                    product.Newid = product.id + size.toString()
                    product.size = parseInt(size)
                }
                value.push(product)
                cookies.set('article', value)

            }
        }
        product.description = description;
        setIsShownVisit(true);
    }

    function commenter() {
        if (avis !== "") {
            const configuration = { headers: { 'Content-Type': "application/json", Accept: "application/ld+json" } }
            axios.post('http://localhost:8000/api/comments', {
                "article": "api/articles/" + path.id,
                "user": "api/users/" + id,
                "message": avis
            }, configuration)
            .then((response)=>setAvis(""))
        }
    }

    function switche(){
        setChange(true)
    }

    return (
        <div className='main'>
            <header>
                <Navbar> <PanierQuantity ajout={1}></PanierQuantity></Navbar>
                {isShown ? (
                    <div onMouseLeave={() => setIsShown(false)}>
                        <PanierHover ajout={1}></PanierHover>
                    </div>
                ) : null}
                {isShownVisit ? (
                    <div onMouseLeave={() => setIsShownVisit(false)}>
                        <PanierVisiteurHover ajout={1}></PanierVisiteurHover>
                    </div>
                ) : null}
            </header>
            <Bread></Bread>
            <div className="Single_product">
                <div className="img_product">
                    <img
                        src={product.image}
                        alt={product.titre}
                    />
                    {color === true && list !== null ?
                        <div className="img_color_list_container">
                            {list.map((element) => (
                                <Link to={"/article/" + element.id} key={element.id} onClick={switche}>
                                    <img id='img_color_list'
                                        src={element.image}
                                        alt={element.titre}
                                    />
                                </Link>
                            ))}
                        </div>
                        : null}
                </div>
                <div className="product">
                    <div className="product_title"><h2>{product.titre}</h2></div>
                    <hr className="col-md-12"></hr>

                    {product.Nouveauté === true ?
                        <div className='product_nouveau'>Nouveau !</div>
                        : null}

                    {product.Promo === true ?
                        <div>
                            <div className='product_promo'>Promo !</div>
                            <div className="product_oldprice">{product.prix}€</div>
                            <div className="product_newprice">{(parseFloat(product.prix) * (1 - parseFloat(product.Reduction) / 100)).toFixed(2)}€</div>
                        </div>
                        :
                        <div className="product_price">{product.prix}€</div>
                    }
                    <div className="product-btn">
                        {(() => {
                            if (parseInt(product.nbStock) === 0 || stock === 0 || product.enRupture === true) {
                                return (
                                    <div>
                                        <div>
                                            {product.Size === true ?
                                                <select onChange={(e) => setSize(e.target.value)} defaultValue={size}>
                                                    <option value="1">S</option>
                                                    <option value="2">M</option>
                                                    <option value="3">L</option>
                                                    <option value="4">XL</option>
                                                </select>
                                                : null}
                                        </div>
                                        <div>
                                            <button className='btn btn-light achat' disabled>Acheter</button>
                                            <button className='btn btn-light ajout-panier' disabled>Ajouter au panier</button>
                                        </div>
                                        <div>
                                            <p className='indisponible'>Article indisponible</p>
                                        </div>
                                    </div>
                                )

                            }
                            else {
                                return (
                                    <>
                                        <div>
                                            {product.Size === true ?
                                                <select onChange={(e) => setSize(e.target.value)} defaultValue={size}>
                                                    <option value="1">S</option>
                                                    <option value="2">M</option>
                                                    <option value="3">L</option>
                                                    <option value="4">XL</option>
                                                </select>
                                                : null}
                                        </div>
                                        <div>
                                            

                                            {id === null
                                                ?
                                                <button id={"btn_" + product.id} className='btn btn-light ajout-panier' onClick={(e) => AddPanierVisiteur(e)}>Ajouter au panier</button>
                                                :
                                                <button id={"btn_" + product.id} className='btn btn-light ajout-panier' onClick={(e) => AddPanier(e)}>Ajouter au panier</button>
                                            }
                                        </div>
                                        <div>
                                            {product.Size === false ?
                                                <p>Il en reste {product.nbStock}</p>
                                                :
                                                <p>Il en reste {stock}</p>}
                                        </div>
                                    </>
                                )
                            }
                        })()}
                    </div>
                    <div className="product_desc">
                        <h3>Description :</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
            {id !== null || comments !== null ?
            <h3 id="titre-comment">Avis :</h3>
            :null}
            {id !== null ?
                <div className='container-input-comment'>
                    <textarea type="text" className='input-comment' placeholder='Donnez nous votre avis !' value={avis} onChange={(e) => setAvis(e.target.value)}></textarea>
                    <button onClick={(e) => commenter(e)} className="btn-comment">Envoyer</button>
                </div>
                : null}

            {comments !== null ?
                <div className='comments'>
                    {comments.map((item) => (
                        <div className="SingleComment" key={item.id}>
                            <p>{item.user.Prenom} :</p>
                            <p>{item.message}</p>
                            <p className='end-comment'>{item.date.substring(0, 10)}</p>
                        </div>
                    ))}
                </div>
                : null}
        </div>
    )
}






