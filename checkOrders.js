   // checkOrders.js
   const { PrismaClient } = require('@prisma/client');
   const prisma = new PrismaClient();

   async function main() {
     try {
       await prisma.$connect();
       console.log('Connected to the database');
       
       // Check if the Order model exists
       const orderModel = prisma.order;
       if (!orderModel) {
         console.log('The Order model is not defined in your Prisma schema.');
         return;
       }

       const orders = await prisma.order.findMany();
       if (orders.length === 0) {
         console.log('No orders found in the database.');
       } else {
         console.log('Orders:', orders);
       }
     } catch (error) {
       console.error('Error fetching orders:', error);
       console.error('Error details:', error.message);
     } finally {
       await prisma.$disconnect();
     }
   }

   main().catch((e) => {
     console.error(e);
     process.exit(1);
   });