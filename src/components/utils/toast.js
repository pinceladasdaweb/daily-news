import { toast } from 'react-toastify'

export const showToast = (type, msg) => {
  switch (type) {
    case 'SUCCESS':
      toast.success(msg, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    break
    case 'FAILED':
      toast.error(msg, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    break
    default:
      return false
  }
}
