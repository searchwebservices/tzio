import { InteractiveObject } from '../InteractiveObject';

export function Bottle() {
  return (
    <InteractiveObject
      id="bottle"
      src="/assets/bottle.png"
      alt="TZIO Bottle - Recipes"
      width={80}
      height={220}
      className="absolute"
      style={{
        left: '42%',
        bottom: '8%',
        transform: 'translateX(-50%)',
      }}
      priority
    />
  );
}
