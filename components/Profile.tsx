import { FC } from 'react'
import Image from 'next/image'
import { CameraIcon } from '@heroicons/react/solid'
import { format } from 'date-fns'
import useStore from '../store'
import { useQueryProfile } from '../hooks/useQueryProfile'
import { useMutateProfile } from '../hooks/useMutateProfile'
import { useDownloadUrl } from '../hooks/useDownloadUrl'
import { useUploadAvatarImg } from '../hooks/useUploadAvatarImg'
import { Spinner } from './Spinner'

export const Profile: FC = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const update = useStore((state) => state.updateEditedProfile)
  const { data: profile } = useQueryProfile()
  const { updateProfileMutation } = useMutateProfile()
  const { useMutateUploadAvatarImg } = useUploadAvatarImg()
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(
    editedProfile.avatar_url,
    'avatars'
  )
  const updateProfile = () => {
    updateProfileMutation.mutate({
      id: session?.user?.id,
      username: editedProfile.username,
      favorites: editedProfile.favorites,
      avatar_url: editedProfile.avatar_url,
    })
  }
  return (
    <>
      <p className="mb-4">{profile?.username}</p>
      {avatarUrl && (
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full"
          width={100}
          height={100}
        />
      )}
      <div className="flex justify-center">
        <label htmlFor="avatar">
          <CameraIcon className="my-4 h-8 w-8 cursor-pointer text-gray-500" />
        </label>
        {isLoading && <Spinner />}
        <input
          className="hidden"
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => useMutateUploadAvatarImg.mutate(e)}
        />
      </div>
      <p className="mt-4">Username</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        value={editedProfile.username || ''}
        onChange={(e) => update({ ...editedProfile, username: e.target.value })}
      />
      <p>Favorites</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        value={editedProfile.favorites || ''}
        onChange={(e) =>
          update({ ...editedProfile, favorites: e.target.value })
        }
      />
      <button
        className={`my-5 rounded ${
          updateProfileMutation.isLoading || !editedProfile.username
            ? 'bg-gray-300'
            : 'bg-gray-700'
        } flex justify-center rounded-md py-2 px-16 text-sm text-white`}
        onClick={updateProfile}
        disabled={updateProfileMutation.isLoading || !editedProfile.username}
      >
        {updateProfileMutation.isLoading ? 'loading...' : 'update'}
      </button>
      {profile?.created_at && (
        <p className="my-1 text-sm">
          {format(new Date(profile.created_at), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      )}
      {profile?.updated_at && (
        <p className="my-1 text-sm">
          {format(new Date(profile.updated_at), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      )}
    </>
  )
}
