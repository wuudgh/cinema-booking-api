const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const getMovies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
    /*where: {
      runtimeMins: {
        gt: parseInt(req.query.greaterthan),
      },
    },*/
  });
  //console.log("my query", req.query);

  res.json({ data: getMovies });
};

const newMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;
  //console.log("screenings", screenings);

  const newMovie = await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: runtimeMins,
      screenings: { createMany: { data: screenings } },
    },
  });
  res.json({ data: newMovie });
};

const getMovieById = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  let parsedid = 0;
  if (!isNaN(id)) {
    parsedid = parseInt(id);
  }

  const getMovieById = await prisma.movie.findMany({
    where: {
      OR: [
        {
          id: parsedid,
        },
        {
          title: { contains: req.params.id },
        },
      ],
    },
  });

  res.json({ data: getMovieById });
};

const updateMovie = async (req, res) => {
  const { id, title, runtimeMins, screenings } = req.body;

  console.log(screenings);
  const updateMovie = await prisma.movie.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      runtimeMins: runtimeMins,
    },
  });
  const updateScreening = await prisma.screening.update({
    where: {
      id: screenings[0].id,
    },
    data: {
      movieId: id,
      screenId: screenings[0].screenId,
      startsAt: screenings[0].startsAt,
    },
  });
  res.json({ data: updateMovie });
};

//const updateMovie = async (req, res) => {
// const

//}

module.exports = {
  getMovies,
  newMovie,
  getMovieById,
  updateMovie,
};

/*const getPosts = await prisma.post.findMany({
    where: {
      likes: {
        gt: 9,
      },
    },
})*/
