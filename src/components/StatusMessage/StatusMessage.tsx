// StatusMessage: הודעת "טוען..." או הודעת שגיאה
import styles from './StatusMessage.module.css'

interface StatusMessageProps {
  type: 'loading' | 'error'
  message: string
}

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
