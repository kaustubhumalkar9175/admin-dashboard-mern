const User = require("../models/User");
const Record = require("../models/Record");

exports.getDashboardStats = async (req, res) => {
  try {
    // TOTAL COUNTS
    const totalUsers = await User.countDocuments();
    const totalRecords = await Record.countDocuments();

    // TOTAL AMOUNT
    const amountResult = await Record.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalAmount = amountResult[0]?.totalAmount || 0;

    // RECORDS BY CATEGORY
    const recordsByCategory = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // RECORDS BY STATUS
    const recordsByStatus = await Record.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // RECORDS BY MONTH (LINE CHART)
    const recordsByMonth = await Record.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({
      totalUsers,
      totalRecords,
      totalAmount,
      recordsByCategory,
      recordsByStatus,
      recordsByMonth,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
