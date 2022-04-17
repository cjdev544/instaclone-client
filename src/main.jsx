import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import client from './apolloClient'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './index.scss'
import AuthState from './context/authState'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <AuthState>
      <App />
    </AuthState>
  </ApolloProvider>
)
