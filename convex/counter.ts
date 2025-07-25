import { components } from './_generated/api';
import { ShardedCounter } from '@convex-dev/sharded-counter';
import { MutationCtx } from './_generated/server';

const counter = new ShardedCounter(components.shardedCounter);

export const totalRegistrations = counter.for('totalRegistrations');
const data = [
  'Aba North',
  'Aba South',
  'Arochukwu',
  'Bende',
  'Ikwuano',
  'Isiala Ngwa North',
  'Isiala Ngwa South',
  'Isuikwuato',
  'Obi Ngwa',
  'Ohafia',
  'Osisioma Ngwa',
  'Ugwunagbo',
  'Ukwa East',
  'Ukwa West',
  'Umuahia North',
  'Umuahia South',
  'Umu-Nneochi',
] as const;

// Create a type for the LGA names
export type LGAName = (typeof data)[number];

// Helper function to convert LGA name to counter key
const lgaToCounterKey = (lga: string): string => {
  return lga
    .toLowerCase()
    .replace(/\s+/g, '') // Remove spaces
    .replace(/-/g, ''); // Remove hyphens
};

// Create counters dynamically
const counters = new Map<string, ReturnType<typeof counter.for>>();

// Initialize all counters
data.forEach((lga) => {
  const key = lgaToCounterKey(lga);
  counters.set(lga, counter.for(key));
});

// Export individual counters (if needed for direct access)
export const abaNorth = counters.get('Aba North')!;
export const abaSouth = counters.get('Aba South')!;
export const arochukwu = counters.get('Arochukwu')!;
export const bende = counters.get('Bende')!;
export const ikwuano = counters.get('Ikwuano')!;
export const isialaNgwaNorth = counters.get('Isiala Ngwa North')!;
export const isialaNgwaSouth = counters.get('Isiala Ngwa South')!;
export const isuikwuato = counters.get('Isuikwuato')!;
export const obiNgwa = counters.get('Obi Ngwa')!;
export const ohafia = counters.get('Ohafia')!;
export const osisiomaNgwa = counters.get('Osisioma Ngwa')!;
export const ugwunagbo = counters.get('Ugwunagbo')!;
export const ukwaEast = counters.get('Ukwa East')!;
export const ukwaWest = counters.get('Ukwa West')!;
export const umuahiaNorth = counters.get('Umuahia North')!;
export const umuahiaSouth = counters.get('Umuahia South')!;
export const umuNneochi = counters.get('Umu-Nneochi')!;

// Improved increaseCounter function
export const increaseCounter = async (
  lga: LGAName,
  ctx: MutationCtx
): Promise<void> => {
  const counter = counters.get(lga);

  if (!counter) {
    throw new Error(`Counter not found for LGA: ${lga}`);
  }

  await counter.inc(ctx);
};

// Alternative approach: Even cleaner version using object mapping
export const increaseCounterV2 = async (
  lga: LGAName,
  ctx: MutationCtx
): Promise<void> => {
  // Direct mapping approach
  const counterMap: Record<LGAName, ReturnType<typeof counter.for>> = {
    'Aba North': counter.for('abaNorth'),
    'Aba South': counter.for('abaSouth'),
    Arochukwu: counter.for('arochukwu'),
    Bende: counter.for('bende'),
    Ikwuano: counter.for('ikwuano'),
    'Isiala Ngwa North': counter.for('isialaNgwaNorth'),
    'Isiala Ngwa South': counter.for('isialaNgwaSouth'),
    Isuikwuato: counter.for('isuikwuato'),
    'Obi Ngwa': counter.for('obiNgwa'),
    Ohafia: counter.for('ohafia'),
    'Osisioma Ngwa': counter.for('osisiomaNgwa'),
    Ugwunagbo: counter.for('ugwunagbo'),
    'Ukwa East': counter.for('ukwaEast'),
    'Ukwa West': counter.for('ukwaWest'),
    'Umuahia North': counter.for('umuahiaNorth'),
    'Umuahia South': counter.for('umuahiaSouth'),
    'Umu-Nneochi': counter.for('umuNneochi'),
  };

  await counterMap[lga].inc(ctx);
};
