const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;
  const createTicket = await prisma.ticket.create({
    data: {
      screeningId: screeningId,
      customerId: customerId,
    },
  });
  res.json({ data: createTicket });
};

module.exports = { createTicket };
