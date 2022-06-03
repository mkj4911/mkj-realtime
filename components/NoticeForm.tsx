import { FormEvent, FC, memo } from 'react'
import useStore from '../store'
import { useMutateNotice } from '../hooks/useMutateNotice'

export const NoticeFormMemo: FC = () => {
  const session = useStore((state) => state.session)
  const editedNotice = useStore((state) => state.editedNotice)
  const update = useStore((state) => state.updateEditedNotice)
  const { createNoticeMutation, updateNoticeMutation } = useMutateNotice()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNotice.id === '')
      createNoticeMutation.mutate({
        content: editedNotice.content,
        user_id: session?.user?.id,
      })
    else {
      updateNoticeMutation.mutate({
        id: editedNotice.id,
        content: editedNotice.content,
      })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="rounted my-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        placeholder="New Notice ?"
        value={editedNotice.content}
        onChange={(e) => update({ ...editedNotice, content: e.target.value })}
      />
      <div className="my-3 flex justify-center">
        <button
          type="submit"
          data-testid="btn-notice" // test
          className={`rounded ${
            editedNotice.content ? 'bg-gray-700' : 'bg-gray-300'
          } flex justify-center rounded-md py-2 px-16 text-sm text-white`}
          disabled={!editedNotice.content}
        >
          {editedNotice.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}
export const NoticeForm = memo(NoticeFormMemo)
