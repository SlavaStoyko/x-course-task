import {useState } from "react";
import { Link } from "react-router-dom";

import {LS_KEYS, LocalStorageService } from "../localStorage/localStorage";

import './header_style.css';
import sprite from '../../images/sprites.svg';
import avatar from '../../images/avatar.png';

export const Header = ({islogin}) =>{
   
    const [isActive, setActive] = useState(false);
    const handleToggle = () => {
        setActive(!isActive);  
    };

    const handlerLogout = ()=> {
        LocalStorageService.remove(LS_KEYS.USER)
        islogin(false);
    }
    const chackBasket = () => {
        setActive(false); 
    }

    return (
        
        <div className="container">
            <section className={isActive ? "header_block active" : "header_block"}>
                <div className="nav_title"><div className="title"><h1 className="header_title"><Link className="linkTitle" to ="/">X-course-task / Vyacheslav Stoyko</Link></h1></div></div>
                <button onClick={handleToggle} className={"menu-btn"}><div className={isActive ? "burger active" : "burger"}><span></span></div></button>
                    <div className={isActive ? "nav_site active" : "nav_site"}>
                        <div className="order_buscet">
                        <div className="buscet_img">
                            <svg className="svgHeaderbasket">< Link  onClick={chackBasket} to ="/basket"  type="button"><use xlinkHref={`${sprite}#basket`}></use></ Link ></svg>
                            </div>
                        </div>
                        <div className="log_btn" ><Link  onClick={handlerLogout} to={"/login"} type="button">LogOut</Link></div>
                        <div className="icon_user" ><img src={avatar} alt="avatar img"></img></div>
                        <div className="name_user" ><p>{LocalStorageService.get(LS_KEYS.USER)}</p></div>
                    </div>
                    
                </section>
        </div>
        
        
        );
    }