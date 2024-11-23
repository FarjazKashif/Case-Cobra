// pages/api/send-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Define the structure of the expected request body
interface FormData {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    notes: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, address, city, state, zip, phone, email, notes }: FormData = req.body;

        // Configure the transporter for Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // You can use other services like Outlook or Yahoo
            auth: {
                user: process.env.EMAIL_USER, // Your email address (configured in environment variables)
                pass: process.env.EMAIL_PASS, // App-specific password for Gmail or email password
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,  // Sender's email address
            to: email,  // Recipient's email (from the form)
            subject: 'New Order Submission',
            text: `
        You have a new order submission:

        Name: ${name}
        Address: ${address}
        City: ${city}
        State: ${state}
        ZIP Code: ${zip}
        Phone: ${phone}
        Email: ${email}
        Notes: ${notes || 'None'}
      `,
        };

        try {
            // Sending the email
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send email' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
