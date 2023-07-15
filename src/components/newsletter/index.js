import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { showToast } from '../utils/toast'
import { addToNewsletter } from '../../store/utils/thunks'
import { clearNewsletter } from '../../store/reducers/users'

const Newsletter = () => {
  const textInput = useRef()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const email = textInput.current.value

    if (email === '') {
      showToast('FAILED', 'Email is empty')
      return
    }

    dispatch(addToNewsletter({ email }))
      .unwrap()
      .then(({ status }) => {
        const message = status === 'SUCCESS' ? 'Great, welcome to my newsletter.' : 'You are already subscribed.'

        showToast(status, message)
      })
      .catch((err) => {
        showToast('FAILED', err.message)
      })
      .finally(() => {
        textInput.current.value = ''
        dispatch(clearNewsletter())
      })
  }

  return (
    <div className='newsletter_container'>
      <h1>Join our newsletter</h1>
      <div className='form'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='your@email.com'
              name='email'
              ref={textInput}
            />
            <Button className='mt-2' variant='primary' type='submit'>
              Add me to the list
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default Newsletter
