import { InteractiveObject } from '../InteractiveObject';

export function Boombox() {
  return (
    <InteractiveObject
      id="boombox"
      src="/assets/boombox.png"
      alt="Boombox - Music & Happenings"
      width={160}
      height={160}
      className="absolute"
      style={{
        left: '12%',
        bottom: '12%',
      }}
    />
  );
}
