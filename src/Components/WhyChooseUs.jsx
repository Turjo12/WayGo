'use client';
import { FaArrowRight } from "react-icons/fa6";
import { RiBusLine } from "react-icons/ri";
import { PiHandshake } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { FaPeopleGroup } from "react-icons/fa6";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";

function WhyChooseUs() {
  const [displayCount, setDisplayCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null); 
  const count = '25';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 } 
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if(hasStarted && count > 0) {
      let start = 0;
      const duration  = 1000;
      const increment = count / (duration / 10);
      const timer = setInterval(() => {
        start += increment;
        if(start >=count) {
          setDisplayCount(count);
          clearInterval(timer);
        }else{
          setDisplayCount(Math.ceil(start));
        }
      }, 10);
      return () => clearInterval(timer);
    }
  }, [count, hasStarted]);

  return (
    <div className="w-full ">
      <div className='grid grid-cols-1 lg:grid-cols-2'>

        {/* Image Section */}
        <div className="relative h-72 md:h-96 lg:h-auto">
          <div className="absolute inset-0">
            <Image
              alt="bus photo"
              src="/HomePage/chooseBus.jpg"
              layout="fill"
              objectFit="cover"
              className="relative"
            />
          </div>
          <div className='bg-gradient-to-r from-clr-focussed to-[#ec3124] text-white absolute md:bottom-8 left-5 lg:w-[66%] md:w-[76%] rounded-xl lg:p-12 md:p-8 hidden md:block'>
            <h2 className='lg:text-3xl md:text-2xl mb-4'>We Provide Best Bus For You</h2>
            <p>Our every buses are comfortable, well designed and maintain the road safety. You feel a luxuries journey to your destination</p>
            
          </div>
        </div>

        {/* Description Part */}
        <div className='bg-black text-white lg:p-24 md:p-14 p-10 space-y-4'>
          <div>
            <h3 className='text-clr-focussed text-lg'>Why Choose Us</h3>
          </div>
          <div>
            <h2>We Are Experts In Bus Charter Service Company Since 1999</h2>
          </div>
          <p className='lg:w-4/5 md:w-fit'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, nulla sed laudantium libero iure nihil ea vel saepe consequatur ex atque voluptatibus, fugit facere rerum sit!
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 pt-6'>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <RiBusLine className="text-clr-focussed text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">25 <span className="text-clr-focussed text-2xl font-bold">+</span></h4>
                <h5 className="text-base font-normal text-[var(--clr-light-gray)]">Buses Ready</h5>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <PiHandshake className="text-clr-focussed text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">2,640 <span className="text-clr-focussed text-2xl font-bold">+</span></h4>
                <h5 className="text-base font-normal text-[var(--clr-light-gray)]">Satisfied Customer</h5>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <SiTicktick className="text-clr-focussed text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">2,836 <span className="text-clr-focussed text-2xl font-bold">+</span></h4>
                <h5 className="text-base font-normal text-[var(--clr-light-gray)]">Booking Done</h5>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <FaPeopleGroup className="text-clr-focussed text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">75 <span className="text-clr-focussed text-2xl font-bold">+</span></h4>
                <h5 className="text-base font-normal text-[var(--clr-light-gray)]">Professional Team</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
