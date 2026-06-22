const Settings = require('../models/Settings');

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    const result = {};
    settings.forEach(s => result[s.key] = s.value);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await Settings.findOneAndUpdate({ key }, { key, value }, { upsert: true, new: true });
    }
    res.json({ message: 'Settings updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addPartnerLogo = async (req, res) => {
  try {
    const { name } = req.body;
    const section = req.query.section;

    if (!name) return res.status(400).json({ message: 'Partner name is required' });
    if (!['jobLogos', 'businessLogos', 'degreeLogos'].includes(section))
      return res.status(400).json({ message: 'Invalid section' });

    const logo = req.file ? `/uploads/${req.file.filename}` : '';

    const setting = await Settings.findOne({ key: 'partnerLogos' });
    const current = setting ? (setting.value || {}) : {};
    const sectionArr = Array.isArray(current[section]) ? current[section] : [];
    const updated = { ...current, [section]: [...sectionArr, { name, logo }] };

    await Settings.findOneAndUpdate(
      { key: 'partnerLogos' },
      { key: 'partnerLogos', value: updated },
      { upsert: true, new: true }
    );
    res.status(201).json({ message: 'Logo added', logos: updated[section], section });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.removePartnerLogo = async (req, res) => {
  try {
    const idx = parseInt(req.params.index);
    const section = req.query.section;

    if (!['jobLogos', 'businessLogos', 'degreeLogos'].includes(section))
      return res.status(400).json({ message: 'Invalid section' });

    const setting = await Settings.findOne({ key: 'partnerLogos' });
    const current = setting ? (setting.value || {}) : {};
    const sectionArr = Array.isArray(current[section]) ? current[section] : [];

    if (idx < 0 || idx >= sectionArr.length)
      return res.status(404).json({ message: 'Logo not found' });

    const updated = { ...current, [section]: sectionArr.filter((_, i) => i !== idx) };

    await Settings.findOneAndUpdate(
      { key: 'partnerLogos' },
      { key: 'partnerLogos', value: updated },
      { upsert: true }
    );
    res.json({ message: 'Logo removed', logos: updated[section], section });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};