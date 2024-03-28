import {Outlet} from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const LayOut = (props) =>{
    return ( 
        <div className='wrapper'>
            <header>
                <div className="conteiner">
                { props.Auth ?  <Header islogin={props.islogin} /> : <h1 style={{textAlign:'center'}}>X-course-task / Vyacheslav Stoyko</h1> }
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                { props.Auth ?  <Footer /> : null }
            </footer>
        </div>
    );
}