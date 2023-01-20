import nodemailer from 'nodemailer';
import z from 'zod';
import type { NextApiRequest, NextApiResponse } from 'next';

const emailSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  rentalLocation: z.string(),
  phoneNumber: z.string(),
})

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const parseInput = emailSchema.safeParse(req.body);

  let userOptions = {};
  let ownerOptions = {};

  if (parseInput.success) {
    const { firstName, lastName, email, phoneNumber, checkInDate, checkOutDate, rentalLocation } = parseInput.data;

    userOptions = {
      from: process.env.EMAIL_USER,
      to: parseInput.data.email,
      subject: `Your stay at ${rentalLocation} is confirmed!`,
      body: `${firstName} ${lastName} ${checkInDate} -> ${checkOutDate}`,
    }

    ownerOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New booking at ${rentalLocation}`,
      body: `${firstName} ${lastName} ${email} ${phoneNumber} ${checkInDate} -> ${checkOutDate}`,
    }
  } else {
    return res.status(400);
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  transporter.sendMail(userOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ', info.response);
      return res.status(200).json({ message: 'Email sent' });
    }
  });

  transporter.sendMail(ownerOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ', info.response);
      return res.status(200).json({ message: 'Email sent' });
    }
  });
}

export default handler;
