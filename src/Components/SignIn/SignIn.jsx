import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import {LS_KEYS, LocalStorageService } from '../localStorage/localStorage';

import { SignInPortalValidation } from './SignInPortalValidation';
import classnames from "classnames";
import './stylesignin.css';
import avatar from '../../images/avatar.png';

export const SignIn = ({isLogin}) => {

    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const navigate = useNavigate();
    const [inputValue,setInputValue] = useState('');
    useEffect(()=>{
        if(inputValue.length >=4 && inputValue.length <=16){
            setIsSwitchOn(false);
        }else{
            setIsSwitchOn(true);
    
        }
    },[inputValue])
const getInput = ({target:{value}})=>{
    setInputValue(value.trim());
    
}
const handlerLSLogin = () =>{
    if(inputValue.length >=4 && inputValue.length <=16){
        LocalStorageService.set(LS_KEYS.USER,inputValue)
        isLogin(true);
        navigate('../', {replace:true});
        
    }
  
   
}
   return (
    <div className="container">
        <div className="flexForm ">
            <div className="imgPicture">
                <div className="wrapLogoImg">
                        <img className="pictureUser" src={avatar} alt="logo pictures"></img>
                </div>
            </div>

            <div className="formBlock">
                <form action="/" method="post">
                    <div className="label "><label htmlFor="username"><strong>Username</strong></label><br/></div>
                    {
                        isSwitchOn && createPortal(< SignInPortalValidation />,document.body )
                    }
                    <div className="input"><input  onChange={getInput} className="focus-items I"  type="text" id="username" name="username" placeholder="type Username"></input></div>
                    <div className="btn"><button disabled={isSwitchOn} className={classnames("focus-items", !isSwitchOn && "B")} type="button" onClick={handlerLSLogin} >Sign In</button></div>
                </form>
            </div>
        </div>
    </div>
        
        
        
    
    );
}
/*  */







