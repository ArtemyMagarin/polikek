import React from 'react';
import { Header } from './Header';
import { Main } from './Main';

import '../styles/common.css';

export const App = () => (
    <>
        <Header />
        <div className="container">
            <Main/>
        </div>
    </>
)