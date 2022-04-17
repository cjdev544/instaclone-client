import { Button, Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import useAuth from '../../../hooks/useAuth'
import './RegisterForm.scss'

const RegisterForm = ({ setShowLogin }) => {
  const { registerUser } = useAuth()

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      repitPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      username: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, true)
        .required(true),
      email: Yup.string().email(true).required(true),
      password: Yup.string().min(6, true).required(true),
      repitPassword: Yup.string()
        .required(true)
        .oneOf([Yup.ref('password')], true),
    }),
    onSubmit: async (values) => {
      registerUser(values, setShowLogin)
    },
  })

  return (
    <>
      <h2 className='register-form-title'>
        Registrate para ver fotos de tus amigos
      </h2>
      <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input
          type='text'
          placeholder='Nombre y apellido'
          name='name'
          value={formik.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        />
        <Form.Input
          type='text'
          placeholder='Nombre de usuario'
          name='username'
          value={formik.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
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
        <Form.Input
          type='password'
          placeholder='Confirmar contraseña'
          name='repitPassword'
          value={formik.repitPassword}
          onChange={formik.handleChange}
          error={formik.errors.repitPassword}
        />
        <Button type='submit' className='btn-submit'>
          Registrarce
        </Button>
      </Form>
    </>
  )
}

export default RegisterForm
