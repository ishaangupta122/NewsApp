import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-indigo-600 text-white p-4 sticky top-0 h-15'>
      <div className='container mx-auto flex justify-between items-center px-5'>
        {/* Logo */}
        <div className='text-2xl font-bold'>
          <Link to={"/"}>News.</Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-6'>
          <Link
            to={"/"}
            className='px-2 py-2 rounded-md font-semibold hover:bg-white hover:text-indigo-600'>
            Home
          </Link>
          <Link
            to={"/"}
            className='px-2 py-2 rounded-md font-semibold hover:bg-white hover:text-indigo-600'>
            About
          </Link>
          <Link
            to={"/"}
            className='px-2 py-2 rounded-md font-semibold hover:bg-white hover:text-indigo-600'>
            Services
          </Link>
          <Link
            to={"/"}
            className='px-2 py-2 rounded-md font-semibold hover:bg-white hover:text-indigo-600'>
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className='md:hidden flex items-center'>
          <button onClick={toggleSidebar}>
            {isOpen ? (
              <FaTimes className='text-2xl' />
            ) : (
              <FaBars className='text-2xl' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-indigo-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}>
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-8'>Menu</h2>
          <nav className='space-y-6'>
            <Link
              to={"/"}
              className='block text-lg hover:text-emerald-400'
              onClick={toggleSidebar}>
              Home
            </Link>
            <Link
              to={"/"}
              className='block text-lg hover:text-emerald-400'
              onClick={toggleSidebar}>
              About
            </Link>
            <Link
              to={"/"}
              className='block text-lg hover:text-emerald-400'
              onClick={toggleSidebar}>
              Services
            </Link>
            <Link
              to={"/"}
              className='block text-lg hover:text-emerald-400'
              onClick={toggleSidebar}>
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
