// StatusMessage: one small component for both the "Loading..." message and the error message.
import styles from './StatusMessage.module.css'

// type can only be 'loading' or 'error' (a union of two strings). TypeScript won't accept anything else.
interface StatusMessageProps {
  type: 'loading' | 'error'
  message: string
}

// styles[type] picks the CSS class with the same name: .loading or .error.
// role tells screen readers about the message: 'alert' is read out right away, 'status' politely.
const StatusMessage = ({ type, message }: StatusMessageProps) => {
  return (
    <p
      className={`${styles.statusMessage} ${styles[type]}`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      {message}
    </p>
  )
}

export default StatusMessage
