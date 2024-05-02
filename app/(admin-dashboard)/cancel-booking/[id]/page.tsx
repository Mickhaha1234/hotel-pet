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
import { SearchIcon } from "@/public/data/icons";
import { allEvents } from "@/public/data/allEvents";
import { cancelList } from "@/public/data/cancelList";
import HeadlessList from "@/components/ListBox";

import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  CloudArrowUpIcon,
  EyeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import CustomRangeSlider from "@/components/RangeSlider";
import Accordion from "@/components/Accordion";
import SelectUI from "@/components/SelectUI";
import { propertyAmenities } from "@/public/data/addpropertyAmenities";
import CheckboxCustom from "@/components/Checkbox";
import input from "postcss/lib/input";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

// const handleChange = (event: { target: { name: any; value: any } }) => {
//   const name = event.target.name;
//   const value = event.target.value;
//   setInputs((values: any) => ({ ...values, [name]: value }));
// };

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const optionCategory = [
    { name: "Hotel", id: 1 },
    // { name: "Cab", id: 2 },
    { name: "Motel", id: 2 },
  ];
  const optionTag = [{ name: "One" }, { name: "Two" }, { name: "Three" }];
  const optionBeds = [{ name: "1" }, { name: "2" }, { name: "3" }];
  const optionBathRooms = [{ name: "1" }, { name: "2" }, { name: "3" }];
  const optionGarages = [{ name: "1" }, { name: "2" }, { name: "3" }];
  const optionPerson = [
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "7" },
    { name: "8" },
  ];

  // form data
  const [selected, setSelected] = useState(optionCategory[0]);
  const [selectedtag, setSelectedtag] = useState(optionTag[0]);
  const [selectedbeds, setSelectedbeds] = useState(optionBeds[0]);
  const [selectedbathRooms, setSelectedbathRooms] = useState(
    optionBathRooms[0]
  );
  const [selectedgarages, setSelectedgarages] = useState(optionGarages[0]);
  const [selectedperson, setSelectedperson] = useState(optionPerson[0]);

  const [title, settitle] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [tagLine, settagLine] = useState("");
  const [area, setarea] = useState("");
  const [propertyId, setpropertyId] = useState("");
  const [type, settype] = useState("");
  const [bedRooms, setbedRooms] = useState("");
  const [parking, setparking] = useState("");
  const [dimensions, setdimensions] = useState("");
  const [yearBuild, setyearBuild] = useState("");
  const [videoLink, setvideoLink] = useState("");
  const [address, setaddress] = useState("");
  const [amenities, setamenities] = useState([]);
  const [zipCode, setzipCode] = useState("");
  const [Phone, setPhone] = useState("");
  const [fax, setfax] = useState("");
  const [email, setemail] = useState("");
  const [website, setwebsite] = useState("");
  const [image, setimage] = useState("");
  const [ features, setfeatures] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const amenitiesString =
      amenities.length > 0 ? `[${amenities.join(", ")}]` : "";

    const payload = {
      title: title,
      price: Number(price),
      description: description,
      tagLine: tagLine,
      tag: selectedtag.name,
      beds: Number(selectedbeds.name),
      bathRooms: Number(selectedbathRooms.name),
      garages: Number(selectedgarages.name),
      person: Number(selectedperson.name),
      area: Number(area),
      propertyId: Number(propertyId),
      type: type,
      bedRooms: Number(bedRooms),
      parking: Number(parking),
      dimensions: dimensions,
      yearBuild: Number(yearBuild),
      image: image,
      videoLink: videoLink,
      address: address,
      features: amenitiesString,
      zipCode: zipCode,
      Phone: Phone,
      fax: fax,
      email: email,
      website: website,
      categoryId: selected.id,
      // features: features,
      // features: "[Gym, WiFi, Internet]",
       
      

     
      // selectedTag: selectedtag.name,
      // selectedBeds: Number(selectedbeds.name),
      // selectedBathRooms: Number(selectedbathRooms.name),
      // selectedGarages: Number(selectedgarages.name),
      // selectedPerson: Number(selectedperson.name),
     
      
      
      
     
     
     
    };
    // const payload1 = {
      
    //     "title": "Beautiful Villa",
    //     "price": 1,
    //     "description": "A stunning villa with 3 bedrooms, 2 bathrooms, and a beautiful garden.",
    //     "tagLine": "Luxury Living",
    //     "tag": "Luxury",
    //     "beds": 3,
    //     "bathRooms": 2,
    //     "garages": 1,
    //     "person": 6,
    //     "area": 2000,
    //     "propertyId": 12345,
    //     "type": "Villa",
    //     "bedRooms": 3,
    //     "parking": 2,
    //     "dimensions": "2000x1500",
    //     "yearBuild": 2010,
    //     "image": "https://example.com/images/villa.jpg",
    //     "videoLink": "https://example.com/videos/villa.mp4",
    //     "address": "123 Villa Street, Beautiful City",
    //     "zipCode": "12345",
    //     "Phone": "+1234567890",
    //     "fax": "+1234567891",
    //     "email": "info@beautifulvilla.com",
    //     "website": "https://www.beautifulvilla.com",
    //     "categoryId": 1,
    //     "features": "[Gym, WiFi, Internet]"
       
       
    // };
     
    console.log(payload);
    // console.log(payload1);


    try {
      const response = await fetch(`/api/payment/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

    
      toast.success("Update completed");
      router.push('/hotel/cancel-booking')
    } catch (error) {
      toast.error("Can't Update Hotel");
    }

  };

  const handleAmenitiesChange = (e: any, item: any) => {
    const checked = e.target.checked;
    setamenities((prevAmenities: any) => {
      if (checked) {
        // If the checkbox is checked, add the item to the array
        return [...prevAmenities, item];
      } else {
        // If the checkbox is unchecked, remove the item from the array
        return prevAmenities.filter((amenity: any) => amenity !== item);
      }
    });
  };

  useEffect(() => {
    const fetchHotelById = async () => {
      try {
        const response = await fetch(`/api/payment/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch hotel");
        }
        let data = await response.json();
        data=data.data[0]
        console.log(data);
        // Assuming the response structure matches your payload structure
        // Update your state with the fetched data
        setSelected({ name: data.type, id: data.categoryId });
        setSelectedtag({ name: data.tag });
        setSelectedbeds({ name: data.beds });
        setSelectedbathRooms({ name: data.bath });
        setSelectedgarages({ name: data.garages });
        setSelectedperson({ name: data.person });
        settitle(data.title);
        setprice(data.price);
        setdescription(data.description);
        settagLine(data.tagLine);
        setarea(data.area);
        setpropertyId(data.propertyId);
        settype(data.type);
        setbedRooms(data.bedRooms);
        setparking(data.parking);
        setdimensions(data.dimensions);
        setyearBuild(data.yearBuild);
        setvideoLink(data.videoLink);
        setaddress(data.address);
        setamenities(data.features  );
        setzipCode(data.zipCode);
        setPhone(data.Phone);
        setfax(data.fax);
        setemail(data.email);
        setwebsite(data.website);
        setimage(data.img[0]);
      } catch (error) {
        console.error("Failed to fetch hotel:", error);
        toast.error("Failed to fetch hotel");
      }
    };

    if (params.id) {
      fetchHotelById();
    }
  }, [params.id]);

const Page = () => {
  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Cancel Booking</h2>
        <Link href="#" className="btn-primary">
          <PlusCircleIcon className="w-5 h-5" /> View all booking
        </Link>
      </div>

      {/* Recent bookings */}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6 relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[60px] after:top-0 after:left-0 ">
        <div className="p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]">
          <div className="flex flex-wrap gap-3 justify-between mb-7">
            <div className="flex flex-wrap items-center gap-3">
              <form className="border rounded-full pr-3 xl:pr-4 bg-[var(--bg-1)]">
                <select className="p-3 bg-transparent xl:pl-4 min-w-[160px] rounded-full focus:outline-none">
                  <option value="1">Bulk Actions</option>
                  <option value="2">Delete</option>
                  <option value="3">Publish</option>
                </select>
              </form>
              <button className="btn-primary">Apply</button>
            </div>
            <form className="flex flex-wrap items-center gap-3">
              <div className="border rounded-full flex items-center p-1 pr-2 xl:pr-4 bg-[var(--bg-1)]">
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full bg-transparent focus:outline-none p-2 xl:px-4"
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
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2">Name</th>
                  <th className="py-3 lg:py-4 px-2">Booking Number</th>
                  <th className="py-3 lg:py-4 px-2">Location</th>
                  <th className="py-3 lg:py-4 px-2">Method</th>
                  <th className="py-3 lg:py-4 px-2">Date</th>
                  <th className="py-3 lg:py-4 px-2">Status</th>
                  <th className="py-3 lg:py-4 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cancelList.map(
                  ({
                    id,
                    bookingNo,
                    date,
                    method,
                    location,
                    name,
                    rating,
                    status,
                  }) => (
                    <tr
                      key={id}
                      className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300">
                      <td
                        className="py-3 lg:py-4 px-2  lg:px-4">
                        {name}
                      </td>
                      <td className="py-3 lg:py-4 px-2">{bookingNo}</td>
                      <td className="py-3 lg:py-4 px-2">{location}</td>
                      <td className="py-3 lg:py-4 px-2">{method}</td>
                      <td className="py-3 lg:py-4 px-2">{date}</td>
                      <td className={`py-3 lg:py-4 px-2`}>
                        <div className={`w-32`}>
                          <HeadlessList initialValue={status} />
                        </div>
                      </td>
                      <td className="py-3 lg:py-4 px-2 flex gap-2 items-center">
                        <button className="text-primary">
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button className="text-[var(--secondary-500)]">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                        <button>
                          <EllipsisVerticalIcon className="w-5 h-5" />
                        </button>
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
    </div>
  );
};
}
export default Page;
