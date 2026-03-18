import React from 'react'

export function Skeleton({ width, height, radius = 8, style = {} }) {
  return (
    <div
      className="skeleton"
      style={{
        width: width || '100%',
        height: height || 16,
        borderRadius: radius,
        ...style,
      }}
    />
  )
}

export function SkeletonCard({ rows = 3, style = {} }) {
  return (
    <div className="portal-card skeleton-card" style={style}>
      <Skeleton width="40%" height={14} style={{ marginBottom: 12 }} />
      <Skeleton width="60%" height={24} radius={6} style={{ marginBottom: 16 }} />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton
          key={i}
          width={`${70 + Math.random() * 30}%`}
          height={12}
          style={{ marginBottom: i < rows - 1 ? 8 : 0 }}
        />
      ))}
    </div>
  )
}

export function SkeletonTable({ cols = 5, rows = 5 }) {
  return (
    <div className="p-table" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '10px 20px', background: 'var(--p-bg, var(--bg))', borderBottom: '0.5px solid var(--p-sep, var(--sep))' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} width="70%" height={10} />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, ri) => (
        <div
          key={ri}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 16,
            padding: '14px 20px',
            borderBottom: ri < rows - 1 ? '0.5px solid var(--p-sep, var(--sep))' : 'none',
          }}
        >
          {Array.from({ length: cols }).map((_, ci) => (
            <Skeleton key={ci} width={`${50 + Math.random() * 40}%`} height={12} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 24 }}>
        <Skeleton width="250px" height={28} style={{ marginBottom: 8 }} />
        <Skeleton width="320px" height={14} />
      </div>
      <div className="g2" style={{ marginBottom: 14 }}>
        <Skeleton height={200} radius={22} />
        <Skeleton height={200} radius={22} />
      </div>
      <div className="g4" style={{ marginBottom: 14 }}>
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} rows={2} />
        ))}
      </div>
      <div className="g2">
        <SkeletonCard rows={4} style={{ minHeight: 200 }} />
        <SkeletonCard rows={4} style={{ minHeight: 200 }} />
      </div>
    </div>
  )
}
