import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import classnames from "classnames";
import {LS_KEYS, LocalStorageService } from '../localStorage/localStorage';
import './stylesignin.css';
import avatar from '../../images/avatar.png';
import { SignInPortalValidation } from './SignInPortalValidation';

export const SignIn = ({islogin}) => {

    const [isswitchOn, setIsSwitchOn] = useState(true);
    const navigate = useNavigate();
    const [inputvalue,setinputvalue] = useState('');
    useEffect(()=>{
        if(inputvalue.length >=4 && inputvalue.length <=16){
            setIsSwitchOn(false);
        }else{
            setIsSwitchOn(true);
    
        }
    },[inputvalue])
const getInput = ({target:{value}})=>{
    setinputvalue(value.trim());
    
}
const handlelLSLogin = () =>{
    if(inputvalue.length >=4 && inputvalue.length <=16){
        LocalStorageService.set(LS_KEYS.USER,inputvalue)
        islogin(true);
        navigate('../', {replace:true});
        
    }
  
   
}
   return (
    <div className="conteiner">
        <div className="flexform ">
            <div className="imgpicture">
                <div className="wraplogoimg">
                        <img className="pictureuser" src={avatar} alt="logo pictures"></img>
                </div>
            </div>

            <div className="formblock">
                <form action="/" method="post">
                    <div className="label "><label htmlFor="username"><strong>Username</strong></label><br/></div>
                    {
                        isswitchOn && createPortal(< SignInPortalValidation />,document.body )
                    }
                    <div className="input styleform"><input  onChange={getInput} className="focus-items I"  type="text" id="username" name="username" placeholder="type Username"></input></div>
                    <div className="btn styleform"><button disabled={isswitchOn} className={classnames("focus-items", !isswitchOn && "B")} type="button" onClick={handlelLSLogin} >Sign In</button></div>
                </form>
            </div>
        </div>
    </div>
        
        
        
    
    );
}
/*  */







