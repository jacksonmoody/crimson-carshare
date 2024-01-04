import { FaCar } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";

export default function Welcome() {
  return (
    <>
      <div className="animate-in grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            Welcome to Crimson CarShare
          </h1>
          <p className="max-w-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
            The easiest way for Harvard Students to find rides to share with
            others.
          </p>
          <a
            href="/login"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 btn btn-primary"
          >
            Get Started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://arztucsgkimyfwgxmyms.supabase.co/storage/v1/object/public/images/Hero.gif"
            alt="Animated Car Image"
          ></img>
        </div>
      </div>
      <div className="animate-in text-center">
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <h1 className="text-4xl xl:text-5xl font-extrabold lg:mt-20 lg:mb-16">
          How It Works
        </h1>
        <div className="flex flex-col items-center justify-center md:flex-col lg:flex-row">
          <div className="col-span-1 flex flex-1 flex-col items-center gap-6 px-10 py-10 lg:px-4 xl:px-2">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-crimson transition hover:bg-crimson-dark focus:bg-crimson-dark">
                <MdAccountCircle color="white" fontSize="2em" />
              </div>
            </div>
            <div className="flex flex-col gap-2 px-2 text-center">
              <h4 className="text-2xl font-extrabold text-dark-grey-900">
                Create an account
              </h4>
              <p className="text-base font-medium leading-7 text-dark-grey-600 lg:px-8">
                Share your contact information and preferences to get
                personalized ride sharing suggestions
              </p>
            </div>
          </div>
          <div className="col-span-1 flex flex-1 flex-col items-center gap-6 rounded-2xl bg-white px-10 py-10 shadow-md">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-crimson transition hover:bg-crimson-dark focus:bg-crimson-dark">
                <FaCar color="white" fontSize="1.5em" />
              </div>
            </div>
            <div className="flex flex-col gap-2 px-2 text-center">
              <h4 className="text-2xl font-extrabold text-dark-grey-900">
                Join rides
              </h4>
              <p className="text-base font-medium leading-7 text-dark-grey-600 lg:px-8">
                Easily see upcoming rides and join them with a single click
              </p>
            </div>
          </div>
          <div className="col-span-1 flex flex-1 flex-col items-center gap-6 px-10 py-10 lg:px-4 xl:px-2">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-crimson transition hover:bg-crimson-dark focus:bg-crimson-dark">
                <FaRegCalendarCheck color="white" fontSize="1.5em" />
              </div>
            </div>
            <div className="flex flex-col gap-2 px-2 text-center">
              <h4 className="text-2xl font-extrabold text-dark-grey-900">
                Organize rides
              </h4>
              <p className="text-base font-medium leading-7 text-dark-grey-600 lg:px-8">
                If you already have a ride scheduled, post it on Crimson
                CarShare to share with other students
              </p>
            </div>
          </div>
        </div>
        <a
          href="/login"
          className="px-5 py-3 btn btn-primary mb-10 lg:my-20"
        >
          Get Started
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </>
  );
}
