import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'primary'
}

export default function Button({ children, variant = 'ghost', className = '', ...props }: Props) {
  const base = 'btn'
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost'
  return (
    <button className={`${base} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  )
}
