const prisma = require("../utils/prisma");

const newScreen = async (req, res) => {
  const { number, screenings } = req.body;

  const newScreen = await prisma.screen.create({
    data: {
      number: number,
      screenings: { createMany: { data: screenings } },
    },
  });
  res.json({ data: newScreen });
};

module.exports = {
  newScreen,
};
