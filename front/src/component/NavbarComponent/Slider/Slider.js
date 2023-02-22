import React from 'react'
import "./Slider.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


function Slider() {

  return (

            <Carousel>
              
                <div>
                    <img src="./images/articles/Carousel.jpg" alt="costumes"/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="./images/articles/Carousel2.jpg" alt="costumes"/>
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="./images/articles/Carousel3.jpg" alt="costumes"/>
                    <p className="legend">Legend 3</p>
                </div>

            </Carousel>
           

    
  

  )
}


export default Slider