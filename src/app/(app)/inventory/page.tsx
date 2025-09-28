"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Plus } from "lucide-react";

type Item = {
  id: number;
  category: "frame" | "lens" | "glasses";
  name: string;
  brand?: string;
  model?: string;
  color?: string;
  size?: string;
  type?: string;
  power?: string;
  coating?: string[];
  frameType?: string;
  quantity: number;
  price: number;
  // Lens-specific
  material?: string;
  design?: string;
  index?: string;
  quality?: string;
  rSph?: string;
  rCyl?: string;
  rAxis?: string;
  rPd?: string;
  rVa?: string;
  rPrism?: string;
  lSph?: string;
  lCyl?: string;
  lAxis?: string;
  lPd?: string;
  lVa?: string;
  lPrism?: string;
  dv?: string;
  nv?: string;
  add?: string;
  ipd?: string;
  lensType?: string[];
};

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<Item>>({
    category: "frame",
    coating: [],
    lensType: [],
  });
  const [activeCategory, setActiveCategory] = useState<
    Item["category"] | "all"
  >("all");
  const [search, setSearch] = useState("");

  const addItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.price) return;
    setItems([
      ...items,
      {
        id: Date.now(),
        category: newItem.category!,
        name: newItem.name,
        brand: newItem.brand,
        model: newItem.model,
        color: newItem.color,
        size: newItem.size,
        type: newItem.type,
        power: newItem.power,
        coating: newItem.coating || [],
        frameType: newItem.frameType,
        quantity: Number(newItem.quantity),
        price: Number(newItem.price),
        material: newItem.material,
        design: newItem.design,
        index: newItem.index,
        quality: newItem.quality,
        rSph: newItem.rSph,
        rCyl: newItem.rCyl,
        rAxis: newItem.rAxis,
        rPd: newItem.rPd,
        rVa: newItem.rVa,
        rPrism: newItem.rPrism,
        lSph: newItem.lSph,
        lCyl: newItem.lCyl,
        lAxis: newItem.lAxis,
        lPd: newItem.lPd,
        lVa: newItem.lVa,
        lPrism: newItem.lPrism,
        dv: newItem.dv,
        nv: newItem.nv,
        add: newItem.add,
        ipd: newItem.ipd,
        lensType: newItem.lensType || [],
      },
    ]);
    setIsOpen(false);
    setNewItem({ category: "frame", coating: [], lensType: [] });
  };

  const toggleArrayField = (
    field: "coating" | "lensType",
    value: string
  ) => {
    setNewItem((prev) => {
      const arr = prev[field] || [];
      return arr.includes(value)
        ? { ...prev, [field]: arr.filter((v) => v !== value) }
        : { ...prev, [field]: [...arr, value] };
    });
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.brand?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (item.model?.toLowerCase() || "").includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          <Plus size={18} /> Add Item
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border p-2 rounded"
        />
        <div className="flex gap-4 border-b">
          {["all", "frame", "lens", "glasses"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab as Item["category"] | "all")}
              className={`capitalize pb-2 border-b-2 transition ${
                activeCategory === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Model</th>
              <th className="p-3">Specs</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  No items found
                </td>
              </tr>
            )}
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.brand || "-"}</td>
                <td className="p-3">{item.model || "-"}</td>
                <td className="p-3">
                  {item.category === "frame" &&
                    `${item.color || ""} ${item.size || ""}`}
                  {item.category === "lens" &&
                    `${item.material || ""} ${item.design || ""} ${
                      item.index || ""
                    }`}
                  {item.category === "glasses" &&
                    `${item.power || ""} ${item.frameType || ""}`}
                </td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">₹{item.price}</td>
                <td className="p-3 capitalize">{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Item Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Add New Item
            </Dialog.Title>
            <form className="space-y-4">
              {/* Common Fields */}
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    category: e.target.value as Item["category"],
                  })
                }
                className="w-full border p-2 rounded"
              >
                <option value="frame">Frame</option>
                <option value="lens">Lens</option>
                <option value="glasses">Glasses</option>
              </select>
              <input
                type="text"
                placeholder="Name"
                value={newItem.name || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Brand"
                value={newItem.brand || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, brand: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Model"
                value={newItem.model || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, model: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              {/* Frame Fields */}
              {newItem.category === "frame" && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Color"
                    value={newItem.color || ""}
                    onChange={(e) =>
                      setNewItem({ ...newItem, color: e.target.value })
                    }
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Size"
                    value={newItem.size || ""}
                    onChange={(e) =>
                      setNewItem({ ...newItem, size: e.target.value })
                    }
                    className="border p-2 rounded"
                  />
                </div>
              )}

              {/* Lens Fields */}
              {newItem.category === "lens" && (
                <>
                  {/* Basic Lens Info */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Color"
                      value={newItem.color || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, color: e.target.value })
                      }
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Material"
                      value={newItem.material || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, material: e.target.value })
                      }
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Design"
                      value={newItem.design || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, design: e.target.value })
                      }
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Index"
                      value={newItem.index || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, index: e.target.value })
                      }
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Quality"
                      value={newItem.quality || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, quality: e.target.value })
                      }
                      className="border p-2 rounded"
                    />
                  </div>

                  {/* Prescription */}
                  <div className="border rounded p-4 space-y-4">
                    <h3 className="font-semibold">Prescription</h3>

                    {/* Right Eye */}
                    <div>
                      <label className="font-medium">Right Eye (OD)</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {["R-SPH","R-CYL","R-AXIS","R-PD","R-VA","R-Prism"].map((field) => (
                          <input
                            key={field}
                            type="text"
                            placeholder={field}
                            onChange={(e) =>
                              setNewItem({ ...newItem, [field.toLowerCase().replace("-","")]: e.target.value })
                            }
                            className="border p-2 rounded"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Left Eye */}
                    <div>
                      <label className="font-medium">Left Eye (OS)</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {["L-SPH","L-CYL","L-AXIS","L-PD","L-VA","L-Prism"].map((field) => (
                          <input
                            key={field}
                            type="text"
                            placeholder={field}
                            onChange={(e) =>
                              setNewItem({ ...newItem, [field.toLowerCase().replace("-","")]: e.target.value })
                            }
                            className="border p-2 rounded"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Additional Prescription */}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Distance Vision (DV)"
                        onChange={(e) =>
                          setNewItem({ ...newItem, dv: e.target.value })
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Near Vision (NV)"
                        onChange={(e) =>
                          setNewItem({ ...newItem, nv: e.target.value })
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Addition (ADD)"
                        onChange={(e) =>
                          setNewItem({ ...newItem, add: e.target.value })
                        }
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        placeholder="IPD (Total PD)"
                        onChange={(e) =>
                          setNewItem({ ...newItem, ipd: e.target.value })
                        }
                        className="border p-2 rounded"
                      />
                    </div>
                  </div>

                  {/* Lens Type */}
                  <div>
                    <h3 className="font-semibold mb-2">Lens Type</h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "Constant Use",
                        "Reading Wear",
                        "Distance Wear",
                        "Single Vision",
                        "Progressive",
                        "Bifocal",
                        "Trifocal",
                      ].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={newItem.lensType?.includes(type)}
                            onChange={() => toggleArrayField("lensType", type)}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Lens Coating */}
                  <div>
                    <h3 className="font-semibold mb-2">Lens Coating</h3>
                    <div className="flex flex-wrap gap-3">
                      {["Blue Cut", "Anti-glare", "Anti-reflective"].map(
                        (coat) => (
                          <label key={coat} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={newItem.coating?.includes(coat)}
                              onChange={() => toggleArrayField("coating", coat)}
                            />
                            {coat}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Glasses Fields */}
              {newItem.category === "glasses" && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Power"
                    value={newItem.power || ""}
                    onChange={(e) =>
                      setNewItem({ ...newItem, power: e.target.value })
                    }
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Frame Type"
                    value={newItem.frameType || ""}
                    onChange={(e) =>
                      setNewItem({ ...newItem, frameType: e.target.value })
                    }
                    className="border p-2 rounded"
                  />
                </div>
              )}

              {/* Common Fields */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newItem.quantity || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: Number(e.target.value) })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newItem.price || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: Number(e.target.value) })
                  }
                  className="border p-2 rounded"
                />
              </div>

              <button
                type="button"
                onClick={addItem}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add Item
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
