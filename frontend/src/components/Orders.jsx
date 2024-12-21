import React from "react";
import Zdravko from "../assets/Zdravko.jpeg";
import RibljaCorba from "../assets/RibljaCorba.jpg";

// Testni podaci
const orders = [
  {
    id: 1,
    image: Zdravko, 
    name: "Zdravko Colic",
    date: "Jun 3, 2020",
    total: "30 KM",
  },
  {
    id: 2,
    image: RibljaCorba, 
    name: "Riblja Corba",
    date: "Maj 18, 2020",
    total: "20.00 KM",
  },
  {
    id: 3,
    image: Zdravko, 
    name: "Zdravko Colic",
    date: "Decembar 10, 2020",
    total: "40 KM",
  }
 
];

export const Orders = () => {
  return (
    <div className="max-w-2xl mx-auto">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-gray-200 border rounded-lg p-4 mb-4 flex items-center gap-4 shadow-sm"
        >
          <img
            src={order.image}
            alt={order.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <h3 className="text-lg font-semibold">{order.name}</h3>
            <p className="text-sm text-gray-600">{order.date}</p>
            <p className="mt-2 text-gray-800 font-bold">{order.total}</p>
            <p className="text-sm text-gray-500">{order.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
