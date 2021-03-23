import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BaseLayout.module.css';

export const BaseLayout = ({ children }) => {
    return (
        <div className={styles.mainWrapper}>
            <header><Link to="/">header data</Link></header>
            <main>
                {children}
            </main>
            <footer>footer data</footer>
        </div>
    )
}
