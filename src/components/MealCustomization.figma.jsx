import figma from '@figma/code-connect/react';
import { AddOnCard, IncludeCard } from './MealCustomization.jsx';
import { assets } from '../data/figmaAssets';

/**
 * Code Connect solo admite URLs de Component o Component Set en Figma.
 * El frame "Meal" (1:2551) es una pantalla, no un componente — no se puede conectar aquí.
 */

/** Figma component: Include Card */
figma.connect(
  IncludeCard,
  'https://www.figma.com/design/ZdLpMbsMvSqU3GJZGHpMm6/Untitled?node-id=1-912',
  {
    example: () => (
      <IncludeCard
        label="Bacon"
        src={assets.bacon}
        onRemove={() => {}}
      />
    ),
  }
);

/** Figma component: Horizontal Modifier (add-on card) */
figma.connect(
  AddOnCard,
  'https://www.figma.com/design/ZdLpMbsMvSqU3GJZGHpMm6/Untitled?node-id=1-1023',
  {
    example: () => (
      <AddOnCard
        title="Jalapenos"
        meta="price"
        src={assets.jalapenos}
        badge="popular"
        heavy={false}
        selected={false}
        onToggle={() => {}}
      />
    ),
  }
);
