"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
    rating: "",
  });

  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, image: data.secure_url }));
        setMessage("✅ Image uploaded!");
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        rating: parseFloat(form.rating),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Product uploaded!");
      setForm({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
        rating: "",
      });
    } else {
      setMessage(`❌ Error: ${data.error}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md"
          rows={4}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md"
          required
        >
          <option value="">Select Category</option>
          <option value="new-arrival">New Arrival</option>
          <option value="top-selling">Top Selling</option>
          <option value="related">Related</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (0–5)"
          value={form.rating}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md"
          min={0}
          max={5}
          step={0.1}
          required
        />
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageUpload}
            className="w-full mt-2 border p-3 rounded-md"
            required
          />
          {isUploading && (
            <p className="text-sm text-blue-500">Uploading image...</p>
          )}
          {form.image && (
            <img
              src={form.image}
              alt="Uploaded"
              className="mt-4 w-32 h-32 object-cover rounded"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          {isUploading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
}
