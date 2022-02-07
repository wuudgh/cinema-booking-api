const prisma = require("../utils/prisma");

const newMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;

  const newMovie = await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: runtimeMins,
      screenings: { createMany: { data: screenings } },
    },
  });
  res.json({ data: newMovie });
};

module.exports = {
  newMovie,
};
