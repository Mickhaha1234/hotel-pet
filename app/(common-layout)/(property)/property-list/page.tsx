"use client";
import { featuredItems } from "@/public/data/featured";
import PropertyListCard from "@/components/PropertyListCard";
import CardPagination from "@/components/CardPagination";
import { useEffect, useState } from "react";

const Page = () => {
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
        <PropertyListCard item={item} key={index} />
      ))}

      <CardPagination />
    </>
  );
};

export default Page;
