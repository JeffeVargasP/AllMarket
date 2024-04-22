"use client";
import React from "react";
export default function SignUp() {
  const [state, setState] = React.useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, phone, address, email, password, confirmPassword } = state;

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        email,
        password,
      }),
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="signup-card flex flex-col w-3/12 max-2xl:w-4/12 max-xl:w-4/12 max-lg:w-6/12 max-md:w-8/12 max-sm:w-9/12 h-2/3 max-sm:h-5/6 rounded-md border-2">
        <div className="h-1/6 title m-2 p-2 flex flex-col text-center justify-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
        </div>

        <div className="content h-full w-full flex flex-col gap-2">
          <div className="input-group flex flex-col w-full items-center">
            <span className="text-xs font-bold  text-left">Name</span>
            <input
              className="w-4/5 text-black p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-700/50 placeholder-black/50 focus:placeholder-black/75 border"
              type="text"
              value={name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>
          <div className="input-group flex flex-col w-full items-center">
            <span className="text-xs font-bold  text-left">Phone</span>
            <input
              className="w-4/5 text-black p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-700/50 placeholder-black/50 focus:placeholder-black/75 border"
              type="tel"
              value={phone}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />
          </div>
          <div className="input-group flex flex-col w-full items-center">
            <span className="text-xs font-bold  text-left">Address</span>
            <input
              className="w-4/5 text-black p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-700/50 placeholder-black/50 focus:placeholder-black/75 border"
              type="text"
              value={address}
              onChange={(e) => setState({ ...state, address: e.target.value })}
            />
          </div>
          <div className="input-group flex flex-col w-full items-center">
            <span className="text-xs font-bold  text-left">Email</span>
            <input
              className="w-4/5 text-black p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-700/50 placeholder-black/50 focus:placeholder-black/75 border"
              type="email"
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>
          <div className="input-group flex flex-col w-full items-center">
            <span className="text-xs font-bold  text-left">Password</span>
            <input
              className="w-4/5 text-black p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-700/50 placeholder-black/50 focus:placeholder-black/75 border"
              type="password"
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
            <span className="text-xs">ⓘ Password must be at least 8 characters.</span>
          </div>
          <div className="input-group flex flex-col w-full items-center">
            <span className="text-xs font-bold  text-left">
              Confirm Password
            </span>
            <input
              className="w-4/5 text-black p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-700/50 placeholder-black/50 focus:placeholder-black/75 border"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setState({ ...state, confirmPassword: e.target.value })
              }
            />
          </div>
        </div>
        <div className="button w-full flex justify-center">
          <button
            className="bg-yellow-300 hover:bg-yellow-400 rounded-sm w-2/4 lg:m-4 md:m-2 p-1.5 text-md"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
