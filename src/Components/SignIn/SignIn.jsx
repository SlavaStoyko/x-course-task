
import './stylesignin.css';
import avatar from '../../images/avatar.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {LocalStorageService } from '../localStorage/localStorage';
import sprite from "../../images/sprites.svg";

export const SignIn = ({name,isName,islogin}) => {
    const [inputvalue,setinputvalue] = useState('');
    
const navigate = useNavigate();
const getInput = ({target:{value}})=>{
    setinputvalue(value);
    
}
const handlelLSLogin = () =>{
    if(inputvalue.length >=4 && inputvalue.length <=16){
        islogin(true);
        LocalStorageService.set("userName",inputvalue);
        
        navigate('../', {replace:true});
    }
  
   
}

   return (
        
     
        
            <div className="conteiner">
                <div className="flexform ">
                    <div className="imgpicture">
                        <div className="wraplogoimg">
                                <img className="pictureuser" src={avatar} alt="logo pictures"></img>
                            <div className="identify">
                               { inputvalue.length >=4 && inputvalue.length <=16 ?
                                <svg className="identifyItem">
                                    <use xlinkHref={`${sprite}#done`}></use>
                                </svg>
                               :
                               <svg className={ inputvalue.length === 0 ? "identifyItem higenstatus": "identifyItem"}>
                                    <use xlinkHref={`${sprite}#close`}></use>
                                </svg> 
                                    }                   
                            </div>
                        </div>
                    </div>
    
                    <div className="formblock">
                        <form action="/" method="post">
                            <div className="label "><label htmlFor="username"><strong>Username</strong></label><br/></div>
                            <div className="input styleform"><input onChange={getInput} className="focus-items I" type="text" id="username" name="username" placeholder="type Username"></input></div>
                            <div className="btn styleform"><button disabled={!inputvalue.length} className={!inputvalue.length ? "focus-items B:hover" : " B"} type="button" onClick={handlelLSLogin} >Sign In</button></div>
                        </form>
                    </div>
                </div>
            </div>
        
        
        
    
    );
}








