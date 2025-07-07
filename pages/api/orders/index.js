// pages/api/orders/index.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://astrosightadmin:Astro%407268@astrosightdb.jfsndsk.mongodb.net/astrodb?retryWrites=true&w=majority&appName=AstroSight';
const dbName = 'astrodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const orderData = req.body;
    let client;
    try {
      client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db(dbName);
      const orders = db.collection('orders');
      const newOrder = {
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        dateOfBirth: new Date(orderData.dateOfBirth),
        timeOfBirth: orderData.timeOfBirth,
        placeOfBirth: orderData.placeOfBirth,
        numberOfQuestions: parseInt(orderData.numberOfQuestions),
        questions: orderData.questions,
        captcha: orderData.captcha,
        orderNumber: orderData.orderNumber,
        status: 'Received',
        createdAt: new Date(),
      };
      const result = await orders.insertOne(newOrder);
      console.log('New order created:', result.ops ? result.ops[0] : newOrder);
      res.status(201).json({ ...newOrder, _id: result.insertedId });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Error creating order' });
    } finally {
      if (client) await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
