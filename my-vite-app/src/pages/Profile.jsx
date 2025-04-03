import React, { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-8">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-8 flex flex-col items-center w-full max-w-lg border border-gray-700">
        <label className="relative cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <img
            src={avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg"
          />
        </label>
        <input
          type="text"
          placeholder="Tu Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 bg-transparent text-white text-2xl font-bold text-center outline-none border-b-2 border-gray-500"
        />
        <input
          type="text"
          placeholder="@usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 bg-transparent text-cyan-400 text-center outline-none border-b border-gray-500"
        />
        <textarea
          placeholder="Escribe una bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-3 bg-transparent text-gray-400 text-center outline-none border-b border-gray-500 w-full"
        />
        <button className="mt-5 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-transform transform hover:scale-105">
          Guardar Perfil
        </button>
      </div>

      <h3 className="text-2xl font-semibold text-white mt-10 mb-6">Tus Publicaciones</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 border border-gray-700 p-4 text-white"
            >
              <p>{post}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay publicaciones aún.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
