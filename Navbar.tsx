import React, { useState } from 'react'
import './Navbar.css'
import { FaBars, FaTimes } from 'react-icons/fa';
import { graphql, useStaticQuery } from 'gatsby'
import Img from "gatsby-image"
import { Row, Col, Container } from 'react-bootstrap';

export default function Navbar() {

    const data = useStaticQuery(
        graphql`
        query allHeaderLinksJson {
          allHeaderLinksJson {
           
            nodes {
              id
              link
              path
            }
          }
          logoJson {
            logo {
              childImageSharp {
                 fixed(width: 100){
                         base64
                        width
                        height
                        src
                        srcSet
                        }
                      }
              }
            }
        }
        
        `
    )
    const logo = data.logoJson.logo.childImageSharp.fixed
    console.log(logo)


    const [handleIcon, setHandleIcon] = useState(true)

    var open = document.getElementById('hamburger');
    var changeIcon = true;
    function selectIcon() {
        setHandleIcon(!handleIcon)
    }
    function handleClick() {
        var overlay = document.querySelector('.overlay');
        var nav = document.querySelector('nav');
        var icon = document.querySelector('.menu-toggle i');

        overlay.classList.toggle("menu-open");
        nav.classList.toggle("menu-open");

        if (changeIcon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");

            changeIcon = false;
        }
        else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
            changeIcon = true;
        }
    }
    return (
        <div>
            <header>
                <div className="menu-toggle" onClick={handleClick} id="hamburger">
                    <i className="fas fa-bars"></i>
                    {handleIcon ? <FaBars onClick={selectIcon} /> : <FaTimes onClick={selectIcon} />}
                </div>
                <div className="overlay"></div>
                <div className="container">
                    <nav>
                        <h1 className="brand"><a href="/">Br<span>a</span>nd</a></h1>
                        <ul>
                            {data.allHeaderLinksJson.nodes.map(({ id, link, path }) => {

                                // if (link == "Home") {
                                //   return (

                                //     <Nav.Link className="activeCls  mr-2" key={id} href={path}>{link}</Nav.Link>
                                //   )
                                // }
                                return (
                                    <li><a key={id} href={path}>{link}</a></li>
                                    //   <Nav.Link className=" mr-1 ml-1" key={id} href={path}>{link}</Nav.Link>
                                )
                            })}

                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}
