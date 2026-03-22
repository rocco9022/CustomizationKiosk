import { useMemo, useState } from 'react';
import { assets } from '../data/figmaAssets';
import styles from './MealCustomization.module.css';

/**
 * Todos los modifiers en orden de grilla. `defaultSelected` = estado inicial al cargar.
 */
const ADD_ON_ITEMS = [
  { id: 'jalapenos', title: 'Jalapenos', meta: 'price', src: assets.jalapenos, badge: 'popular' },
  { id: 'bbq', title: 'BBQ Sauce', meta: 'price', src: assets.bbqSauce, badge: 'popular' },
  { id: 'mustard', title: 'Mustard', meta: 'price', src: assets.mustard, badge: 'popular' },
  { id: 'onionRings', title: 'Onion Rings', meta: 'price', src: assets.onionRings },
  {
    id: 'impossible',
    title: 'Substitute Impossible Patty',
    meta: 'price',
    src: assets.impossiblePatty,
  },
  { id: 'bun', title: 'Bun', meta: 'price', src: assets.bun },
  { id: 'plain', title: 'Make it Plain', meta: null, src: assets.makeItPlain },
  { id: 'half', title: 'Cut in Half', meta: null, src: assets.cutInHalf },
  { id: 'ketchup', title: 'Ketchup', meta: 'price', src: assets.ketchup, badge: 'popular' },
  {
    id: 'bacon-heavy',
    title: 'Bacon',
    meta: 'price',
    src: assets.bacon,
    badge: 'popular',
    heavy: true,
    defaultSelected: true,
  },
  {
    id: 'lettuce-inc',
    title: 'Lettuce',
    meta: 'price',
    src: assets.lettuce,
    badge: 'new',
    defaultSelected: true,
  },
  {
    id: 'tomato-inc',
    title: 'Tomato',
    meta: 'price',
    src: assets.tomato,
    defaultSelected: true,
  },
  {
    id: 'onion-inc',
    title: 'Onion',
    meta: 'price',
    src: assets.onion,
    defaultSelected: true,
  },
  {
    id: 'pickles-inc',
    title: 'Pickles',
    meta: 'price',
    src: assets.pickles,
    badge: 'popular',
    defaultSelected: true,
  },
  {
    id: 'mayo-inc',
    title: 'Mayo',
    meta: 'price',
    src: assets.mayo,
    badge: 'popular',
    defaultSelected: true,
  },
];

function buildInitialSelection() {
  const initial = {};
  ADD_ON_ITEMS.forEach((item) => {
    initial[item.id] = Boolean(item.defaultSelected);
  });
  return initial;
}

export function IncludeCard({ label, src, onRemove }) {
  return (
    <div className={styles.includeCard}>
      <div className={styles.includeInner}>
        <div className={styles.includeImage}>
          <img alt="" src={src} />
        </div>
        <p className={styles.includeLabel}>{label}</p>
      </div>
      <button
        type="button"
        className={styles.removeBtn}
        aria-label={`Remove ${label}`}
        onClick={onRemove}
      >
        <img alt="" src={assets.cancel} />
      </button>
    </div>
  );
}

export function AddOnCard({
  title,
  meta,
  src,
  badge,
  heavy,
  selected,
  onToggle,
}) {
  return (
    <button
      type="button"
      className={`${styles.addonCard} ${selected ? styles.addonCardSelected : ''}`}
      onClick={onToggle}
      aria-pressed={selected}
    >
      {badge === 'popular' && (
        <span className={`${styles.badge} ${styles.badgePopular}`}>Popular</span>
      )}
      {badge === 'new' && <span className={`${styles.badge} ${styles.badgeNew}`}>New</span>}
      {heavy && (
        <span className={`${styles.badge} ${styles.badgeHeavy}`}>Heavy</span>
      )}
      <div className={styles.addonRow}>
        <div className={styles.addonImage}>
          <img alt="" src={src} />
        </div>
        <div className={styles.addonCopy}>
          <p className={styles.addonTitle}>{title}</p>
          {meta === 'price' && (
            <p className={styles.addonMeta}>
              <strong>$8.43 </strong>
              <span> |  40 Cal</span>
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default function MealCustomization() {
  const [addonSelection, setAddonSelection] = useState(buildInitialSelection);

  /** Cualquier modifier seleccionado aparece en Includes, en el mismo orden que la grilla */
  const visibleIncludes = useMemo(
    () => ADD_ON_ITEMS.filter((item) => addonSelection[item.id]),
    [addonSelection]
  );

  const toggleAddon = (item) => {
    setAddonSelection((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));
  };

  const removeIncludeByAddonId = (addonId) => {
    setAddonSelection((prev) => ({ ...prev, [addonId]: false }));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero} aria-label="Product">
          <div className={styles.heroBg} aria-hidden>
            <img alt="" src={assets.heroBackground} />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.titleBlock}>
              <h1 className={styles.productTitle}>Whopper Medium Meal</h1>
              <p className={styles.productMeta}>{'      $5.15    |    870 Cal'}</p>
            </div>
            <div className={styles.heroImageWrap}>
              <img alt="Whopper sandwich" src={assets.heroBurger} />
            </div>
          </div>
        </section>

        <h2 className={`${styles.sectionHeading} ${styles.sectionHeadingIncludes}`}>Includes:</h2>

        <div className={styles.includesStrip}>
          <div className={styles.includesRow}>
            {visibleIncludes.length === 0 ? (
              <p className={styles.includesEmpty}>
                No ingredients in this build — select items in Add-Ons below.
              </p>
            ) : (
              visibleIncludes.map((item) => (
                <IncludeCard
                  key={item.id}
                  label={item.title}
                  src={item.src}
                  onRemove={() => removeIncludeByAddonId(item.id)}
                />
              ))
            )}
          </div>
        </div>

        <h2 className={`${styles.sectionHeading} ${styles.sectionHeadingAddons}`}>Add-Ons</h2>

        <section className={styles.addonsSection} aria-label="Add-ons">
          <div className={styles.addonsGrid}>
            {ADD_ON_ITEMS.map((item) => (
              <AddOnCard
                key={item.id}
                title={item.title}
                meta={item.meta}
                src={item.src}
                badge={item.badge}
                heavy={item.heavy}
                selected={addonSelection[item.id]}
                onToggle={() => toggleAddon(item)}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.bottomNav}>
        <div className={styles.navBar}>
          <button type="button" className={styles.btnBack}>
            <img alt="" src={assets.back} />
            Back
          </button>
          <button type="button" className={styles.btnPrimary}>
            Update Sandwich
            <img alt="" src={assets.forward} />
          </button>
        </div>
        <div className={styles.legalRow}>
          <button type="button" className={styles.btnGhost}>
            Legal
          </button>
          <p className={styles.legalText}>
            2,000 calories a day is used for general nutrition advice, but calorie needs may vary.
            Additional nutrition information is available upon request.
          </p>
          <button type="button" className={styles.iconCircle} aria-label="Accessibility options">
            <img alt="" src={assets.accessible} />
          </button>
          <button type="button" className={styles.btnGhost}>
            Cancel Order
          </button>
        </div>
      </footer>
    </div>
  );
}
