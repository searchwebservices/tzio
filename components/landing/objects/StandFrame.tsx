import Image from 'next/image';

export function StandFrame() {
  return (
    <div 
      className="absolute"
      style={{
        left: '50%',
        bottom: '5%',
        transform: 'translateX(-50%)',
      }}
    >
      <Image
        src="/assets/stand.png"
        alt="Puesto de Naranjas TZIO"
        width={550}
        height={500}
        priority
        className="select-none"
        style={{
          filter: 'drop-shadow(0 8px 24px rgba(45, 27, 14, 0.5))',
        }}
        draggable={false}
      />
    </div>
  );
}
