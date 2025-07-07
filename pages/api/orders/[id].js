// pages/api/orders/[id].js
import prisma from '../../../utils/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  // Check if the 'id' is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }

  if (req.method === 'PUT') {
    const { status } = req.body;

    // Ensure that 'status' is provided and is a valid status (you can extend this logic based on your application)
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    try {
      // Check if the order exists
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
      });

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      // Update the order
      const updatedOrder = await prisma.order.update({
        where: { id: parseInt(id) },
        data: { status },
      });

      return res.status(200).json(updatedOrder);

    } catch (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
