import { z } from 'zod';

export const CategoryStatus = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived'
} as const;

export type CategoryStatus = typeof CategoryStatus[keyof typeof CategoryStatus];

export const createCategorySchema = z.object({
    name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(255, { message: 'Name cannot exceed 255 characters' })
    .trim(),
    status: z.enum([CategoryStatus.ACTIVE, CategoryStatus.INACTIVE, CategoryStatus.ARCHIVED])
    .default(CategoryStatus.ACTIVE)
});

export const updateCategorySchema = z.object({
    name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(255, { message: 'Name cannot exceed 255 characters' })
    .trim()
    .optional(),
    status: z.enum([CategoryStatus.ACTIVE, CategoryStatus.INACTIVE, CategoryStatus.ARCHIVED])
    .optional()
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;