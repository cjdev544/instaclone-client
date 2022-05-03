import { useState } from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'
import { EmojiButton } from '@joeattardi/emoji-button'

import useComent from '../../../hooks/useComent'
import './ComentForm.scss'

const ComentForm = ({ publication }) => {
  const { addNewComent } = useComent()
  const [state, setState] = useState('')

  const picker = new EmojiButton()

  const handleEmoji = () => {
    picker.togglePicker()
    picker.on('emoji', (selection) => {
      setState(state + selection.emoji)
    })
  }

  const handleSubmit = async (e) => {
    if (state) {
      try {
        await addNewComent(state, publication)
        setState('')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Form className='coment-form' onSubmit={handleSubmit}>
      <Icon name='smile outline' onClick={handleEmoji} />
      <Form.Input
        placeholder='Añade un comentario...'
        autoComplete='off'
        name='coment'
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <Button type='submit'>Publicar</Button>
    </Form>
  )
}

export default ComentForm
