/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'
import { mockBaseUrl, networkDelay, requireAuth, wrapBackendSuccessResponse } from '../utils'
import type { CreatePostDto, UpdatePostDto } from '@/api/posts'
import { db, persistDb } from '../db'

export const postsHandlers = [
  http.post(`${mockBaseUrl}/posts`, async ({ request, cookies }) => {
    await networkDelay()
    requireAuth(cookies)
    const bd = (await request.json()) as CreatePostDto

    try {
      const post = db.post.create({
        ...bd
      })
      await persistDb('post')

      return HttpResponse.json(wrapBackendSuccessResponse({ data: post }), { status: 200 })
    } catch (error: any) {
      return HttpResponse.json({ error: error?.message || 'Server Error' }, { status: error?.cause || 500 })
    }
  }),
  http.patch(`${mockBaseUrl}/posts/:postId`, async ({ request, params }) => {
    try {
      const { postId } = params as { postId: string }
      if (!postId) {
        throw new Error('Post ID is required', { cause: 400 })
      }

      const post = db.post.findFirst({
        where: {
          id: { equals: postId }
        }
      })
      if (!post) {
        throw new Error('Post not found', { cause: 404 })
      }

      const bd = (await request.json()) as Partial<UpdatePostDto>
      const updatedPost = db.post.update({
        where: { id: { equals: postId } },
        data: {
          ...bd
        }
      })
      await persistDb('post')
      return HttpResponse.json(wrapBackendSuccessResponse({ data: updatedPost }), { status: 200 })
    } catch (error: any) {
      return HttpResponse.json({ error: error?.message || 'Server Error' }, { status: error?.cause || 500 })
    }
  }),
  http.delete(`${mockBaseUrl}/posts/:postId`, async ({ params, cookies }) => {
    try {
      requireAuth(cookies)

      const { postId } = params as { postId: string }
      if (!postId) {
        throw new Error('Post ID is required', { cause: 400 })
      }

      db.post.delete({
        where: { id: { equals: postId } }
      })
      await persistDb('post')

      return HttpResponse.json(wrapBackendSuccessResponse({ data: null }), { status: 200 })
    } catch (error: any) {
      return HttpResponse.json({ error: error?.message || 'Server Error' }, { status: error?.cause || 500 })
    }
  }),
  http.get(`${mockBaseUrl}/posts/my-posts/`, async ({ cookies }) => {
    try {
      const { user } = requireAuth(cookies)
      // const url = new URL(request.url)
      // const page = parseInt(url.searchParams.get('page') || '1')
      // // const previous = parseInt(url.searchParams.get('previous') || '0')
      // const limit = parseInt(url.searchParams.get('limit') || '10')

      // // pagination
      // const skip = (page - 1) * limit
      // const take = limit

      const posts = db.post.findMany({
        where: {
          username: {
            equals: user.username
          }
        },
        orderBy: {
          created_datetime: 'desc'
        }
        // skip: skip,
        // take
      })

      const count = db.post.count({
        where: {
          username: {
            equals: user.username
          }
        }
      })

      const response = {
        data: posts,
        metadata: {
          count
          // page, limit
        }
      }
      return HttpResponse.json(wrapBackendSuccessResponse({ data: response, metadata: { count } }), { status: 200 })
    } catch (error: any) {
      return HttpResponse.json({ error: error?.message || 'Server Error' }, { status: error?.cause || 500 })
    }
  }),

  http.get(`${mockBaseUrl}/posts/:id`, async ({ cookies }) => {
    try {
      const { user } = requireAuth(cookies)
      // const url = new URL(request.url)
      // const page = parseInt(url.searchParams.get('page') || '1')
      // // const previous = parseInt(url.searchParams.get('previous') || '0')
      // const limit = parseInt(url.searchParams.get('limit') || '10')

      // // pagination
      // const skip = (page - 1) * limit
      // const take = limit

      const posts = db.post.findMany({
        where: {
          username: {
            equals: user.username
          }
        },
        orderBy: {
          created_datetime: 'desc'
        }
        // skip: skip,
        // take
      })

      const count = db.post.count({
        where: {
          username: {
            equals: user.username
          }
        }
      })

      const response = {
        data: posts,
        metadata: {
          count
          // page, limit
        }
      }
      return HttpResponse.json(wrapBackendSuccessResponse(response), { status: 200 })
    } catch (error: any) {
      return HttpResponse.json({ error: error?.message || 'Server Error' }, { status: error?.cause || 500 })
    }
  })
]
