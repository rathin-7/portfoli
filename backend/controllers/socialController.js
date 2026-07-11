import Social from '../models/Social.js';

export const getSocials = async (req, res) => {
  try {
    const socials = await Social.find().sort('order');
    res.json(socials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSocials = async (req, res) => {
  try {
    await Social.deleteMany({});
    const socials = await Social.insertMany(req.body);
    res.json(socials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
