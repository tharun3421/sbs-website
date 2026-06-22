const QRCode = require('qrcode');

exports.generateQR = async (req, res) => {
  try {
    const { url, size = 300 } = req.body;
    if (!url) return res.status(400).json({ message: 'URL is required' });
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: parseInt(size),
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
      errorCorrectionLevel: 'H'
    });
    res.json({ qr: qrDataUrl, url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
