import { useScrollProgress } from '../../hooks/useAnimations';

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9990]">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
