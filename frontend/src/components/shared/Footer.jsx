import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">Job Hunt</h2>
            <p className="text-sm">Your dream job is just a click away!</p>
          </div>
          <div className="flex space-x-6 text-center md:text-left">
            <a href="/" className="hover:text-gray-400">
              Home
            </a>
            <a href="/jobs" className="hover:text-gray-400">
              Jobs
            </a>
            <a href="/about" className="hover:text-gray-400">
              About Us
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <p className="text-sm text-center md:text-left">
            &copy; 2024 Job Hunt. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0 text-center md:text-left">
            <a href="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
