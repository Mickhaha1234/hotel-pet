"use client";
import RecentlyViewed from "@/components/RecentlyViewed";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowsPointingOutIcon,
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  CheckIcon,
  ClockIcon,
  HandThumbUpIcon,
  HeartIcon,
  MapIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PlayIcon } from "@/public/data/icons";
import ReactPlayer from "react-player";
import { Tab } from "@headlessui/react";
import CheckboxCustom from "@/components/Checkbox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface FeaturedItem {
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
  location: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [playing, setPlaying] = useState(false);
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem | undefined>({
    id: 1,
    title: "",
    address: "",
    rooms: 1,
    type: "",
    bed: 1,
    bath: 1,
    area: "",
    price: "",
    videoLink: "www.google.com",
    favourite: true,
    popular: true,
    yearBuild: "",
    description: "",
    location: "",
    img: [],
  });

  const Play = () => {
    return (
      <span
        onClick={() => setPlaying(true)}
        className="bg-[var(--tertiary)] w-14 grid place-items-center h-14 rounded-full z-50 cursor-pointer relative"
      >
        <PlayIcon />
      </span>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/cafe/${params.id}`);
        const data = await response.json();

        setFeaturedItems(data.data[0]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("params.id ", params.id);

  console.log(featuredItems);

  return (
    <>
      <div className="bg-[var(--bg-2)]">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-span-12">
              <Swiper
                loop={true}
                slidesPerView="auto"
                spaceBetween={16}
                centeredSlides={true}
                centeredSlidesBounds={true}
                navigation={{
                  nextEl: ".btn-next",
                  prevEl: ".btn-prev",
                }}
                breakpoints={{
                  576: {
                    slidesPerView: 2.25,
                  },
                  768: {
                    slidesPerView: 2.5,
                  },
                  1200: {
                    slidesPerView: 3.25,
                  },
                }}
                modules={[Navigation]}
                className="relative"
              >
                {featuredItems?.img.map((img) => {
                  return (
                    <SwiperSlide>
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
                    </SwiperSlide>
                  );
                })}

                <button className="btn-prev absolute top-[45%] left-4 z-[1] bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:text-white duration-300">
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button className="btn-next absolute top-[45%] right-4 z-[1] bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:text-white duration-300">
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </Swiper>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6 mt-10 lg:mt-14 px-3">
            <div className="col-span-12 md:col-span-8">
              <div className="mb-6 md:mb-10 lg:mb-14">
                <div className="bg-white rounded-2xl p-3 sm:p-4 lg:py-8 lg:px-5">
                  <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border mb-10">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <h5 className="text-primary font-semibold text-xl inline-block mb-0">
                        For Rent
                      </h5>
                      <ul className="flex gap-3 items-center">
                        <li>
                          <span className="inline-block clr-neutral-600">
                            Share
                          </span>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="link w-8 h-8 grid place-content-center bg-[var(--primary-light)] text-primary rounded-full hover:bg-primary hover:text-white text-xl duration-300"
                          >
                            <i className="lab la-facebook-f"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="link w-8 h-8 grid place-content-center bg-[var(--primary-light)] text-primary rounded-full hover:bg-primary hover:text-white text-xl duration-300"
                          >
                            <i className="lab la-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="link w-8 h-8 grid place-content-center bg-[var(--primary-light)] text-primary rounded-full hover:bg-primary hover:text-white text-xl duration-300"
                          >
                            <i className="lab la-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="link w-8 h-8 grid place-content-center bg-[var(--primary-light)] text-primary rounded-full hover:bg-primary hover:text-white text-xl duration-300"
                          >
                            <i className="lab la-linkedin-in"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <h2 className="mt-4 h2 mb-8 leading-snug">
                    {featuredItems && <h2 className="mt-4 h2 mb-8 leading-snug">
                      {featuredItems.title}
                      </h2>}
                    </h2>
                    <ul className="flex flex-wrap items-center gap-4 gap-md-0">
                      <li>
                      <div className="flex items-center gap-2">
                        <MapIcon className="w-5 h-5 text-[var(--secondary)]" />
                        <p className="mb-0">{featuredItems && <h2 className="mt-4 h2 mb-8 leading-snug text-2xl">
                      {featuredItems.location}
                      </h2>}</p>
                      </div>
                    </li>
                      <li>
                        <p className="mb-0">
                        ID:{" "}
                          <span className="text-primary">
                          {featuredItems && <h2 className="mt-4 h2 mb-8 leading-snug text-2xl">
                           {featuredItems.id}
                         </h2>}
                          </span>
                        </p>
                      </li>
                      <li>
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                          <p className="mb-0"> 4.5(66) </p>
                        </div>
                      </li>
                      <li>
                        <p className="mb-0">
                          <span className="clr-neutral-500">Published:</span>{" "}
                          Feb 9, 23
                        </p>
                      </li>
                    </ul>
                    <div className="border-b border-dashed my-8"></div>
                    
                  </div>
                  <div className="p-3 sm:p-4 md:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 md:mb-10">
                    <h4 className="mb-5 text-2xl font-semibold">
                      {" "}
                      Description{" "}
                    </h4>
                    <p className="mb-5 clr-neutral-500">
                    {featuredItems && <h2 className="mt-4 h2 mb-8 leading-snug">
                      {featuredItems.description}
                      </h2>}
                    </p>
                    <Link
                      href="#"
                      className="link flex items-center gap-2 text-primary"
                    >
                      <span className="font-semibold inline-block">
                        Read More
                      </span>
                      <i className="las la-long-arrow-alt-right text-xl"></i>
                    </Link>
                  </div>
                 
                  <div className="p-3 sm:p-4 md:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 md:mb-10">
                    <h4 className="mb-5 text-2xl font-semibold">
                      {" "}
                      Property Video{" "}
                    </h4>
                    {/* <div className="bg-white p-1 rounded-2xl overflow-hidden relative h-[462px] z-[1]">
                      <ReactPlayer
                        url={featuredItems!.videoLink}
                        controls
                        light="/img/property-video-img.jpg"
                        playIcon={<Play />}
                        className={`react-player z-30 relative `}
                        playing
                        width="100%"
                        height="100%"
                      />
                    </div> */}
                  </div>
                  {/* <div className="p-3 sm:p-4 md:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 md:mb-10">
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                      <h4 className="mb-0 text-2xl font-semibold">
                        {" "}
                        Location{" "}
                      </h4>
                      <Link
                        href={featuredItems!.address}
                        className="btn-outline  font-semibold flex gap-2 items-center"
                      >
                        View All
                        <ArrowLongRightIcon className="w-5 h-5" />
                      </Link>
                    </div>
                    <div className="w-full">
                      <iframe
                        className="w-full h-[400px] rounded-2xl"
                        // src="https://maps.google.com/maps?q=california&t=&z=10&ie=UTF8&iwloc=&output=embed"></iframe>
                        src={featuredItems!.address}
                      ></iframe>
                    </div>
                  </div> */}

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <Link
                      href="#"
                      className="flex gap-2 items-center clr-neutral-500 hover:text-primary order-1"
                    >
                      <ArrowLongLeftIcon className="w-5 h-5" />
                      <span className="inline-block font-semibold">
                        Prev Property
                      </span>
                    </Link>
                    <ul className="flex flex-wrap gap-3 justify-center order-3 flex-grow md:order-2">
                      <li>
                        <Link
                          href="#"
                          className="duration-300 grid place-content-center w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                        >
                          <i className="text-xl lab la-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="duration-300 grid place-content-center w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                        >
                          <i className="text-xl lab la-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="duration-300 grid place-content-center w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                        >
                          <i className="text-xl lab la-linkedin-in"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="duration-300 grid place-content-center w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                        >
                          <i className="text-xl lab la-dribbble"></i>
                        </Link>
                      </li>
                    </ul>
                    <Link
                      href="#"
                      className="gap-2 flex items-center clr-neutral-500 hover:text-primary order-2"
                    >
                      <span className="inline-block font-semibold">
                        Next Property
                      </span>
                      <ArrowLongRightIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>

              

              <div>
                <div className="bg-white rounded-2xl py-8 px-5">
                  <h4 className="mb-0 text-2xl font-semibold">
                    Write a review
                  </h4>
                  <div className="border border-dashed my-6"></div>
                  <p className="text-xl font-medium mb-3">Rating *</p>
                  <div className="flex gap-1 mb-3">
                    <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                    <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                    <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                    <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                    <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                  </div>
                  <form action="#">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <label
                          htmlFor="review-name"
                          className="text-xl font-medium block mb-3"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-full py-3 px-5 focus:outline-none"
                          placeholder="Enter Name.."
                          id="review-name"
                        />
                      </div>
                      <div className="col-span-12">
                        <label
                          htmlFor="review-email"
                          className="text-xl font-medium block mb-3"
                        >
                          Email *
                        </label>
                        <input
                          type="text"
                          className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-full py-3 px-5 focus:outline-none"
                          placeholder="Enter Email.."
                          id="review-email"
                        />
                      </div>
                      <div className="col-span-12">
                        <label
                          htmlFor="review-review"
                          className="text-xl font-medium block mb-3"
                        >
                          Review *
                        </label>
                        <textarea
                          id="review-review"
                          rows={5}
                          className="bg-[var(--bg-1)] border rounded-2xl py-3 px-5 w-full focus:outline-none"
                        ></textarea>
                      </div>
                      <div className="col-span-12">
                        <Link href="#" className="btn-primary">
                          Submit Review
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4">
              <div className="mb-10 lg:mb-14">
                <div className="bg-white rounded-2xl py-8 px-6">
                  <p className="mb-3 text-lg font-medium"> Price </p>
                  <div className="flex items-start gap-2 mb-6">
                    <div className="flex gap-3 items-center">
                      <i className="las la-tag text-2xl"></i>
                      <p className="mb-0"> From </p>
                      <h3 className="h3 mb-0"> {featuredItems && <h2 className="mt-4 h2 mb-8 leading-snug">
                      {featuredItems.price}
                      </h2>}฿ </h3>
                    </div>
                    <i className="las la-info-circle text-2xl"></i>
                  </div>
                  <Tab.Group>
                  {/* <Tab.List className="flex gap-4">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "focus:outline-none",
                          selected ? "text-primary" : ""
                        )
                      }
                    >
                      Booking Form
                    </Tab>{" "}
                    |
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "focus:outline-none",
                          selected ? "text-primary" : ""
                        )
                      }
                    >
                      Enquiry Form
                    </Tab>
                  </Tab.List> */}
                  <Tab.Panels className="mt-5">
                    <Tab.Panel
                      className="tab-pane fade show active"
                      id="booking-list"
                    >
                      {/* <div className="flex bg-[var(--bg-1)] gap-3 py-4 px-8 rounded-full border border-neutral-40 mb-4">
                        <i className="las la-calendar text-3xl text-gray-500"></i>
                        <div className="flex-grow">
                          <p className="mb-1">Feb 17 - Feb 25</p>
                          <p className="mb-0 text-xs clr-neutral-400">
                            Check in - Check out
                          </p>
                        </div>
                      </div>
                      <div className="flex bg-[var(--bg-1)] gap-3 py-4 px-8 rounded-full border border-neutral-40">
                        <i className="las la-user-friends text-3xl text-gray-500"></i>
                        <div className="flex-grow">
                          <p className="mb-1">6 Guests</p>
                          <p className="mb-0 text-xs clr-neutral-400">
                            {" "}
                            Guests{" "}
                          </p>
                        </div>
                      </div> */}
                      {/* <div className="flex items-center justify-between my-4">
                        <p className="mb-0 clr-neutral-500">
                          {" "}
                          ฿25,976x 4 night{" "}
                        </p>
                        <p className="mb-0 font-medium"> ฿103,904 </p>
                      </div> */}
                      {/* <div className="flex items-center justify-between">
                        <p className="mb-0 clr-neutral-500"> Service charge </p>
                        <p className="mb-0 font-medium"> ฿20,780 </p>
                      </div> */}
                      <div className="border border-dashed my-4"></div>
                      <div className="flex items-center justify-between">
                        <p className="mb-0 clr-neutral-500"> Total </p>
                        <p className="mb-0 font-medium">  {featuredItems && <h2 className="mt-4 h2 mb-8 leading-snug">
                      {featuredItems.price}
                      </h2>}฿ </p>
                      </div>
                    </Tab.Panel>
                    {/* <Tab.Panel className="tab-pane fade" id="enquiry-list">
                      <form className="flex flex-col gap-5">
                        <input
                          type="text"
                          placeholder="Name..."
                          className="w-full rounded-full bg-[var(--bg-1)] border focus:outline-none py-2 px-3 md:py-3 md:px-4"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email..."
                          className="w-full rounded-full bg-[var(--bg-1)] border focus:outline-none py-2 px-3 md:py-3 md:px-4"
                          required
                        />
                        <textarea
                          rows={6}
                          placeholder="Message..."
                          className="w-full rounded-3xl bg-[var(--bg-1)] border focus:outline-none py-2 px-3 md:py-3 md:px-4"
                        ></textarea>
                        <CheckboxCustom label="I agree with Terms of Service and Privacy Statement" />
                      </form>
                    </Tab.Panel> */}
                  </Tab.Panels>
                </Tab.Group>

                <Link
                  href={`/payment-method/${params.id}`}
                  className="btn-primary flex items-center justify-center my-6"
                >
                  Proceed Booking
                </Link>
                <ul className="flex justify-center gap-6">
                  <li>
                    {/* <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-full bg-[var(--primary-light)] text-primary grid place-content-center">
                        <HeartIcon className="w-5 h-5" />
                      </button>
                      <span className="inline-block text-sm clr-neutral-500">
                        Save To Wish List
                      </span>
                    </div> */}
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-full bg-[var(--primary-light)] text-primary grid place-content-center">
                        <ArrowsRightLeftIcon className="w-5 h-5" />
                      </button>
                      {/* <span className="inline-block text-sm clr-neutral-500">
                        Compare
                      </span> */}
                    </div>
                  </li>
                </ul>
                </div>
              </div>

              {/* <div className="bg-white rounded-2xl py-8 px-6">
              <div className="w-32 h-32 border border-[var(--primary)] rounded-full bg-white p-4 grid place-content-center relative mx-auto mb-10">
                <Image
                  width={96}
                  height={96}
                  src="/img/team-1.jpg"
                  alt="image"
                  className="rounded-full"
                />
                <div className="w-8 h-8 grid place-content-center rounded-full border-2 white text-white bg-primary absolute bottom-0 right-0">
                  <CheckIcon className="w-5 h-5" />
                </div>
              </div>
              <h4 className="text-center text-2xl font-semibold mb-4">
                {" "}
                Savannah Nguyen{" "}
              </h4>
              <ul className="flex items-center gap-3 justify-center flex-wrap mb-7">
                <li>
                  <p className="mb-0">
                    ID: <span className="text-primary">235</span>
                  </p>
                </li>
                <li className="text-primary text-lg">•</li>
                <li>
                  <p className="mb-0"> Property: 24 </p>
                </li>
                <li className="text-primary text-lg">•</li>
                <li>
                  <div className="flex gap-1 items-center">
                    <i className="las la-star text-[var(--tertiary)]"></i>
                    <p className="mb-0"> 4.8 </p>
                  </div>
                </li>
              </ul>
              <ul className="flex justify-center flex-wrap gap-3">
                <li>
                  <Link
                    href="#"
                    className="link grid place-content-center duration-300 w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                  >
                    <i className="lab la-facebook-f text-xl"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="link grid place-content-center duration-300 w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                  >
                    <i className="lab la-twitter text-xl"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="link grid place-content-center duration-300 w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                  >
                    <i className="lab la-instagram text-xl"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="link grid place-content-center duration-300 w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                  >
                    <i className="lab la-linkedin-in text-xl"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="link grid place-content-center duration-300 w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                  >
                    <i className="lab la-dribbble text-xl"></i>
                  </Link>
                </li>
              </ul>
              <div className="border border-dashed my-7"></div>
              <ul className="flex flex-col gap-4 mb-10 max-text-30 mx-auto">
                <li>
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-5 h-5 text-primary" />
                    <p className="mb-0"> Joined in June 2018 </p>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-[var(--secondary)]" />
                    <p className="mb-0"> Response rate - 100% </p>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-[var(--tertiary)]" />
                    <p className="mb-0"> Fast response </p>
                  </div>
                </li>
              </ul>
              <div className="text-center">
                <Link href="#" className="btn-outline  font-semibold">
                  See Host Profile
                </Link>
              </div>
            </div> */}
            </div>
          </div>
        </div>

        {/* Recently viewed  */}
        <RecentlyViewed />
      </div>
    </>
  );
};

export default Page;
