import { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import useGetData from '../../../../hooks/useGetData'
import useAuth from '../../../../hooks/useAuth'
import './UpdateUser.scss'

const UpdateUser = ({ atributes, dataUser, setShowModal }) => {
  const { userUpdate, passwordUpdate } = useGetData()
  const { logoutUser } = useAuth()

  const [loading, setLoading] = useState(false)

  const { type, placeholder, name } = atributes

  const validations = {
    name: { name: Yup.string().required(true) },
    username: {
      username: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, true)
        .required(true),
    },
    email: { email: Yup.string().email(true).required(true) },
    password: {
      lasstPassword: Yup.string().required(),
      newPassword: Yup.string()
        .min(6, 'La contraseña debe tener mínimo 6 caracteres')
        .required(true),
      repeatPassword: Yup.string()
        .required(true)
        .oneOf([Yup.ref('newPassword')], true),
    },
  }
  const yupValidation = validations[name]

  const initialValues =
    name !== 'password'
      ? { [name]: '' }
      : { lasstPassword: '', newPassword: '', repeatPassword: '' }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(yupValidation),

    onSubmit: async (values) => {
      setLoading(true)
      try {
        if (name !== 'password') {
          await userUpdate(name, values[name])
          setLoading(false)
          setShowModal(false)
          if (name === 'username') {
            toast.success(
              '¡Actualización realizada con exito! Vuelve a iniciar sesión'
            )
            logoutUser()
          } else {
            toast.success('¡Actualización realizada con exito!')
          }
        } else {
          try {
            await passwordUpdate(values.lasstPassword, values.newPassword)
            toast.success(
              '¡Actualización realizada con exito! Vuelve a iniciar sesión'
            )
            logoutUser()
          } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)
          }
        }
      } catch (err) {
        console.log(err)
        toast.error('Error al actualizar')
        setLoading(false)
      }
    },
  })

  return (
    <>
      {name !== 'password' && name !== 'description' && (
        <Form className='update-user' onSubmit={formik.handleSubmit}>
          <p>
            Valor actual: <span>{dataUser[name]}</span>
          </p>
          <Form.Input
            type={type}
            placeholder={placeholder}
            name={name}
            autoFocus
            value={formik[name]}
            onChange={formik.handleChange}
            error={formik.errors[name]}
          />
          <Button type='submit' className='btn-submit' loading={loading}>
            Actualizar
          </Button>
        </Form>
      )}

      {name === 'password' && (
        <Form className='update-user' onSubmit={formik.handleSubmit}>
          <Form.Input
            type={type}
            placeholder='Contraseña actual'
            name='lasstPassword'
            autoFocus
            value={formik.lasstPassword}
            onChange={formik.handleChange}
            error={formik.errors.lasstPassword}
          />
          <Form.Input
            type={type}
            placeholder='Nueva contraseña'
            name='newPassword'
            value={formik.newPassword}
            onChange={formik.handleChange}
            error={formik.errors.newPassword}
          />
          <Form.Input
            type={type}
            placeholder='Confirmar contraseña'
            name='repeatPassword'
            value={formik.repeatPassword}
            onChange={formik.handleChange}
            error={formik.errors.repeatPassword}
          />
          <Button type='submit' className='btn-submit' loading={loading}>
            Actualizar
          </Button>
        </Form>
      )}

      {name === 'description' && (
        <Form className='update-user' onSubmit={formik.handleSubmit}>
          <Form.TextArea
            placeholder={placeholder}
            name={name}
            autoFocus
            value={formik[name]}
            onChange={formik.handleChange}
            error={formik.errors[name]}
          />
          <Button type='submit' className='btn-submit' loading={loading}>
            Actualizar
          </Button>
        </Form>
      )}
    </>
  )
}

export default UpdateUser
