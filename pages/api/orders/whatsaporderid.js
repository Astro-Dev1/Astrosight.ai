// req.method === 'POST'
import prisma from '../../../utils/prisma';

export default async function handler(req, res) {
  

      try {
        // Extract orderId from the query parameters
        const { orderId } = req.query;
        console.log(req.query); 
        // Validate orderId
        if (!orderId) {
          return res.status(400).json({ message: 'Order ID is required' });
        }

        console.log(` ${orderId}`);

        // Fetch the order from the database
        const order = await prisma.order.findUnique({
          where: { orderNumber: ` ${orderId}` },
        });
        console.log(order)
        // Handle case where no order is found
        if (!order) {
          return res.status(404).json({ message: `No order found with ID: ${orderId}` });
        }

        console.log('Order fetched:', order);

        // Respond with the fetched order
        res.status(200).json(order);
      } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Error fetching order', error: error.message });
      }
      
    

}
