// const LoanCategory = require('../models/LoanCategory');

// exports.getLoans = async (req, res) => {
//   try {
//     const loans = await LoanCategory.find({ isActive: true }).sort({ createdAt: 1 });
//     res.json(loans);
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// exports.getAllLoans = async (req, res) => {
//   try {
//     const loans = await LoanCategory.find().sort({ createdAt: 1 });
//     res.json(loans);
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// exports.createLoan = async (req, res) => {
//   try {
//     const loan = await LoanCategory.create({ name: req.body.name });
//     res.status(201).json(loan);
//   } catch (err) { res.status(400).json({ message: err.message }); }
// };

// exports.updateLoan = async (req, res) => {
//   try {
//     const loan = await LoanCategory.findByIdAndUpdate(
//       req.params.id,
//       { name: req.body.name, isActive: req.body.isActive },
//       { new: true }
//     );
//     res.json(loan);
//   } catch (err) { res.status(400).json({ message: err.message }); }
// };

// exports.deleteLoan = async (req, res) => {
//   try {
//     await LoanCategory.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted' });
//   } catch (err) { res.status(400).json({ message: err.message }); }
// };