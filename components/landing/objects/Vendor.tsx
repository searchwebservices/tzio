import { InteractiveObject } from '../InteractiveObject';

export function Vendor() {
  return (
    <InteractiveObject
      id="vendor"
      src="/assets/osvaldo.png"
      alt="Osvaldo - About Us"
      width={280}
      height={380}
      className="absolute"
      style={{
        left: '50%',
        bottom: '18%',
        transform: 'translateX(-50%)',
      }}
      priority
    />
  );
}
