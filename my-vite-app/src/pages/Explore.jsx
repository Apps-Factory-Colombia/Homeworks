import React from "react";

const posts = [
  {
    id: 1,
    username: "juandavid764",
    image:
      "https://fotos.perfil.com/2023/09/05/inteligencia-artificial-cuales-son-las-regulaciones-que-se-impulsan-en-el-mundo-1646974.jpg",
    description: "Explorando la tecnología del futuro 🚀",
  },
  {
    id: 2,
    username: "camila_dev",
    image:
      "https://st2.depositphotos.com/1017187/8833/i/450/depositphotos_88331198-stock-photo-beautiful-young-girl-using-laptop.jpg",
    description: "Disfrutando de la naturaleza 🌿",
  },
  {
    id: 3,
    username: "AlfonsoGamerX",
    image:
      "https://www.jesuithighschool.org/sites/main/files/imagecache/lightbox/main-images/smash.jpg",
    description: "Nueva partida, ¿quién se une? 🎮",
  },
];

const Explore = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Explora</h1>
      <p className="text-lg text-gray-600 mb-8">
        Descubre nuevas publicaciones y conéctate con otros usuarios.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={post.image}
              alt="Post"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                @{post.username}
              </h2>
              <p className="text-gray-600">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
