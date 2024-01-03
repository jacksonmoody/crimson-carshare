import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <div className="navbar bg-crimson">
      <div className="flex-1 px-2 lg:flex-none">
        <a href="/" className="text-lg font-bold text-white">
          Crimson CarShare
        </a>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <a
            href="/my-rides"
            className="btn btn-ghost rounded-btn text-white hidden lg:flex"
          >
            My Rides
          </a>
          <a
            href="/schedule-ride"
            className="btn btn-ghost rounded-btn text-white hidden lg:flex"
          >
            Schedule Ride
          </a>
          {<AuthButton />}
          <div className="dropdown dropdown-end xs:visible lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-btn"
            >
              <svg viewBox="0 0 100 80" width="30" height="30">
                <rect width="100" height="10" rx="5" fill="white"></rect>
                <rect y="30" width="100" height="10" rx="5" fill="white"></rect>
                <rect y="60" width="100" height="10" rx="5" fill="white"></rect>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/my-rides">My Rides</a>
              </li>
              <li>
                <a href="/schedule-ride">Schedule Ride</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
