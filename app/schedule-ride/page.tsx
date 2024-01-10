"use client";
import Map from "@/components/Map";
import { useState } from "react";
import CustomDatepicker from "@/components/ui/CustomDatepicker";
import { toStandardTime, convertDate } from "@/utils/helpers";
import Alert from "@/components/ui/Alert";
import { createClient } from "@/utils/supabase/client";
import { Enums } from "@/types/supabase";
import { useRouter } from "next/navigation";

export default function Index() {
  const [page, setPage] = useState(0);
  const [destLat, setDestLat] = useState<number | null>(null);
  const [destLong, setDestLong] = useState<number | null>(null);
  const [destName, setDestName] = useState<string | null>(null);
  const [sourceLat, setSourceLat] = useState<number | null>(null);
  const [sourceLong, setSourceLong] = useState<number | null>(null);
  const [sourceName, setSourceName] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string>(new Date().toString());
  const [transit, setTransit] = useState<string | null>(null);
  const [capacity, setCapacity] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorPage, setErrorPage] = useState<number | null>(null);
  const supabase = createClient();
  const router = useRouter();

  function validateDestination() {
    if (destLat && destLong && destName) {
      setPage(1);
    } else {
      setError("Please enter a valid destination.");
      setErrorPage(0);
    }
  }

  function validateSource() {
    if (sourceLat && sourceLong && sourceName) {
      setPage(2);
    } else {
      setError("Please enter a valid address.");
      setErrorPage(1);
    }
  }

  function validateTime() {
    if (time) {
      setPage(3);
      const newTime = toStandardTime(time);
      setTime(newTime);
    } else {
      setError("Please enter a valid time.");
      setErrorPage(2);
    }
  }

  function validateDetails() {
    if (transit && capacity) {
      setPage(4);
    } else {
      setError("Please select a service and enter a valid number of people.");
      setErrorPage(3);
    }
  }

  async function submitRide() {
    const { data } = await supabase.auth.getUser();
    const id = data.user?.id;
    if (!id) return;

    const { error } = await supabase.from("rides").insert([
      {
        destination: {
          name: destName,
          lat: destLat,
          long: destLong,
        },
        source: {
          name: sourceName,
          lat: sourceLat,
          long: sourceLong,
        },
        time: time,
        date: date,
        transit: transit as Enums<"Transit">,
        capacity: capacity,
        owner: id,
      },
    ]);

    if (!error) {
      router.push("/schedule-ride/confirmation");
    }
  }

  return (
    <main className="flex flex-col items-center">
      <div className="animate-in px-3">
        <h1 className="text-5xl font-bold mt-10 text-center">
          Schedule a New Ride
        </h1>
        {page === 0 && (
          <div className="text-center px-3">
            <h2 className="text-2xl font-light text-center mt-3 mb-5">
              Where are you headed?
            </h2>
            <Map
              setLat={setDestLat}
              setLong={setDestLong}
              setName={setDestName}
            />
            {error && errorPage === 0 && (
              <Alert message={error} className="mt-5" />
            )}
            <button
              className="btn btn-primary w-40 my-5"
              onClick={validateDestination}
            >
              Next
            </button>
          </div>
        )}
        {page === 1 && (
          <div className="text-center px-3">
            <h2 className="text-2xl font-light text-center mt-3 mb-5">
              Where are you leaving from?
            </h2>
            <Map
              setLat={setSourceLat}
              setLong={setSourceLong}
              setName={setSourceName}
            />
            {error && errorPage === 1 && (
              <Alert message={error} className="mt-5" />
            )}
            <button
              className="btn btn-primary w-40 my-5"
              onClick={validateSource}
            >
              Next
            </button>
          </div>
        )}
        {page === 2 && (
          <div className="text-center px-3">
            <h2 className="text-2xl font-light text-center mt-3 mb-5">
              What day are you planning on leaving?
            </h2>
            <CustomDatepicker setSelectedDate={setDate} />
            <h2 className="text-2xl font-light text-center my-5">
              What time are you planning on leaving?
            </h2>
            <input
              type="time"
              required
              className="input input-bordered w-full max-w-xs mb-5"
              onChange={(e) => setTime(e.target.value)}
            />
            <br />
            {error && errorPage === 2 && (
              <Alert message={error} className="my-3 max-w-xs mx-auto" />
            )}
            <button
              className="btn btn-primary w-40 mt-2 mb-5"
              onClick={validateTime}
            >
              Next
            </button>
          </div>
        )}
        {page === 3 && (
          <div className="text-center px-3">
            <h2 className="text-2xl font-light text-center my-5">
              Which service are you planning on using?
            </h2>
            <select
              className="select select-bordered w-full max-w-xs"
              name="year"
              defaultValue="select-year"
              onChange={(e) => setTransit(e.target.value)}
            >
              <option disabled value="select-year">
                Select a service
              </option>
              <option value="Uber">Uber</option>
              <option value="Lyft">Lyft</option>
              <option value="MBTA">MBTA</option>
              <option value="Other">Other</option>
            </select>
            <h2 className="text-2xl font-light text-center mt-10">
              How many additional people can you take?
            </h2>
            <div className="flex items-center justify-center my-5">
              <input
                type="number"
                placeholder="0"
                required
                className="input input-bordered w-20"
                onChange={(e) => setCapacity(parseInt(e.target.value))}
              />
              <p className="font-light text-lg ml-3">People</p>
            </div>
            {error && errorPage === 3 && (
              <Alert message={error} className="my-3 mx-auto" />
            )}
            <button
              className="btn btn-primary w-40 mt-2 mb-5"
              onClick={validateDetails}
            >
              Confirm
            </button>
          </div>
        )}
        {page === 4 && (
          <div className="text-center px-3">
            <h2 className="text-2xl font-light text-center my-5">
              Please confirm that you would like to schedule the following ride:
            </h2>
            <div className="card card-side bg-base-100 shadow-xl text-left h-40">
              <figure className="h-full w-40">
                <img
                  src={
                    "https://arztucsgkimyfwgxmyms.supabase.co/storage/v1/object/public/images/" +
                    transit +
                    ".jpeg"
                  }
                  alt="Transportation Logo"
                  className="object-cover w-full h-full rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Ride to {destName}</h2>
                <p>
                  Leaving from{" "}
                  <span className="font-semibold">{sourceName}</span> at{" "}
                  <span className="font-semibold">{time}</span> on{" "}
                  <span className="font-semibold">{convertDate(date)}</span>
                </p>
                <p>
                  Traveling by <span className="font-semibold">{transit}</span>{" "}
                  with room for{" "}
                  <span className="font-semibold">{capacity} more</span>.
                </p>
              </div>
            </div>
            <button
              className="btn btn-primary w-40 mt-10 mb-5"
              onClick={submitRide}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
