import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "app/server/api/trpc";

export const productRouter = createTRPCRouter({

    create: publicProcedure
        .input(
            z.object({
                name: z.string().min(1, { message: 'Cannot be empty' }).max(20, { message: 'Max length 20 characters' }),
                image: z.string().min(1, { message: 'Cannot be empty' }).max(300, { message: 'Max length 300 characters' }),
                price: z.string().min(1, { message: 'Cannot be empty' }).max(20, { message: 'Max length 20 characters' }),
            })
        )
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            await ctx.db.product.create({
                data: {
                    name: input.name,
                    image: input.image,
                    price: input.price,
                },
            });

            return { message: `Product created` };
        }),

});