import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "app/server/api/trpc";

export const categoryRouter = createTRPCRouter({

    create: publicProcedure
        .input(z.object({ name: z.string().min(1, { message: 'Cannot be empty' }).max(150, { message: 'Max length 150 characters' }) }))
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const existCategory = await ctx.db.category.findFirst({
                where:{
                    name: input.name
                }
            })

            if(existCategory){
                return { error: 'Category already exist'}
            }

            await ctx.db.category.create({
                data: {
                    name: input.name,
                },
            });

            return { message: `Category created` };
        }),


});