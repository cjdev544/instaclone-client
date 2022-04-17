import { useState } from 'react'
import { Container, Image } from 'semantic-ui-react'

import LoginForm from '../../components/forms/LoginForm'
import RegisterForm from '../../components/forms/RegisterForm'
import logo from '../../assets/png/logo.png'
import './Auth.scss'

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <Container fluid className='auth'>
      <Image src={logo} alt='logo' />
      <div className='container-form'>
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
      <div className='change-form'>
        <p>
          {showLogin ? (
            <>
              ¿No tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}>Regístrate</span>
            </>
          ) : (
            <>
              ¡Entra con tu cuenta!
              <span onClick={() => setShowLogin(!showLogin)}>
                Inicia sesión
              </span>
            </>
          )}
        </p>
      </div>
    </Container>
  )
}

export default Auth
