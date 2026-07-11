export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ url: req.file.path, filename: req.file.originalname });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
