import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

type Variant = 'primary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

export default function Button({
  variant = 'primary',
  loading = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    styles.base,
    styles[variant],
    loading ? styles.loading : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
