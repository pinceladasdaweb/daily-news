import { useEffect } from 'react'
import Moment from 'react-moment'
import Masonry from 'react-masonry-css'
import { Button, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { fetchPosts } from '../../store/utils/thunks'

const HomePosts = () => {
  const homePosts = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (homePosts.articles.items.length <= 0) {
      dispatch(fetchPosts({ page: 1, order: 'desc', limit: 6 }))
    }
  }, [homePosts, dispatch])


  const loadMorePosts = () => {
    const page = homePosts.articles.page + 1

    dispatch(fetchPosts({ page, order: 'desc', limit: 6 }))
  }

  return (
    <>
      <Masonry
        breakpointCols={{
          default: 3,
          800: 3,
          400: 1
        }}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        { homePosts.articles ?
          homePosts.articles.items.map(item => (
            <div key={item.id}>
              <img
                style={{ width: '100%' }}
                src={`${item.image}?${item.id}`}
                alt={item.title}
                title={item.title}
              />
              <div className='author'>
                <span>{item.author} - </span>
                <Moment format='DD MMMM YYYY'>{item.createdAt}</Moment>
              </div>
              <div className='content'>
                <h1 className='title'>{item.title}</h1>
                <p className='excerpt'>{item.excerpt}</p>
                <LinkContainer to={`article/${item.id}`} className='mt-3'>
                  <Button variant='light'>Read more</Button>
                </LinkContainer>
              </div>
            </div>
          ))
        : null }
      </Masonry>
      { homePosts.loading ?
        <div style={{ textAlign: 'center' }}>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      : null }

      { homePosts.articles.end && !homePosts.loading ?
        <Button variant='outline-dark' onClick={() => loadMorePosts()}>
          Load more posts
        </Button>
      : null }
    </>
  )
}

export default HomePosts
