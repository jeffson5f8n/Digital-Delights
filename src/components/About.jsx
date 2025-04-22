import React from "react";
import { motion } from "framer-motion";

const aboutItems = [
  {
    title: "Who We Are",
    description:
      "We are a passionate team of tech enthusiasts dedicated to bringing you the best gaming and digital gear in the market.",
    image: "/images/room1(1).jpeg", // Corrected path
  },
  {
    title: "Our Mission",
    description:
      "To revolutionize online shopping with premium products, unbeatable service, and lightning-fast delivery you can trust.",
    image: "/images/room2(2).jpeg", // Corrected path
  },
  {
    title: "Why Choose Us",
    description:
      "From curated selections to personalized customer support, Digital Delights is your one-stop-shop for everything digital.",
    image: "/images/Laser Arena, Paintball.jfif", // Corrected path
  },
];

const AboutUs = () => {
  return (
    <div className="bg-black min-h-screen py-16 px-4 text-white">
      <div className="content2">
      <h2 className="text-center text-blue-400 text-4xl font-bold mb-12">About Digital Delights</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {aboutItems.map((item, index) => (
          <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="bg-[#0f0f0f] rounded-2xl shadow-lg border border-blue-500 p-5 text-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-xl mb-4 border border-blue-800"
              />
            <h3 className="text-blue-300 text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default AboutUs;
