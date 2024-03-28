import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useBookList } from '../Context/use-Context';

import {Loader} from '../loader/Loader';

import './bookliststyle.css';
import imagenotfound from '../../images/imageNotFound.png';
export const BookList = () =>{
    const costFilters = {
        low: (el) => el.price >= 0 && el.price < 16,
        middle: (el) => el.price >= 16 && el.price < 30,
        hight: (el) => el.price > 30,
        all: () => true,
        };
        const value = useBookList();
        const [books, setBooks] = useState(value);
        const [searchBook, setSearchBook] = useState('');
        const [option, setOption] = useState('all');
        useEffect(()=>{
            const filteredBooks = value.filter((book)=>book.title.toLowerCase().includes(searchBook.toLowerCase())).filter(costFilters[option]);
            setBooks(filteredBooks);
        },[searchBook,option])
   
   const handleSearch = (value) =>{setSearchBook(value);} 
   const hamdlerOption = ({target:{value}}) => {setOption(value);}
   return (
      <>
        <h2 className="visibility-hidden">Book list page</h2>
        
        <section className="search">
        <article className="search_panel">
                       <form>
                        <label htmlFor="gsearch"></label>
                        <input onChange={(event)=>handleSearch(event.target.value)} type="search" id="gsearch" value={searchBook}  name="gsearch" placeholder="Search by book name"></input>
                        <svg className="img_search" fill="#008cff" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                      </form>
                </article>
                <article className="option_panel">
                    <label htmlFor="filter_list"></label>
                        <select onChange={(e)=>hamdlerOption(e)}id="filter_list" name="filter_list" >
                        <option checked value="all">All</option>
                        <option value="low">0 $ 15</option>
                        <option value="middle">15 $ 30</option>
                        <option value="hight">$ 30</option>
                        </select>
                </article>
            </section>
            <div className="container">
            <section className="book_list">
                <div id="conteinerforbooklist">
                    { !books.length ? < Loader /> : books?.map((item) =>(
                    <article key={item.id} className="book">
                        <div className="imgBook"><img className="imgBookList" src={item.image ? item.image : imagenotfound}alt=""></img></div>
                        <p className="book_name">{item.title.length > 24 ? `${item.title.slice(0,24)}...` : item.title}</p>
                        <p className="book_autor">{item.author}</p>
                        <p className="price">{item.price}</p>
                        <Link className="link_specific_books" to={`/booklist/book/${item.id}`}>View</Link>
                        
                    </article>
                    )) }
                </div>
            </section>
        </div>
      </>
    );
}
