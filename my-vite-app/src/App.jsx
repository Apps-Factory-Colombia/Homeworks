import { useState } from "react";

const CategoryInput = ({ setCategories }) => {
  const [category, setCategory] = useState("");

  const handleInputChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddCategory = () => {
    if (category.trim() !== "") {
      setCategories((prevCategories) => [...prevCategories, category]);
      setCategory("");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="text"
        value={category}
        onChange={handleInputChange}
        placeholder="Enter category"
        className="px-4 py-2 border rounded-lg mb-2"
      />
      <button
        onClick={handleAddCategory}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Category
      </button>
    </div>
  );
};

const CategoryList = ({ categories }) => {
  return (
    <ul className="list-disc mt-4">
      {categories.map((category, index) => (
        <li key={index} className="text-lg">{category}</li>
      ))}
    </ul>
  );
};

const ComponentApp = () => {
  const [categories, setCategories] = useState([]);

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-md w-64 mx-auto mt-10">
      <h1 className="text-2xl font-bold">Categories</h1>
      <CategoryInput setCategories={setCategories} />
      <CategoryList categories={categories} />
    </div>
  );
};

export default ComponentApp;
