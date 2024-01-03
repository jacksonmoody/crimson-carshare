export default function Welcome() {
  return (
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
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
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
  );
}