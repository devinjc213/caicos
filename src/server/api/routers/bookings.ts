import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookingsRouter = createTRPCRouter({
  createBooking: publicProcedure
    .input(z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phoneNumber: z.string(),
      checkInDate: z.string(),
      checkOutDate: z.string(),
      rentalLocationId: z.number()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.bookings.create({ data: input })
    }),

  getBookingsAtLocation: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.bookings.findMany({ where: { rentalLocationId: input.id }})
    }),

  getAllBookings: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bookings.findMany();
  }),
});
