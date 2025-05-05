import { Hono } from 'hono';
import { categoryService } from '../services/categoryService';
import { createCategorySchema, updateCategorySchema } from '../validations/categorySchema';
import { rbacAdminMiddleware } from '../middlewares/rbacMiddleware';

const categoryController = new Hono();

categoryController.get('/', async (c) => {
    const categories = await categoryService.getAllCategories();
    return c.json(categories);
});

// Get a category by ID - accessible to all authenticated users
categoryController.get('/:id', async (c) => {
    const id = c.req.param('id');
    const category = await categoryService.getCategoryById(id);
    
    if (!category) {
        return c.json({ error: 'Category not found' }, 404);
    }
    
    return c.json(category);
});

// Create a new category - admin only
categoryController.post('/', rbacAdminMiddleware, async (c) => {
    const body = await c.req.json();
    
    const validationResult = createCategorySchema.safeParse(body);
    if (!validationResult.success) {
        return c.json({ 
            error: 'Validation failed', 
            details: validationResult.error.format() 
        }, 400);
    }

    const category = await categoryService.createCategory(validationResult.data);
    return c.json(category, 201);
});

// Update a category - admin only
categoryController.put('/:id', rbacAdminMiddleware, async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();

    const validationResult = updateCategorySchema.safeParse(body);
    if (!validationResult.success) {
        return c.json({ 
            error: 'Validation failed', 
            details: validationResult.error.format() 
        }, 400);
    }

    const category = await categoryService.updateCategory(id, validationResult.data);
    return c.json(category);
});

// Delete a category - admin only
categoryController.delete('/:id', rbacAdminMiddleware, async (c) => {
    const id = c.req.param('id');
    await categoryService.deleteCategory(id);
    return c.json({ message: 'Category deleted successfully' });
});

export default categoryController;