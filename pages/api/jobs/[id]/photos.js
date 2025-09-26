// pages/api/jobs/[id]/photos.js
import getSoapyAPI from '../../../lib/getsoapy';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const photos = await getSoapyAPI.getJobPhotos(id);
      res.status(200).json(photos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching photos' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}