"use client";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { adminRecentListings } from "@/public/data/adminrecentlisting";
import { SearchIcon } from "@/public/data/icons";
import HeadlessList from "@/components/ListBox";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const Page = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/restaurant");
        const data = await response.json();

        setFeaturedItems(data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(featuredItems)
   
  const onclickdelete = async (restaurantId  : string) => {
    try {
       // Perform a DELETE request to the API endpoint for deleting a hotel
       const response = await fetch(`/api/restaurant/${restaurantId }`, {
         method: 'DELETE',
       });
   
       // Check if the deletion was successful
       if (!response.ok) {
         throw new Error('Failed to delete restaurant');
       }
   
       // Optionally, fetch the updated list of hotels after deletion
       const updatedResponse = await fetch("/api/restaurant");
       const updatedData = await updatedResponse.json();
   
       // Update the state with the new list of hotels
       setFeaturedItems(updatedData.data);
       toast.success("Delete completed");
      } catch (error) {
        toast.error("Can't Delete restaurant");
      }
   };
   
  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">All restaurant</h2>
        <Link href="/add-property" className="btn-primary">
          <PlusCircleIcon className="w-5 h-5" /> All restaurant
        </Link>
      </div>

      {/* Recent bookings */}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6 relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[60px] after:top-0 after:left-0 ">
        <div className="p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]">
          <div className="flex flex-wrap gap-3 justify-between mb-7">
            <div className="flex flex-wrap items-center gap-3">
              <form className="border rounded-full pr-3">
                <select className="p-3 min-w-[160px] rounded-full focus:outline-none lg:pr-4">
                  <option value="1">Bulk Actions</option>
                  <option value="2">Delete</option>
                  <option value="3">Publish</option>
                </select>
              </form>
              <button className="btn-primary">Apply</button>
            </div>
            <form className="flex flex-wrap items-center gap-3">
              <div className="border rounded-full flex items-center p-1 pr-2 bg-[var(--bg-1)]">
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full w-[200px] sm:w-full bg-transparent focus:outline-none p-2 lg:pl-4"
                />
                <SearchIcon />
              </div>
              <div className="border rounded-full pr-3">
                <select className="p-3 min-w-[100px] rounded-full focus:outline-none">
                  <option value="1">Advanced</option>
                  <option value="2">Delete</option>
                  <option value="3">Publish</option>
                </select>
              </div>
            </form>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2 md:px-5">Hotel Name</th>
                  <th className="py-3 lg:py-4 px-2">Email</th>
                  <th className="py-3 lg:py-4 px-2">Price</th>
                  <th className="py-3 lg:py-4 px-2">Year bulid</th>
                  {/* <th className="py-3 lg:py-4 px-2">Status</th> */}
                  <th className="py-3 lg:py-4 px-2">Review</th>
                  <th className="py-3 lg:py-4 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {featuredItems.map(
                  ({ id, price,  yearBulid, email, title, review }) => (
                    <tr
                      key={id}
                      className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300">
                      <td className="py-3 lg:py-4 px-2 md:px-5">{title}</td>
                      <td className="py-3 lg:py-4 px-2">{email}</td>
                      <td className="py-3 lg:py-4 px-2">{price}</td>
                      <td className="py-3 lg:py-4 px-2">{ yearBulid}</td>
                      {/* <td className={`py-3 lg:py-4 px-2`}>
                        <div className={`w-32`}>
                          <HeadlessList initialValue={status} />
                        </div>
                      </td> */}
                      <td className="py-3 lg:py-4 px-2">
                        <span className="flex gap-1 items-center">
                          <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                          {review}
                        </span>
                      </td>
                      <td className="py-3 lg:py-7 px-2 flex gap-2 items-center">
                        
                        <Link
                        className="text-primary" href={`/resterong/edit-resterong/${id}`}>
                          <PencilSquareIcon className="w-5 h-5" />
                        </Link>
                        <button className="text-[var(--secondary-500)]" onClick={()=>onclickdelete(id)}>
                          <TrashIcon className="w-5 h-5" />
                        </button>
                        {/* <button>
                          <EllipsisVerticalIcon className="w-5 h-5" />
                        </button> */}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Page;
