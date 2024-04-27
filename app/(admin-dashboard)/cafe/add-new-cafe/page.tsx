"use client";
import React, { useState } from "react";
import {
  ChevronDownIcon,
  CloudArrowUpIcon,
  EyeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import CustomRangeSlider from "@/components/RangeSlider";
import Accordion from "@/components/Accordion";
import SelectUI from "@/components/SelectUI";
import { propertyAmenities } from "@/public/data/addpropertyAmenities";
import CheckboxCustom from "@/components/Checkbox";
import input from "postcss/lib/input";
import toast, { Toaster } from "react-hot-toast";

// const handleChange = (event: { target: { name: any; value: any } }) => {
//   const name = event.target.name;
//   const value = event.target.value;
//   setInputs((values: any) => ({ ...values, [name]: value }));
// };

const Page = () => {
  const optionCategory = [
    { name: "Hotel", id: 1 },
    { name: "Cab", id: 2 },
    { name: "Motel", id: 3 },
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      price: Number(price),
      description: description,
      image: image,
      email: email,
      website: website,
      parking: Number(parking),
      title: title,
      Phone: Phone,
    };

    console.log(payload);

    try {
      const response = await fetch("/api/cafe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success("Save completed");
    } catch (error) {
      toast.error("Can't save Cafe");
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

  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Add New Cafe</h2>
        <Link href="/add-property" className="btn-primary">
          <EyeIcon className="w-5 h-5" /> View All Cafe
        </Link>
      </div>
      {/* statisticts */}
      <section className="grid z-[1] grid-cols-12 gap-4 mb-6 lg:gap-6 px-3 md:px-6 bg-[var(--bg-2)] relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[60px] after:top-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        <div className="col-span-12 lg:col-span-6">
          <Accordion
            buttonContent={(open) => (
              <div
                className={`${
                  open ? "rounded-t-2xl" : "rounded-2xl"
                } flex justify-between items-center p-4 md:p-6 lg:p-8 duration-500 bg-white`}
              >
                <h3 className="h3">Resterong Information </h3>
                <ChevronDownIcon
                  className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>
            )}
            initialOpen={true}
          >
            <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 bg-white rounded-b-2xl">
              <div className="border-t pt-4">
                {/* <p className="mb-4 text-xl font-medium">
                  Choose Listing Category :
                </p> */}
                {/* <SelectUI
                  options={optionCategory}
                  selected={selected}
                  setSelected={setSelected}
                /> */}
                <p className="mt-6 mb-4 text-xl font-medium">ชื่อ:</p>
                <input
                  type="text"
                  className="w-full border p-2 focus:outline-none rounded-md text-base"
                  placeholder="Write Title"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                />
                <p className="mt-6 mb-4 text-xl font-medium">Sale Price:</p>
                {/* <CustomRangeSlider /> */}
                <input
                  type="number"
                  className="w-full border p-2 focus:outline-none rounded-md text-base"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
                <p className="mt-6 mb-4 text-xl font-medium">Description :</p>
                <textarea
                  rows={5}
                  className="w-full border p-2 focus:outline-none rounded-md "
                  placeholder="Description.."
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                ></textarea>
                <p className="mt-6 mb-4 text-xl font-medium">Parking :</p>
                <input
                  type="text"
                  className="w-full border py-2 px-3 lg:px-4 focus:outline-none rounded-md text-base"
                  placeholder="3"
                  value={parking}
                  onChange={(e) => setparking(e.target.value)}
                />
              </div>
            </div>
          </Accordion>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="rounded-2xl bg-white border p-4 md:p-6 lg:p-8">
            <Accordion
              buttonContent={(open) => (
                <div className="rounded-2xl flex items-center justify-between">
                  <h3 className="h3">Images & Video with Map </h3>
                  <ChevronDownIcon
                    className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
              initialOpen={true}
            >
              <div className="pt-6">
                <p className="mt-6 mb-4 text-xl font-medium">Image Address :</p>
                <input
                  type="text"
                  className="w-full border p-2 focus:outline-none rounded-md text-base"
                  placeholder="Image link"
                  value={image}
                  onChange={(e) => setimage(e.target.value)}
                />
                <p className="mt-6 mb-4 text-xl font-medium">Video Link :</p>
                <input
                  type="text"
                  className="w-full border p-2 focus:outline-none rounded-md text-base"
                  placeholder="Any type video link"
                  value={videoLink}
                  onChange={(e) => setvideoLink(e.target.value)}
                />
                <div className="mt-6">
                  <div className="h-[400px]">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2233.5934788396344!2d89.78232001463437!3d23.836268639364576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1688381345276!5m2!1sen!2sbd"
                    ></iframe>
                  </div>
                </div>
                <p className="mt-6 mb-4 text-xl font-medium">Address :</p>
                <input
                  type="text"
                  className="w-full border p-2 focus:outline-none rounded-md text-base"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </div>
            </Accordion>
          </div>

          <div className="rounded-2xl bg-white border p-4 md:p-6 lg:p-8 mt-4 lg:mt-6">
            <Accordion
              buttonContent={(open) => (
                <div className="rounded-2xl flex justify-between">
                  <h3 className="h3">Contact Information </h3>
                  <ChevronDownIcon
                    className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
              initialOpen={true}
            >
              <div className="pt-6">
                <p className="mt-6 mb-4 text-xl font-medium">Phone :</p>
                <input
                  type="text"
                  className="w-full border p-2 focus:outline-none rounded-md text-base"
                  placeholder="Enter Number"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <p className="mt-6 mb-4 text-xl font-medium">Email :</p>
                <input
                  type="text"
                  className="w-full border p-2 focus:outline-none rounded-md text-base"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <p className="mt-6 mb-4 text-xl font-medium">Website :</p>
                <input
                  type="text"
                  className="w-full border p-2 focus:outline-none rounded-md text-base"
                  placeholder="Enter website"
                  value={website}
                  onChange={(e) => setwebsite(e.target.value)}
                />
                {/* <Link
                  href="#"
                  className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-semibold mt-6"
                >
                  <span className="inline-block"> Add New </span>
                </Link> */}
              </div>
            </Accordion>
          </div>

          {/* <div className="py-10">
            <ul className="flex flex-col gap-4">
              <li>
                <CheckboxCustom label=" I agree to the privacy & policy" />
              </li>
              <li>
                <CheckboxCustom label="I agree with all terms & conditions" />
              </li>
            </ul>
          </div> */}

          <button
            className="btn-primary font-semibold my-10"
            onClick={handleSubmit}
          >
            <span className="inline-block"> Save new Cafe</span>
          </button>
        </div>
      </section>
      {/* Footer */}
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Page;
