import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import "./ArianneResult.css";
import { Link } from 'react-router-dom';

export default function ArianneResult() {

    const [categorie, setCategorie] = useState("")
    const [souscategorie, setSousCategorie] = useState("")
    const [recherche, setRecherche] = useState("")
    const [idcategorie, setIdcategorie] = useState("")
    const [idsouscategorie, setIdsousCategorie] = useState("")

    const path = useLocation().pathname;
    let array = path.split("/")
    const pathId = useParams()

    useEffect(() => {

        if (array.indexOf("categorie") !== -1) {
            const id = pathId.id;
            axios("http://localhost:8000/api/categories/" + id)
                .then((response) => {
                    setIdcategorie(id)
                    setCategorie(response.data.name)
                })
        }
        if (array.indexOf("souscategorie") !== -1) {
            const id2 = pathId.id;
            axios("http://localhost:8000/api/souscategories/" + id2)
                .then((response) => {
                    let string = response.data.name
                    let path2 = response.data.categorie
                    setIdsousCategorie(id2)

                    axios("http://localhost:8000" + path2)
                        .then((res) => {
                            setSousCategorie(string)
                            setCategorie(res.data.name)
                            let array2 = path2.split("/")
                            setIdcategorie(array2.pop())
                        })
                })
        }
        if (array.indexOf("categorie") === -1 && array.indexOf("souscategorie") === -1) {
            setRecherche("Resultat de la recherche");
        }
    }, [idcategorie, idsouscategorie, recherche, categorie, souscategorie, array, path, pathId]);

    return (
        <div className='aria'>

            <Breadcrumb>
                <BreadcrumbItem><Link to={"/"}>Accueil</Link></BreadcrumbItem>
                {recherche
                    ? <BreadcrumbItem>{recherche}</BreadcrumbItem>
                    : null
                }
                <BreadcrumbItem><Link to={"/result/categorie/" + idcategorie}>{categorie}</Link></BreadcrumbItem>
                {souscategorie
                    ? <BreadcrumbItem><Link to={"/result/souscategorie/" + idsouscategorie}>{souscategorie}</Link></BreadcrumbItem>
                    : null
                }
            </Breadcrumb>
        </div>
    )
}