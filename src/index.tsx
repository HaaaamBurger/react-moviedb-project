import React from 'react';
import ReactDOM from 'react-dom/client';

import {store} from './redux/store'
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {Provider} from "react-redux";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
