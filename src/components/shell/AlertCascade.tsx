'use client';

interface Props {
  alerts: string[];
}

export function AlertCascade({ alerts }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
      {alerts.slice(0, 5).map((a, i) => (
        <div
          key={`${a}-${i}`}
          className="panel"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            padding: '4px 8px',
            color: a.includes('NOMINAL') ? 'var(--green-neon)' : 'var(--red)',
            borderColor: a.includes('NOMINAL') ? 'rgba(0,255,159,.4)' : 'var(--red)',
            animation: `cascade-in 0.25s ease-out ${i * 0.05}s both`,
          }}
        >
          {a}
        </div>
      ))}
    </div>
  );
}