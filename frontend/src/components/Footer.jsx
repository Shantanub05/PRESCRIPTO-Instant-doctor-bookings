import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Prescripto – Your go-to app for instant doctor appointments. Book
            trusted healthcare professionals with ease, anytime, anywhere. Fast,
            secure, and hassle-free healthcare at your fingertips!
          </p>
        </div>

        {/* middle section */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* right section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH </p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-8600788401</li>
            <li>shantanubokey1234@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center"> Copyright 2025@ Prescripto - All Rights Reserved.</p>
      </div>
    </div>
  );
}
export default Footer