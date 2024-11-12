import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
};

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const file = files.file;  // Get the file from form data
      
      try {
        // Read file from the file system
        const filePath = file.filepath;
        const result = await cloudinary.v2.uploader.upload(filePath, {
          folder: 'cewe_replica',
          transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
        });

        // Respond with the secure URL from Cloudinary
        return res.status(200).json({ url: result.secure_url });
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ error: 'Failed to upload image' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
