import Image from 'next/image';

export function Signs() {
  return (
    <>
      {/* Pensando en Usted - upper left */}
      <div 
        className="absolute"
        style={{
          left: '5%',
          top: '18%',
          transform: 'rotate(-3deg)',
        }}
      >
        <Image
          src="/assets/sign-pensando.png"
          alt="Pensando en Usted"
          width={140}
          height={100}
          className="drop-shadow-lg select-none"
          draggable={false}
        />
      </div>

      {/* Hecho en México - upper right */}
      <div 
        className="absolute"
        style={{
          right: '5%',
          top: '15%',
          transform: 'rotate(2deg)',
        }}
      >
        <Image
          src="/assets/sign-hecho.png"
          alt="Hecho en México"
          width={130}
          height={90}
          className="drop-shadow-lg select-none"
          draggable={false}
        />
      </div>

      {/* Hoy No Fío - mid right */}
      <div 
        className="absolute"
        style={{
          right: '12%',
          top: '35%',
          transform: 'rotate(1deg)',
        }}
      >
        <Image
          src="/assets/sign-nofio.png"
          alt="Hoy No Fío, Mañana Sí"
          width={130}
          height={110}
          className="drop-shadow-md select-none"
          draggable={false}
        />
      </div>

      {/* De Bartenders - mid left */}
      <div 
        className="absolute"
        style={{
          left: '22%',
          top: '42%',
          transform: 'rotate(-2deg)',
        }}
      >
        <Image
          src="/assets/sign-bartenders.png"
          alt="De Bartenders Para Bartenders"
          width={120}
          height={90}
          className="drop-shadow-lg select-none"
          draggable={false}
        />
      </div>
    </>
  );
}
