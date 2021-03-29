import React from 'react';

import { Header } from "../pages";
import styles from './BaseLayout.module.css';


export const BaseLayout = ({ children }) => {
    return (
        <div className={styles.mainWrapper}>
            <header>
                <Header/>
            </header>
            <main>
                {children}
            </main>
            <footer>footer data</footer>
        </div>
    )
}
