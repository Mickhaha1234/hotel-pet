"use client";
import { featuredItems } from "@/public/data/featured";
import FeaturedCardCafeList  from "@/components/FeaturedCardPropertyList";
import CardPagination from "@/components/CardPagination";
import { SetStateAction, useEffect, useState } from "react";

const page = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cafe");
        const data = await response.json();

        setFeaturedItems(data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []); 
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = featuredItems.filter((item: any) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="col-span-12">
        <input
          type="text"
          className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5"
          placeholder="Search..."
          id="first-name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {filteredItems.map((item, index) => (
        <FeaturedCardCafeList  item={item} key={index} />
      ))}
      <CardPagination />
    </>
  );
};

export default page;
