// pages/api/submit-order.js

import { PrismaClient } from '@prisma/client';
// import { createBiginEntry } from '../../services/bigin/bigin';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('Received request body:', req.body);
      const { name, email, phone, dateOfBirth, timeOfBirth, placeOfBirth,latitude ,longitude,orderNumber, questions,language,timezone } = req.body;

      console.log('Parsed data:', { name, email, phone, dateOfBirth, timeOfBirth, placeOfBirth,latitude ,longitude, orderNumber, questions,timezone ,language});
      const isoDate = dateOfBirth.split("T")[0]; // "2025-02-12"
      const [year, month, day] = isoDate.split("-");
      const formattedDateOfBirth = new Date(`${year}-${month}-${day}`);
      console.log('Formatted date:', formattedDateOfBirth);
      const questionsArray = Array.isArray(questions) ? questions : [questions];
      // Save the order to the database
      const savedOrder = await prisma.order.create({
        data: {
          name,
          email,
          phone,
          dateOfBirth:formattedDateOfBirth,
          timeOfBirth,
          placeOfBirth,
          latitude ,
          longitude,
          language,
          orderNumber,
          numberOfQuestions: 3,
          questions:questionsArray,
          timezone:parseFloat(timezone)
        },
      });

      console.log('Saved order:', savedOrder);

      // // Prepare data for Bigin
      // const biginData = {
      //   First_Name: name.split(' ')[0],
      //   Last_Name: name.split(' ').slice(1).join(' '),
      //   Email: email,
      //   Phone: phone,
      //   Date_of_Birth: dateOfBirth,
      //   Time_of_Birth: timeOfBirth,
      //   Place_of_Birth: placeOfBirth,
      //   Order_Number: orderNumber,
      //   Number_of_Questions: numberOfQuestions,
      //   Questions: questions.slice(0, parseInt(numberOfQuestions)).join('; '),
      // };

      // // Send data to Bigin
      // const biginResponse = await createBiginEntry(biginData, 'paid');

      // console.log('Bigin response:', biginResponse);

      res.status(200).json({ message: 'Order submitted successfully', order: savedOrder });
    } catch (error) {
      console.error('Detailed error:', error);
      res.status(500).json({ error: 'Error submitting order', details: error.message, stack: error.stack });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}