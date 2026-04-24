import { z } from 'zod';
import { FOCUS_AREAS, FITNESS_LEVELS, GOALS } from './exercise-library.js';

export const generateWorkoutInput = z.object({
  gender: z.string().optional().default(''),
  age: z.coerce.number().int().min(1).max(120),
  weight: z.coerce.number().positive(),
  weightUnit: z.enum(['kg', 'lbs']).default('kg'),
  height: z.union([z.coerce.number().positive(), z.string().min(1)]),
  heightUnit: z.enum(['cm', 'ft']).default('cm'),
  goal: z.enum(GOALS),
  fitnessLevel: z.enum(FITNESS_LEVELS),
  daysPerWeek: z.coerce.number().int().min(1).max(7),
  equipment: z
    .object({
      dumbbells: z.boolean().optional(),
      barbell: z.boolean().optional(),
      resistanceBands: z.boolean().optional(),
      machine: z.boolean().optional(),
    })
    .default({}),
  focusAreas: z.array(z.enum(FOCUS_AREAS)).default([]),
});
