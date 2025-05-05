import { db } from '../utils/db';
import { categoriesTable } from '../db/schema';
import { generateSlug } from '../utils/slugGenerator';
import { eq } from 'drizzle-orm';
import { CreateCategoryInput, UpdateCategoryInput } from '../validations/categorySchema';

export class CategoryService {
    /**
     * Create a new category
     */
    async createCategory(data: CreateCategoryInput) {
        const slug = generateSlug(data.name);
        
        const existingCategory = await this.getCategoryBySlug(slug);
        if (existingCategory) {
        throw new Error('A category with a similar name already exists');
        }

        const result = await db.insert(categoriesTable).values({
        name: data.name,
        slug,
        status: data.status
        }).returning();

        return result[0];
    }

    /**
     * Get all categories
     */
    async getAllCategories() {
        return await db.select().from(categoriesTable);
    }

    /**
     * Get a category by ID
     */
    async getCategoryById(id: string) {
        const result = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id));
        return result[0] || null;
    }

    /**
     * Get a category by slug
     */
    async getCategoryBySlug(slug: string) {
        const result = await db.select().from(categoriesTable).where(eq(categoriesTable.slug, slug));
        return result[0] || null;
    }

    /**
     * Update a category
     */
    async updateCategory(id: string, data: UpdateCategoryInput) {
        const category = await this.getCategoryById(id);
        if (!category) {
        throw new Error('Category not found');
        }

        // If name is being updated, generate a new slug
        let slug = category.slug;
        if (data.name) {
        slug = generateSlug(data.name);
        
        // Check if the new slug conflicts with an existing category (that's not the one being updated)
        const existingWithSlug = await this.getCategoryBySlug(slug);
        if (existingWithSlug && existingWithSlug.id !== id) {
            throw new Error('A category with a similar name already exists');
        }
        }

        const result = await db.update(categoriesTable)
        .set({
            name: data.name || category.name,
            slug: slug,
            status: data.status || category.status,
            updatedAt: new Date()
        })
        .where(eq(categoriesTable.id, id))
        .returning();

        return result[0];
    }

    /**
     * Delete a category
     */
    async deleteCategory(id: string) {
        const category = await this.getCategoryById(id);
        if (!category) {
        throw new Error('Category not found');
        }

        await db.delete(categoriesTable).where(eq(categoriesTable.id, id));
        return { success: true };
    }
}

export const categoryService = new CategoryService();