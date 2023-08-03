import React from 'react';
import instagram from '/Instagram_icon.png.png'
import facebook from '/FacebookIcon.png'
import twitter from '/TwitterLogo.png'
import linkedin from '/LinkedInLogo.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="w-full bg-gray-900 py-6">
      <div className="text-white px-5 py-4">
        <div className="w-1/4 borde p-4">
          <p className="text-2xl font-bold mb-4">Company</p>
          <ul className="ml-4">
            <Link to={ '/' }><li className="mb-2 hover:ml-3 duration-500">About us</li></Link>
            <Link to={ '/' }><li className="mb-2 hover:ml-3 duration-500">Contact us</li></Link>
            <Link to={ '/' }><li className="mb-2 hover:ml-3 duration-500">Privacy Policy</li></Link>
            <Link to={ '/' }><li className='hover:ml-3 duration-500'>Terms of Service</li></Link>
          </ul>
        </div>
        <div className="w-1/4 p-4">
          <p className="text-2xl font-bold mb-4">Categories</p>
          <ul className="ml-4">
            <Link to={ '/' }><li className="mb-2 hover:ml-3 duration-500">Electronics</li></Link>
            <Link to={ '/' }><li className="mb-2 hover:ml-3 duration-500">Fashion</li></Link>
            <Link to={ '/' }><li className="mb-2 hover:ml-3 duration-500">Home & Furniture</li></Link>
            <Link to={ '/' }><li className='hover:ml-3 duration-500'>Beauty & Health</li></Link>
          </ul>
        </div>
        <div className="w-1/4 p-4">
          <p className="text-2xl font-bold mb-4">Customer Support</p>
          <ul className="ml-4">
            <Link to={ '/' }><li className="mb-2 hover:ml-3 duration-500">FAQ</li></Link>
            <Link to={ '/' }><li className="mb-2 hover:ml-3 duration-500">Shipping & Delivery</li></Link>
            <Link to={ '/' }><li className="mb-2 hover:ml-3 duration-500">Returns & Refunds</li></Link>
            <Link to={ '/' }><li className='hover:ml-3 duration-500'>Track Your Order</li></Link>
          </ul>
        </div>
        <div className="w-1/4 p-4">
          <p className="text-2xl font-bold mb-4">Connect With Us</p>
          <ul className="ml-4 flex gap-4 text-2xl">
            <Link to={ '/' }>
              <li className="mb-2">
                <img className='h-6 hover:scale-125 duration-500' src={ instagram } alt='instagram' />
              </li>
            </Link>
            <Link>
              <li className="mb-2">
                <img className='h-6 hover:scale-125 duration-500' src={ facebook } alt='facebook' />
              </li>
            </Link>
            <Link to={ '/' }>
              <li className="mb-2 hover:scale-125 duration-500">
                <img className='h-6' src={ twitter } alt='twitter' />
              </li>
            </Link>
            <Link to={ '/' }>
              <li className="mb-2 hover:scale-125 duration-500" >
                <img className='h-6' src={ linkedin } alt='linkedin' />
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="text-white text-center border-t">
        <div className='mt-3'>
          <Link to={ '/' }>
          <p>&copy; { new Date().getFullYear() } Naxel Store. All rights reserved.</p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
