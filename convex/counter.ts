import { components } from './_generated/api';
import { ShardedCounter } from '@convex-dev/sharded-counter';

const counter = new ShardedCounter(components.shardedCounter);

export const totalRegistrations = counter.for('totalRegistrations');
