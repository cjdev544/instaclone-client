import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { EmojiButton } from '@joeattardi/emoji-button'
import {
  Button,
  Dimmer,
  Icon,
  Image,
  Loader,
  Modal,
  TextArea,
} from 'semantic-ui-react'

import usePublication from '../../../hooks/usePublication'
import ImageNoFound from '../../../assets/png/avatar.png'
import './UploadModal.scss'

const UploadModal = ({ showModal, setShowModal, dataUser }) => {
  const { publishImage } = usePublication()

  const [realFile, setRealFile] = useState(null)
  const [previwImage, setPreviwImage] = useState(null)
  const [optionFeet, setOptionFeet] = useState(false)
  const [textareaValue, setTextareaValue] = useState('')
  const [loading, setLoading] = useState(false)

  const picker = new EmojiButton()

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    setRealFile(file)
    setPreviwImage(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop,
  })

  const handleEmoji = () => {
    picker.togglePicker()
    picker.on('emoji', (selection) => {
      setTextareaValue(textareaValue + selection.emoji)
    })
  }

  const handleClose = () => {
    setRealFile(null)
    setPreviwImage(null)
    setOptionFeet(false)
    setShowModal(false)
    setTextareaValue('')
  }

  const handleChange = (e) => {
    if (textareaValue.length < 2200) {
      setTextareaValue(e.target.value)
    }
  }

  const handlePublish = async () => {
    try {
      setLoading(true)
      await publishImage(realFile, textareaValue)
      setLoading(false)
      handleClose()
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <Modal
      size='small'
      open={showModal}
      onClose={handleClose}
      className='upload-modal'
    >
      <div
        {...getRootProps()}
        className='dropzone'
        style={previwImage && { border: 0 }}
      >
        <input {...getInputProps()} />

        {!previwImage && (
          <>
            <Icon name='cloud upload' />
            {isDragActive ? (
              <p>Suelta la imagen</p>
            ) : (
              <p>Arrastra la imagen a publicar o da click aquí para buscarla</p>
            )}
          </>
        )}
      </div>

      {previwImage && !optionFeet && (
        <>
          <div
            className='previw-image'
            style={{ backgroundImage: `url('${previwImage}')` }}
          />
          <Button
            primary
            className='btn-upload'
            onClick={() => setOptionFeet(true)}
          >
            Siguiente
          </Button>
        </>
      )}

      {previwImage && optionFeet && (
        <div className='option-feet'>
          <div
            className='previw-image'
            style={{ backgroundImage: `url('${previwImage}')` }}
          />
          <div className='input-right'>
            <div className='input-rigth__relative'>
              <div className='user'>
                <Image
                  src={dataUser.avatar || ImageNoFound}
                  alt='avatar de usuario'
                  avatar
                />
                <p>{dataUser.username}</p>
              </div>
              <TextArea
                autoFocus
                placeholder='Escribe un pie de foto...'
                value={textareaValue}
                onChange={handleChange}
              ></TextArea>
              <Icon name='smile outline' onClick={handleEmoji} />
              <p className='value-counter'>{textareaValue.length}/2.200</p>
            </div>
          </div>
          <Button primary className='btn-upload' onClick={handlePublish}>
            Compartir
          </Button>
        </div>
      )}

      {loading && (
        <Dimmer active className='publishing'>
          <Loader />
          <p>Compartiendo...</p>
        </Dimmer>
      )}
    </Modal>
  )
}

export default UploadModal
