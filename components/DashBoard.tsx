import { FC, Suspense } from 'react'
import { useQueryClient } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { LogoutIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { Spinner } from './Spinner'
import { UserProfile } from './UserProfile'
import { Notification } from './Notification'

export const DashBoard: FC = () => {
  const quetyClient = useQueryClient()
  const resetProfile = useStore((state) => state.resetEditedProfile)
  const resetNotice = useStore((state) => state.resetEditedNotice)
  const signOut = () => {
    resetProfile()
    resetNotice()
    supabase.auth.signOut()
    quetyClient.removeQueries(['profile'])
    quetyClient.removeQueries(['notices'])
  }
  return (
    <>
      <LogoutIcon
        className="my-6 h-6 w-6 cursor-pointer text-gray-700"
        onClick={signOut}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <UserProfile />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="flex flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <Notification />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  )
}
