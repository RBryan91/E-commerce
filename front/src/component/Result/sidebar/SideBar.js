import React from "react"
import { Link } from "react-router-dom";
import "./SideBar.css"


export default function Sidebar(props) {
  const { titre, cat, souscat } = props
  let catname = [];
  let souscatname = [];

  

  cat.map((item) => {
    if (catname.indexOf(item.name) === -1) {
      catname.push(item.name)
    }
  })
  cat.map((item) => {
    for(let i =0; i < catname.length; i++){
      if(item.name === catname[i]){
        catname[i] = [item.id,catname[i]]
      }
    }
  })

  souscat.map((item) => {
    if (souscatname.indexOf(item.name) === -1) {
      souscatname.push(item.name)
    }
  })
  souscat.map((item) => {
    for(let i =0; i < souscatname.length; i++){
      if(item.name === souscatname[i]){
        souscatname[i] = [item.id,souscatname[i],item["categorie"].name]
      }
    }
  })

  return (
    <div>
      <div className="sideBarre">
        <h1 className="t-name">Cotumichioo</h1>
        <hr className="t-hr"></hr>
        <div className="divSelect">
          {catname.map((item) => (
            <div className="user-box" key={item[0]}>
              <div className="user-id">
                <div className="user-name"><Link style={{textDecoration: "none"}} to={"/result/"+titre+"/CAT/"+item[0]}>{item[1]}</Link></div>
                {item[1] !== "Chemise" && item[1] !== "Costume" ?  
                <div>
                <div className="dropdown-arrow"></div>
                <div className="dropdown-menu">
                  <ul>
                    {souscatname.map((value) => (
                      value[2] === item[1] ?
                        <li key={value[0]}><Link style={{textDecoration: "none"}} to={"/result/"+titre+"/SCAT/"+value[0]}>{value[1]}</Link></li>
                        : null
                    ))}
                  </ul>
                </div>
                </div>
                : null
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}