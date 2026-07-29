type BrandMarkProps = {
  size?: number
  className?: string
}

export function BrandMark({ size = 34, className = '' }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <circle cx="24" cy="24" r="20.5" stroke="currentColor" strokeOpacity=".22" />
      <path
        d="M24 34.5c-4.8-2.7-7.2-6-7.2-10 0-2.9 1.3-5.2 3.8-7l3.4 3 3.4-3c2.5 1.8 3.8 4.1 3.8 7 0 4-2.4 7.3-7.2 10Z"
        fill="currentColor"
      />
      <path
        d="M20.6 17.5c-3.8-1.3-6.2-4.1-7.2-8.3m3.8 5.3-4.7 1.2m14.9 1.8c3.8-1.3 6.2-4.1 7.2-8.3m-3.8 5.3 4.7 1.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="38.5" cy="9.5" r="2.5" fill="currentColor" />
    </svg>
  )
}

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-lockup ${compact ? 'brand-lockup-compact' : ''}`}>
      <BrandMark size={compact ? 30 : 34} />
      <span className="brand-wordmark">
        <strong>Deerlight</strong>
        {!compact && <small>小鹿光年</small>}
      </span>
    </span>
  )
}
