import './style.css'
import sprite from '../../images/sprites.svg';
import { Link } from 'react-router-dom';
export const ErrorPage = () => {

    return (
        <div className="box">
            
        <section className="box_list">
            <h1 className="visibility-hidden">Error Page</h1>
            <div className="list" key="ErrorPage">
                <div className="error404">
                    <div className="error eimg1">
                    <svg>
                        <use xlinkHref={`${sprite}#report_error`}></use>
                    </svg>
                </div>
                <div className="error eimg2">
                    <svg>
                        <use xlinkHref={`${sprite}#manufacture_error`}></use>
                    </svg>
                </div>
                <div className="error eimg2">
                    <svg>
                        <use xlinkHref={`${sprite}#alertPerson`}></use>
                    </svg>
                </div>
                </div>
                <p style={{textAlign:"center"}}>Oops,something went wrong. 404 error</p>
                    <Link className="errorGohomepages" to="/">Back to home page</Link>
                </div>
                </section>
                </div>
    );
};