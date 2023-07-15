import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'

import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Router from './router'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <Router />
  </Provider>
)
