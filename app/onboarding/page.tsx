import { completeOnboarding } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Alert from "@/components/ui/Alert";

export default async function Onboarding({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="animate-in mt-10 text-center flex flex-col gap-5">
        <h1 className="text-5xl font-bold">
          Welcome, {data.user.user_metadata.full_name.split(" ")[0]}!
        </h1>
        <p className="font-light text-xl">
          Please fill out the following information to customize your Crimson
          CarShare experience:
        </p>
        <form action={completeOnboarding}>
          <label className="form-control w-full max-w-xs px-3 lg:px-0">
            <div className="label">
              <span className="label-text">What is your phone number?</span>
            </div>
            <input
              name="phone"
              type="tel"
              placeholder="555-555-5555"
              className="input input-bordered w-full max-w-xs"
            />
            {searchParams.message == "invalid-phone" && (
              <Alert
                message={
                  "Error. Please enter a valid phone number and try again."
                }
                className="mt-3"
              />
            )}
            <div className="label">
              <span className="label-text">Which class year are you?</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              name="year"
              defaultValue="select-year"
            >
              <option disabled value="select-year">
                Select a year
              </option>
              <option value="First Year">First Year</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>
            {searchParams.message == "invalid-year" && (
              <Alert
                message={"Error. Please select a class year and try again."}
                className="mt-3"
              />
            )}
            <div className="label">
              <span className="label-text">Which house are you in?</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              name="house"
              defaultValue="select-house"
            >
              <option disabled value="select-house">
                Select a house
              </option>
              <option value="First Year Dorm">First Year Dorm</option>
              <option value="Adams">Adams</option>
              <option value="Cabot">Cabot</option>
              <option value="Currier">Currier</option>
              <option value="Dunster">Dunster</option>
              <option value="Eliot">Eliot</option>
              <option value="Kirkland">Kirkland</option>
              <option value="Leverett">Leverett</option>
              <option value="Lowell">Lowell</option>
              <option value="Mather">Mather</option>
              <option value="Pforzheimer">Pforzheimer</option>
              <option value="Quincy">Quincy</option>
              <option value="Winthrop">Winthrop</option>
            </select>
            {searchParams.message == "invalid-house" && (
              <Alert
                message={"Error. Please select a house and try again."}
                className="mt-3"
              />
            )}
            <span className="label-text text-left mt-4 mb-3">
              Which services are you interested in?
            </span>
            <label className="flex items-center gap-7 cursor-pointer my-3">
              <input
                type="checkbox"
                className="checkbox"
                name="Uber"
                value="checked"
              />
              <span className="label-text">Uber</span>
            </label>
            <label className="flex items-center gap-7 cursor-pointer my-3">
              <input
                type="checkbox"
                className="checkbox"
                name="Lyft"
                value="checked"
              />
              <span className="label-text">Lyft</span>
            </label>
            <label className="flex items-center gap-7 cursor-pointer my-3">
              <input
                type="checkbox"
                className="checkbox"
                name="MBTA"
                value="checked"
              />
              <span className="label-text">MBTA</span>
            </label>
            {searchParams.message == "invalid-transit" && (
              <Alert
                message={
                  "Error. Please select at least one service and try again."
                }
                className="mt-3"
              />
            )}
          </label>
          <button className="btn btn-primary my-5">Complete Onboarding</button>
        </form>
      </div>
    </div>
  );
}
