// import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import prisma from '../../../utils/prisma';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const freeReports = await prisma.form_submissions.findMany();
        res.status(200).json(freeReports);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch free reports' });
      }
      break;
    case 'POST':
      try {
        // const { orderNumber, name, email, phone, dateOfBirth, timeOfBirth, placeOfBirth, numberOfQuestions, questions } = req.body;

        const newFreeReport = await prisma.form_submissions.create({ data: req.body });
        res.status(201).json(newFreeReport);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create free report' });
      }
      break;
    case 'PUT':
      try {
        console.log('Received PUT request:', req.body); // Log the request body
        const { id, status, name, timeOfBirth ,phone} = req.body;
console.log(req.body)
        console.log('Parsed ID:', id);
        console.log('Parsed Status:', status);

        // Validate status
        const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED'];
        if (!validStatuses.includes(status)) {
          return res.status(400).json({ message: 'Invalid status' });
        }

        // Ensure id is a number
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
          return res.status(400).json({ message: 'Invalid ID format' });
        }

        const updatedFreeReport = await prisma.form_submissions.update({
          where: { id: numericId },
          data: { status, name, timeOfBirth ,phone },
        });

        console.log('Updated Free Report:', updatedFreeReport);

        res.status(200).json(updatedFreeReport);
      } catch (error) {
        console.error('Error updating free report:', error);
        res.status(500).json({ error: 'Failed to update free report' });
      }
      break;
    case 'DELETE':
      try {
        const id  = req.body;
        console.log(req.body);
        
        await prisma.form_submissions.delete({ where: { id:id } });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete free report submission' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}