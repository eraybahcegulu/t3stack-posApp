import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "app/server/api/trpc";

export const categoryRouter = createTRPCRouter({

    create: publicProcedure
        .input(z.object({ name: z.string().min(1, { message: 'Cannot be empty' }).max(20, { message: 'Max length 20 characters' }) }))
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const existCategory = await ctx.db.category.findFirst({
                where: {
                    name: input.name
                }
            })

            if (existCategory) {
                return { error: 'Category already exist' }
            }

            await ctx.db.category.create({
                data: {
                    name: input.name,
                },
            });

            return { message: `Category created` };
        }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const categories = await ctx.db.category.findMany({
            orderBy: { createdAt: "desc" },
        });

        return categories;
    }),

    delete: publicProcedure
        .input(z.object({ id: z.number().min(1) }))
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const existingCategory = await ctx.db.category.findFirst({
                where: { id: input.id },
            });

            if (!existingCategory) {
                return { error: `Failed. Category not found.` };
            }

            await ctx.db.product.deleteMany({
                where: {
                    categoryId: existingCategory.id
                }
            })

            await ctx.db.category.delete({
                where: {
                    id: existingCategory.id
                }
            })

            return { message: `Category deleted successfully` };
        }),

        edit: publicProcedure
        .input(
            z.object({ 
                id: z.number().min(1),
                name: z.string().min(1, { message: 'Cannot be empty' }).max(20, { message: 'Max length 20 characters' }),
            }))
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const existCategory = await ctx.db.category.findFirst({
                where: { id: input.id },
            });

            if (!existCategory) {
                return { error: `Failed. Category not found.` };
            }

            await ctx.db.category.update({
                where: {
                    id: existCategory.id
                },
                data:{
                    name: input.name
                }
            })

            return { message: `Category updated successfully` };
        }),
});