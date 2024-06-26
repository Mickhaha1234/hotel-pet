"use client";

import Image from "next/image";
import Link from "next/link";
import LoginImg from "@/public/img/login-img.png";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const page = () => {
  const router = useRouter();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("/api/login", {
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

      Cookies.set("id", data.id);
      Cookies.set("email", data.email);
      Cookies.set("firstName", data.firstName);
      Cookies.set("lastName", data.lastName);
      Cookies.set("role", data.role);

      toast.success("Login Completed");
      router.push('/')
    } catch (error) {
      toast.error("Can't Register");
    }
  };

  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] signup-section">
      <div className="container">
        <div className="flex flex-wrap items-center gap-4 md:gap-0 mx-3">
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8">
              <form action="#">
                <h3 className="mb-4 h3"> Welcome Travel Tailes</h3>
                <p className="mb-10"> Sign in to your account and join us </p>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12">
                    <label
                      htmlFor="enter-email"
                      className="text-base sm:text-lg md:text-xl font-medium block mb-3"
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
                      className="text-base sm:text-lg md:text-xl font-medium block mb-3"
                    >
                      Enter Your Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5 mb-3"
                      placeholder="Enter Your Password"
                      id="enter-password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    <Link
                      href="signup"
                      className="link block text-sm text-primary :clr-primary-400 text-end"
                    >
                      Forget password
                    </Link>
                  </div>
                  <div className="col-span-12">
                    <p className="mb-0">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="signup"
                        className="link font-semibold text-primary"
                      >
                        Signup
                      </Link>
                    </p>
                  </div>
                  <div className="col-span-12">
                    <div
                      onClick={handleSubmit}
                      className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-semibold cursor-pointer"
                    >
                      <span className="inline-block"> Sign In </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Image src={LoginImg} className="w-full xxl:mr-[-200px]" alt="" />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default page;
