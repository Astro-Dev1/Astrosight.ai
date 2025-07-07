import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  const couponCodes = {
    "SAVE50": 50,
    "WELCOME20": 20,
    "DISCOUNT100": 100,
    "fulldiscount":500
  };
  if (req.method === 'POST') {
    try {
      const { amount, currency, receipt, notes ,couponCode} = req.body;
      const amount1=amount * 100-couponCodes[couponCode]*100 
      console.log(amount1,couponCode)
      if (amount1 <= 0) {
        // Handle 100% discount (skip Razorpay)
        const freeOrder = {
          id: `free_order_${Date.now()}`,
          entity: 'order',
          amount: 0,
          amount_paid: 0,
          amount_due: 0,
          currency,
          receipt,
          status: 'paid',
          notes,
          created_at: Date.now(),
        };

        // Save this "free order" to your database or respond directly
        console.log('Free order created:', freeOrder);
        res.status(200).json(freeOrder);
        return;
      }
      const options = {
        amount: 
        isNaN(amount1) ? amount*100 : amount1    ,    
        currency,
        receipt,
        notes,
      };

      console.log('Creating Razorpay order with options:', options); // Add logging

      const order = await razorpay.orders.create(options);
      console.log('Razorpay order created:', order); // Add logging
      res.status(200).json(order);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ error: 'Error creating Razorpay order' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}