import React, { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line
import { Upload, FileText, Image as ImageIcon, X } from "lucide-react";

const AddHomework = () => {
  // 🧠 States: Form ke input values handle karne ke liye
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🧩 Image select karne par preview generate karna
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ❌ Agar user galat image select kare, to use remove karne ka function
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  // 🚀 Homework submit karne ka main function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Validation: Title aur Description empty na ho
    if (!title || !description) {
      alert("Please fill all fields before posting homework!");
      return;
    }

    // 🧱 FormData object banate hain (kyunki image file bhi bhejni hai)
    const formData = new FormData();
    formData.append("title", title); // 📘 Homework Title
    formData.append("description", description); // 📝 Homework Description
    if (image) formData.append("image", image); // 🖼️ Optional Image

    try {
      // 🌐 Backend API ko call karna (Express + MongoDB)
      const res = await fetch("http://localhost:5000/api/homework", {
        method: "POST",
        body: formData, // ✅ form-data format me bhejna (kyunki file hai)
      });

      const data = await res.json();
      alert(data.message || "Homework posted successfully!");

      // 🔄 Fields reset kar dena
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Error while posting homework.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-gray-100"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <FileText className="text-blue-600 w-7 h-7" />
          <h1 className="text-2xl font-bold text-blue-700">Add Homework</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 🏷️ Homework Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Homework Title
            </label>
            <input
              type="text"
              placeholder="e.g. Science - Chapter 6: Motion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* 📝 Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Write homework details here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* 🖼️ Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Image (optional)
            </label>

            {!preview ? (
              // 📤 Image upload box (agar image select nahi hui)
              <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-blue-50 transition">
                <Upload className="w-6 h-6 text-blue-500 mb-2" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer text-sm text-gray-500"
                />
              </div>
            ) : (
              // ✅ Image preview with remove option
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 flex flex-col items-center"
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="w-44 h-44 object-cover rounded-xl border border-gray-200 shadow-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-3 flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-semibold transition"
                >
                  <X className="w-4 h-4" /> Remove Image
                </button>
              </motion.div>
            )}
          </div>

          {/* 🚀 Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition"
          >
            <div className="flex items-center justify-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Post Homework
            </div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddHomework;
