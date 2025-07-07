import prisma from '../../utils/prisma'; // Ensure this is correctly configured in your project
import { sendEvent } from '../../utils/facebook-events';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        console.log('Fetching all form submissions');
        const orders = await prisma.$queryRaw`SELECT * FROM form_submissions`;
        res.status(200).json(orders);
                
                console.log('Form submissions fetched:', orders);
        res.status(200).json(orders);
      } catch (error) {
        console.error('Error fetching form submissions:', error);
        res.status(500).json({ message: 'Error fetching form submissions', error: error.message });
      }
      break;

    case 'POST':
      try {
        const {
          name,
          email,
          phone,
          dateOfBirth,
          timeOfBirth,
          placeOfBirth,
          latitude,
          longitude,
          questions,
          timezone,
          agenttyp
        } = req.body;

        if (!name || !email || !phone || !dateOfBirth || !timeOfBirth || !placeOfBirth||!questions||!timezone||!agenttyp) {
          return res.status(400).json({ message: 'All required fields must be provided' });
        }

        console.log('Inserting new form submission');

        const newSubmission = await prisma.form_submissions.create({
          data: {
            name,
            email,
            phone,
            dateOfBirth: new Date(dateOfBirth), // Ensure proper date format
            timeOfBirth,
            placeOfBirth,
            latitude: parseFloat(latitude), // Ensure latitude is a number
            longitude: parseFloat(longitude), // Ensure longitude is a number
            timezone,
            questions,
            agenttyp
          },
        });
        await sendEvent('Lead', {
          lead_type: 'free_report',
          currency: 'INR',
          value: 0.00,
          source_url: req.headers.referer
        }, {
          email,
          phone,
          ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
          userAgent: req.headers['user-agent']
        });
        console.log('New form submission created:', newSubmission);
        res.status(201).json(newSubmission);
      } catch (error) {
        console.error('Error creating form submission:', error);
        res.status(500).json({ message: 'Error creating form submission', error: error.message });
      }
      break;

    case 'PUT':
      try {
        const { id, name, email, phone, placeOfBirth } = req.body;

        if (!id) {
          return res.status(400).json({ message: 'Submission ID is required for updates' });
        }

        console.log(`Updating form submission with ID: ${id}`);

        const updatedSubmission = await prisma.form_submissions.update({
          where: { id: parseInt(id) }, // Ensure ID is an integer
          data: {
            name,
            email,
            phone,
            placeOfBirth,
          },
        });

        console.log('Updated form submission:', updatedSubmission);
        res.status(200).json(updatedSubmission);
      } catch (error) {
        console.error('Error updating form submission:', error);
        res.status(500).json({ message: 'Error updating form submission', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ message: 'Submission ID is required for deletion' });
        }

        console.log(`Deleting form submission with ID: ${id}`);

        await prisma.form_submissions.delete({
          where: { id: parseInt(id) }, // Ensure ID is an integer
        });

        console.log('Form submission deleted successfully');
        res.status(200).json({ message: 'Form submission deleted successfully' });
      } catch (error) {
        console.error('Error deleting form submission:', error);
        res.status(500).json({ message: 'Error deleting form submission', error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
