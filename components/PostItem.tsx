import { FC, useState, Suspense, memo } from 'react'
import Image from 'next/image'
import {
  PencilAltIcon,
  TrashIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import { ChatAlt2Icon } from '@heroicons/react/outline'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from './Spinner'
import useStore from '../store'
import { Post } from '../types'
import { useMutatePost } from '../hooks/useMutatePost'
import { useQueryAvatar } from '../hooks/useQueryAvatar'
import { useDownloadUrl } from '../hooks/useDownloadUrl'

export const PostItemMemo: FC<Omit<Post, 'created_at'>> = ({
  id,
  title,
  memo,
  post_url,
  user_id,
}) => {
  const session = useStore((state) => state.session)
  const update = useStore((state) => state.updateEditedPost)
  const { data } = useQueryAvatar(user_id)
  const { deletePostMutation } = useMutatePost()
  const { fullUrl: avatarUrl, isLoading: isLoadingAvatar } = useDownloadUrl(
    data?.avatar_url,
    'avatars'
  )
  const { fullUrl: postUrl, isLoading: isLoadingPost } = useDownloadUrl(
    post_url,
    'posts'
  )
  return (
    <>
      <li className="w-80">
        <div className="my-3 w-full border border-dashed border-gray-400"></div>
        <div className="flex items-center justify-between">
          <div className="flex">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar"
                className="rounded-full"
                width={40}
                height={40}
              />
            ) : (
              <UserCircleIcon className="inline-block h-8 w-8 cursor-pointer text-gray-500" />
            )}
          </div>
          {session?.user?.id === user_id && (
            <div className="flex pr-4">
              <PencilAltIcon
                data-testid="pencil-post"
                className="mx-2 h-5 w-5 cursor-pointer text-indigo-500"
                onClick={() => {
                  update({
                    id: id,
                    title: title,
                    memo: memo,
                    post_url: post_url,
                  })
                }}
              />
              <TrashIcon
                data-testid="trash-post"
                className="h-5 w-5 cursor-pointer text-red-500"
                onClick={() => {
                  deletePostMutation.mutate(id)
                }}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="ml-2 font-bold">{title}</span>
          <span className="ml-2 font-bold">{memo}</span>
        </div>
        <div className="my-3 flex justify-center">
          {postUrl && (
            <Image
              src={postUrl}
              alt="Image"
              className="rounded-lg"
              width={300}
              height={220}
            />
          )}
        </div>
        <div className="my-3 flex justify-center">
          {(isLoadingAvatar || isLoadingPost) && <Spinner />}
        </div>
      </li>
    </>
  )
}
export const PostItem = memo(PostItemMemo)