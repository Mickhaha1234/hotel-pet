"use client";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface FeaturedItem {
  location: ReactNode;
  id: number;
  title: string | undefined;
  address: string;
  rooms: number;
  type: string;
  bed: number;
  bath: number | null;
  area: string;
  price: string;
  videoLink: string;
  favourite: boolean;
  popular: boolean;
  description: string;
  yearBuild: string;
  img: string[];
}

const page = ({ params }: { params: { id: string } }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [people, setpeople] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [subTotal, setsubTotal] = useState("");
  const [totalPrice, settotalPrice] = useState("");
  const [days, setdays] = useState("0");
  const [location,setlocation]= useState("");
   const [featuredItems, setFeaturedItems] = useState<FeaturedItem | undefined>({
    id: 1,
    title: "",
    address: "",
    rooms: 1,
    type: "",
    bed: 1,
    bath: 1,
    area: "",
    location: "",
    price: "",
    videoLink: "www.google.com",
    favourite: true,
    popular: true,
    yearBuild: "",
    description: "",
    
    img: [],
  });

  const handleStartDateChange = (event:any) => {
    const selectedDate = new Date(event.target.value);
    if (selectedDate >= new Date()) {
      setStartDate(event.target.value);
    }
  };

  const handleEndDateChange = (event:any) => {
    const selectedDate = new Date(event.target.value);
    if (selectedDate >= new Date()) {
      setEndDate(event.target.value);
    }
  };
  const handlePeopleChange = (event: any) => {
    setpeople(event.target.value);

    setsubTotal(
      (Number(featuredItems?.price) * Number(days)).toFixed(2).toString()
    );

    settotalPrice(
      (
        (Number(featuredItems?.price) * Number(days)) *
        1.15
      ).toFixed(2).toString()
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      hotelId: Number(params.id),
      price: Number(totalPrice).toFixed(2),
      address: address,
      email: email,
      name: name,
      Phone: phone,
      startDate: startDate,
      endDate: endDate,
      people: people,
      location:location,
    };

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log(payload);
      

      toast.success("Booking Completed");
    } catch (error) {
      toast.error("Can't Booking");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/hotel/${params.id}`);
        const data = await response.json();

        setFeaturedItems(data.data[0]);
        setsubTotal(featuredItems!.price.toString())
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setsubTotal(featuredItems!.price.toString())
    settotalPrice(Number(Number(featuredItems!.price) * 1.15).toFixed(2).toString())
  }, [featuredItems?.price])

  
  
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // JavaScript นับเดือนจาก 0
    const day = String(today.getDate()).padStart(2, '0');
    const todayDate = `${year}-${month}-${day}`;
    setStartDate(todayDate);
    setEndDate(todayDate);
  }, []);
  
   
  console.log('days ', days);
  

  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
      <div className="container">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="pb-lg-0">
              <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 mb-6">
                <h3 className="mb-0 h3"> Your Booking Info </h3>
                <div className="border border-dashed my-6"></div>
                <div className="grid grid-cols-12 gap-4 md:gap-3 mb-8">
                  <div className="col-span-12 md:col-span-4">
                    <div className="flex-row">
                      <label htmlFor="startDate">Start Date: </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="border"
                        min={startDate}
                      />
                    </div>
                    <label htmlFor="endDate">End Date: </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={endDate}
                      onChange={handleEndDateChange}
                      className="border"
                      min={endDate}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="flex-row">
                      <label htmlFor="startDate">People</label>
                      <input
                        type="text"
                        value={people}
                        onChange={handlePeopleChange}
                        className="border"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap border items-center rounded-2xl">
                {featuredItems?.img.map((img) => {
                  return (
                    
                      <Link
                        href="/img/property-gallery-slider-1.jpg"
                        className="link property-gallery"
                      >
                        <Image
                          width={574}
                          height={558}
                          src={img}
                          alt="image"
                          className=""
                        />
                      </Link>
                    
                  );
                })}

                  <div className="p-4">
                    <div className="property-card__body">
                      <Link
                        href="hotel-listing-details"
                        className="link block text-[var(--neutral-700)] hover:text-primary text-xl font-medium mb-5"
                      >
                        {featuredItems!.title}
                      </Link>
                      <div className="flex justify-between gap-3">
                        <div className="flex items-center gap-1">
                          <i className="las la-map-marker-alt text-xl text-[#22804A]"></i>
                          <span className="inline-block"> {featuredItems!.location} </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="las la-star text-xl text-[var(--tertiary)]"></i>
                          <span className="inline-block clr-neutral-500">
                            4.5(66)
                          </span>
                        </div>
                      </div>
                      <div className="border border-dashed my-6"></div>
                      <ul className="flex flex-wrap gap-6">
                        <li>
                          <span className="material-symbols-outlined mat-icon clr-neutral-600 inline-block mb-1">
                            home_work
                          </span>
                          <span className="block text-sm">{featuredItems!.rooms} room </span>
                        </li>
                        <li>
                          <span className="material-symbols-outlined mat-icon clr-neutral-600 inline-block mb-1">
                            bed
                          </span>
                          <span className="block text-sm"> {featuredItems!.bed} Bed </span>
                        </li>
                        <li>
                          <span className="material-symbols-outlined mat-icon clr-neutral-600 inline-block mb-1">
                            bathtub
                          </span>
                          <span className="block text-sm"> {featuredItems!.bath} Bath </span>
                        </li>
                        <li>
                          <span className="material-symbols-outlined mat-icon clr-neutral-600 inline-block mb-1">
                            drag_pan
                          </span>
                          <span className="block text-sm"> {featuredItems!.area} sft </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 mb-6">
                <h4 className="mb-3 text-2xl font-semibold">
                  {" "}
                  Billing address{" "}
                </h4>
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <p className="mb-0">
                    Transaction ID:
                    <span className="text-primary"></span>
                  </p>
                  <p className="mb-0">
                    Total Payable Amount:
                    <span className="text-primary">
                      {" "}
                      {featuredItems!.price}฿{" "}
                    </span>
                  </p>
                </div>
                <div className="border border-dashed my-6"></div>
                <div className="grid grid-cols-12 gap-4 lg:gap-6">
                  <div className="col-span-12 md:col-span-6">
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <input
                      type="email"
                      className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                      placeholder="Enter Phone Number"
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6"></div>
                  <div className="col-span-12">
                    <textarea
                      rows={5}
                      className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-3xl focus:outline-none py-3 px-6"
                      placeholder="Enter Address"
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6">
                <h4 className="mb-6 text-2xl font-semibold">
                  {" "}
                  Payment methods{" "}
                </h4>
                <ul className="flex flex-wrap items-center gap-6">
                  <li>
                    <div className="flex items-center gap-2">
                      <input
                        className="accent-[var(--primary)] scale-125"
                        type="radio"
                        name="property-type"
                        id="credit-card"
                      />
                      <label
                        className="inline-block text-lg font-medium cursor-pointer"
                        htmlFor="credit-card"
                      >
                        Credit card
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <input
                        className="accent-[var(--primary)] scale-125"
                        type="radio"
                        name="property-type"
                        id="debit-card"
                      />
                      <label
                        className="inline-block text-lg font-medium cursor-pointer"
                        htmlFor="debit-card"
                      >
                        Debit card
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <input
                        className="accent-[var(--primary)] scale-125"
                        type="radio"
                        name="property-type"
                        id="paypal"
                      />
                      <label
                        className="inline-block text-lg font-medium cursor-pointer"
                        htmlFor="paypal"
                      >
                        PayPal
                      </label>
                    </div>
                  </li>
                </ul>
                <div className="border border-dashed my-6"></div>
                <div className="grid grid-cols-12 gap-4 lg:gap-6">
                  <div className="col-span-12">
                    <label
                      htmlFor="card-number"
                      className="text-xl font-medium block mb-3"
                    >
                      Card number
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                      placeholder="2456 1665 5155 5151"
                      id="card-number"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="expiry-date"
                      className="text-xl font-medium block mb-3"
                    >
                      Expiry date
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                      placeholder="DD/MM/YY"
                      id="expiry-date"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="cvc"
                      className="text-xl font-medium block mb-3"
                    >
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                      placeholder="3 digits"
                      id="cvc"
                    />
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="card-name"
                      className="text-xl font-medium block mb-3"
                    >
                      Name on card
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                      placeholder="Jab Archur"
                      id="card-name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            
            <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 border">
              <h4 className="mb-0 text-2xl font-semibold">Order Summary</h4>
              <div className="border border-dashed my-8"></div>
              <ul className="gap-4">
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Subtotal</p>
                  <p className="mb-0 font-medium">{subTotal}</p>
                </li>
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Service charge</p>
                  <p className="mb-0 font-medium">10%</p>
                </li>
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Tax</p>
                  <p className="mb-0 font-medium">5%</p>
                </li>
              </ul>
              <div className="border border-dashed my-8"></div>
              <div className="flex items-center justify-between flex-wrap mb-6">
                <p className="mb-0">Payable Now</p>
                <p className="mb-0 font-medium">{totalPrice}</p>
              </div>
              <button
                onClick={handleSubmit}
                className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-medium w-full justify-center"
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default page;
