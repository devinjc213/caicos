import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, phoneNumber, checkInDate, checkOutDate, rentalLocation } = req.body;

  let userOptions = {};
  let ownerOptions = {};
  if (typeof firstName === 'string'
    && typeof lastName === 'string'
    && typeof email === 'string'
    && typeof checkInDate === 'string'
    && typeof checkOutDate === 'string'
    && typeof rentalLocation === 'string'
    && typeof phoneNumber === 'string'
  ) {
    userOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your stay at ${rentalLocation} is confirmed!`,
      body: `${firstName} ${lastName} ${checkInDate} -> ${checkOutDate}`,
    }

    ownerOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New booking at ${rentalLocation}`,
      body: `${firstName} ${lastName} ${email} ${phoneNumber} ${checkInDate} -> ${checkOutDate}`,
    }
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transporter.sendMail(userOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200);
    }
  });

  transporter.sendMail(ownerOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200)
    }
  });
}

export default handler;
