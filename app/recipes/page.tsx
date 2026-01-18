import { RecipesContent } from '@/components/recipes/RecipesContent';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';

export default function RecipesPage() {
  return (
    <TransitionWrapper>
      <RecipesContent />
    </TransitionWrapper>
  );
}
