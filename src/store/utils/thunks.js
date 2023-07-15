import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = process.env.REACT_APP_API_URL

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page = 1, order = 'asc', limit = 10 }, { getState }) => {
    try {
      const { data } = await axios.get(`${API_URL}/posts?_page=${page}&_limit=${limit}&_order=${order}&_sort=id`)
      const prevState = getState().posts

      return {
        items: [ ...prevState.articles.items, ...data ],
        page,
        end: !!data.length
      }
    } catch (err) {
      throw err
    }
  }
)

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/posts/${id}`)

      return data
    } catch (err) {
      throw err
    }
  }
)

export const addToNewsletter = createAsyncThunk(
  'users/addToNewsletter',
  async (data) => {
    try {
      const findUser = await axios.get(`${API_URL}/newsletter?email=${data.email}`)

      if (!Array.isArray(findUser.data) || !findUser.data.length) {
        const response = await axios({
          method: 'POST',
          url: `${API_URL}/newsletter`,
          data: {
            email: data.email
          }
        })

        return {
          status: 'SUCCESS',
          email: response.data
        }
      } else {
        return {
          status: 'FAILED'
        }
      }
    } catch (err) {
      throw err
    }
  }
)

export const sendMessage = createAsyncThunk(
  'users/sendMessage',
  async (data) => {
    try {
      await axios({
        method: 'POST',
        url: `${API_URL}/contact`,
        data
      })

      return true
    } catch (err) {
      throw err
    }
  }
)
