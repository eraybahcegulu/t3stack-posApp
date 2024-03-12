import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "app/server/api/trpc";

export const orderRouter = createTRPCRouter({

    create: publicProcedure
        .input(z.object({
            customerName: z.string().min(1, { message: 'Cannot be empty' }).max(20, { message: 'Max length 20 characters' }),
            customerSurname: z.string().min(1, { message: 'Cannot be empty' }).max(20, { message: 'Max length 20 characters' }),
            customerEmail: z.string().min(1, { message: 'Cannot be empty' }).max(40, { message: 'Max length 40 characters' }),
            subTotal: z.number().min(0.1, { message: 'Cannot be empty' }),
            vat: z.number().min(0, { message: 'Cannot be empty' }),
            total: z.number().min(0.1, { message: 'Cannot be empty' }),
            products: z.array(
                z.object({
                    id: z.number().min(1, { message: 'Cannot be empty' }),
                    quantity: z.number().min(1, { message: 'Cannot be empty' }),
                })
            )
        }))
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            await ctx.db.order.create({
                data: {
                    customerName: input.customerName,
                    customerSurname: input.customerSurname,
                    customerEmail: input.customerEmail,
                    subTotal: input.subTotal,
                    vat: input.vat,
                    total: input.total,
                    items: {
                        create: input.products.map(product => ({
                            product: { connect: { id: product.id } },
                            quantity: product.quantity
                        }))
                    }
                },
                include: {
                    items: true
                }
            });
            return { message: `Order is confirmed` };
        }),


    getAll: publicProcedure.query(async ({ ctx }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const orders = await ctx.db.order.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }

        });

        return orders;
    }),
});