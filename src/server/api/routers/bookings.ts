import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookingsRouter = createTRPCRouter({
  createBooking: publicProcedure
    .input(z.object({
      email: z.string(),
      phoneNumber: z.string(),
      checkInDate: z.date(),
      checkOutDate: z.date(),
      rentalLocationId: z.number()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.bookings.create({ data: input })
    }),

  getAllBookings: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bookings.findMany();
  }),
});
