import React from 'react';
import { Link } from 'react-router-dom';
import style from './NotFound.module.css'

function NotFound() {
  return (
    <main className={style.main}>
      <h1 className={style.heading}>OOPS - Page Not Found</h1>
      <p className={style.paragraph}>The page you are looking for does not exist.</p>
      <Link to='/home' className={style.returnHome}>Return Home</Link>
    </main>
  );
}

export default NotFound;
