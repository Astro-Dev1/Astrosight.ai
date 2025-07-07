// pages/api/orders/paid-order.js

// import { Console } from 'console';
import prisma from '../../../utils/prisma';
//import { getSession } from 'next-auth/react';
// import Link from 'next/link';
export default async function handler(req, res) {
  // console.log('Paid order API route called');
  // console.log("544",req)

 // const session = await getSession({ req });

  // console.log('Session:', session);
  
  // if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  switch (req.method) {
    case 'GET':
      try {
        console.log('Fetching orders from database');
        const orders = await prisma.order.findMany();
        console.log('Orders fetched:', orders);

        res.status(200).json(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
      }
      break;

    case 'POST':
      try {
        const { orderNumber, name, email, phone, dateOfBirth, timeOfBirth, placeOfBirth, numberOfQuestions, questions,language } = req.body;

        const newOrder = await prisma.order.create({
          data: {
            orderNumber,
            name,
            email,
            phone,
            dateOfBirth: new Date(dateOfBirth),
            timeOfBirth,
            placeOfBirth,
            numberOfQuestions,
            questions,
            language,
            // Include other fields as necessary
            status: 'PENDING',
            statusHistory: {
              create: {
                status: 'PENDING',
                changedById: session.user.id, // Assuming session contains user ID
              },
            },
          },
          include: {
            statusHistory: true,
          },
        });

        res.status(201).json(newOrder);
      } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
      }
      break;

    case 'PUT':
      try {
        // Console.log(req.body)
        const { id, status, name, timeOfBirth,questions ,phone} = req.body;
        console.log(req.body)

        // Validate status
        const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED'];
        if (!validStatuses.includes(status)) {
          return res.status(400).json({ message: 'Invalid status' });
        }

        const updatedOrder = await prisma.order.update({
          where: { id },
          data: {
            status, 
            name,
            phone,
            questions,
            timeOfBirth,
            statusHistory: {

              create: {
                status,
                changedById: 2, // Assuming session contains user ID
              },
            },
          },
          include: {
            statusHistory: true,
          },
        });
       console.log(updatedOrder)
        res.status(200).json(updatedOrder);
      } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
      }
      break;
      case 'DELETE':
        try {
          const { orderNumber } = req.body; // Destructure the orderNumber from the request body

          if (!orderNumber) {
            return res.status(400).json({ message: 'Order number is required' });
          }
      
          console.log(orderNumber); // Log the order number to verify
      
          // Delete the order
          const delet = await prisma.order.delete({
            where: { orderNumber: orderNumber },
          });
          console.log(delet); // Log the ID to verify it's correct

          // Fetch the updated order list
          const updatedOrders = await prisma.order.findMany(); // Get the updated list of orders
      
          // Send the updated order list to the frontend
          res.status(200).json(updatedOrders);
        } catch (error) {
          res.status(500).json({ message: 'Error deleting order', error });
        }
        break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
