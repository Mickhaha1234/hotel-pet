"use client";
import { featuredItems } from "@/public/data/featured";
import FeaturedCardPropertyList from "@/components/FeaturedCardPropertyList";
import CardPagination from "@/components/CardPagination";
import { useEffect, useState } from "react";

const page = () => {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hotel");
        const data = await response.json();

        setFeaturedItems(data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      {featuredItems.map((item, index) => (
        <FeaturedCardPropertyList item={item} key={index} />
      ))}
      <CardPagination />
    </>
  );
};

export default page;
