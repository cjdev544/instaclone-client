import { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import useAuth from '../../../hooks/useAuth'
import './LoginForm.scss'

const LoginForm = () => {
  const { loginUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      loginUser(values, setIsLoading)
    },
  })

  return (
    <>
      <h2 className='login-form-title'>
        Inicia sesión para ver fotos de tus amigos
      </h2>
      <Form className='login-form' onSubmit={formik.handleSubmit}>
        <Form.Input
          type='text'
          placeholder='Correo electronico'
          name='email'
          value={formik.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          type='password'
          placeholder='Contraseña'
          name='password'
          value={formik.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Button type='submit' className='btn-submit' loading={isLoading}>
          Iniciar sesión
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
