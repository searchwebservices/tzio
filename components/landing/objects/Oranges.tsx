import { InteractiveObject } from '../InteractiveObject';

export function Oranges() {
  return (
    <InteractiveObject
      id="oranges"
      src="/assets/oranges.png"
      alt="Naranjas de Michoacán - Our Process"
      width={220}
      height={180}
      className="absolute"
      style={{
        left: '78%',
        bottom: '15%',
        transform: 'translateX(-50%)',
      }}
    />
  );
}
