"use client";

import Image from "next/image";
import Link from "next/link";
import LoginImg from "@/public/img/login-img.png";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const page = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      role: "member",
    };

    try {
      const response = await fetch("/api/register", {
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
      toast.success("Register Completed");
    } catch (error) {
      toast.error("Can't Register");
    }
  };

  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-1)] signup-section">
      <div className="container">
        <div className="flex flex-wrap items-center gap-4 md:gap-0 mx-3">
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8">
              <form action="#">
                <h3 className="mb-4 h3"> Let’s Get Started! </h3>
                <p className="mb-10">
                  Please enter your email address to join us
                </p>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="first-name"
                      className="text-base sm:text-lg md:text-xl font-normal sm:font-medium block mb-3"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5"
                      placeholder="Enter First Name"
                      id="first-name"
                      value={firstname}
                      onChange={(e) => setfirstname(e.target.value)}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="last-name"
                      className="text-base sm:text-lg md:text-xl font-normal sm:font-medium block mb-3"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5"
                      placeholder="Enter Last Name"
                      id="last-name"
                      value={lastname}
                      onChange={(e) => setlastname(e.target.value)}
                    />
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="enter-email"
                      className="text-base sm:text-lg md:text-xl font-normal sm:font-medium block mb-3"
                    >
                      Enter Your Email ID
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5"
                      placeholder="Enter Your Email"
                      id="enter-email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="enter-password"
                      className="text-base sm:text-lg md:text-xl font-normal sm:font-medium block mb-3"
                    >
                      Enter Your Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5"
                      placeholder="Enter Your Password"
                      id="enter-password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                  <div className="col-span-12">
                    <p className="mb-0">
                      Do you have an account?
                      <Link
                        href="sign-in"
                        className="link font-semibold text-primary"
                      >
                        Signin
                      </Link>
                    </p>
                  </div>
                  <div className="col-span-12">
                    <div
                      onClick={handleSubmit}
                      className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-semibold cursor-pointer"
                    >
                      <span className="inline-block"> Sign Up </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <Image src={LoginImg} className="w-full xxl:mr-[-200px]" alt="" />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default page;
