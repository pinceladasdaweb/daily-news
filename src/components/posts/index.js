import { useEffect } from 'react'
import Moment from 'react-moment'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Newsletter from '../newsletter'
import { fetchPostById } from '../../store/utils/thunks'
import { clearPostById } from '../../store/reducers/posts'

const PostComponent = () => {
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(fetchPostById(params.id))
  }, [dispatch, params])

  useEffect(() => {
    return () => {
      dispatch(clearPostById())
    }
  }, [dispatch])

  return (
    <>
      { posts.postById ?
        <div className='article_container'>
          <h1>{ posts.postById.title }</h1>
          <img
            className='image'
            src={`${posts.postById.imagexl}?${posts.postById.id}`}
            alt={posts.postById.title}
            title={posts.postById.title}
          />
          <div className='author'>
            Created by: <span>{posts.postById.author} - </span>
            <Moment format='DD MMMM YYYY'>{posts.postById.createdAt}</Moment>
          </div>
          <div className='mt-3 content'>
            <div dangerouslySetInnerHTML={{
              __html: posts.postById.content
            }}></div>
          </div>
        </div>
      : null }

      { posts.loading ?
        <div style={{ textAlign: 'center' }}>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      : null }

      <Newsletter />
    </>
  )
}

export default PostComponent
