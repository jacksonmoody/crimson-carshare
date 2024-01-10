import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Ride from "@/components/Ride";
import RedirectButton from "@/components/RedirectButton";
import { convertDate } from "@/utils/helpers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await supabase.auth.getUser();

  const greetings = [
    "Welcome",
    "Hey there",
    "Greetings",
    "Hello there",
    "Good day",
  ];
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  if (user.data.user) {
    const { data: userId } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.data.user.id)
      .single();

    const { data: rides } = await supabase
      .from("rides")
      .select(
        "id, destination, source, date, time, transit, capacity, guests, owner, users(house, year)"
      )
      .order("created_at", { ascending: false });

    const eligibleRides = rides?.filter((ride) => {
      if (ride.guests && ride.guests.includes(user.data.user!.id)) {
        return false;
      }

      if (ride.guests && ride.guests.length >= ride.capacity!) {
        return false;
      }

      if (new Date(ride.date!) < new Date()) {
        return false;
      }

      return true;
    });

    const ridesToday = rides?.filter((ride) => {
      const currentDate = convertDate(new Date().toString());
      if (convertDate(ride.date) !== currentDate) {
        return false;
      }
      return true;
    });

    return (
      <main className="flex flex-col items-center">
        <div className="animate-in px-3">
          <h1 className="text-5xl font-bold mt-10 text-center">
            {greeting}, {userId?.name?.split(" ")[0]}!
          </h1>
          {ridesToday?.length! > 0 ||
            (eligibleRides && eligibleRides.length > 0 && (
              <h2 className="text-2xl font-light text-center mt-3">
                Let's find you a ride:
              </h2>
            ))}
          {ridesToday?.length! > 0 && (
            <>
              <h3 className="text-xl font-bold mt-3">Rides Today:</h3>
              {ridesToday?.map((ride) => (
                <Ride
                  key={ride.id}
                  id={ride.id}
                  destinationLat={ride.destination?.lat!}
                  destinationLong={ride.destination?.long!}
                  destinationName={ride.destination?.name!}
                  sourceName={ride.source?.name!}
                  date={ride.date}
                  time={ride.time}
                  transit={ride.transit}
                  capacity={ride.capacity!}
                  owner={ride.owner}
                  guests={ride.guests}
                  year={ride.users?.year!}
                  house={ride.users?.house!}
                  includeImage
                  includeActions
                  includeSchedule
                />
              ))}
            </>
          )}
          {eligibleRides && eligibleRides.length > 0 && (
            <div className="mt-5">
              <h3 className="text-xl font-bold mt-3">Upcoming Rides:</h3>
              <div className="flex flex-row flex-wrap justify-center gap-5">
                {eligibleRides?.map((ride) => (
                  <div key={ride.id} className="w-80">
                    <Ride
                      key={ride.id}
                      id={ride.id}
                      destinationLat={ride.destination?.lat!}
                      destinationLong={ride.destination?.long!}
                      destinationName={ride.destination?.name!}
                      sourceName={ride.source?.name!}
                      date={ride.date}
                      time={ride.time}
                      transit={ride.transit}
                      capacity={ride.capacity!}
                      owner={ride.owner}
                      guests={ride.guests}
                      year={ride.users?.year!}
                      house={ride.users?.house!}
                      includeActions
                      includeSchedule
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {eligibleRides &&
            eligibleRides.length === 0 &&
            ridesToday &&
            ridesToday.length == 0 && (
              <h3 className="text-xl font-bold mt-6 text-center">
                There are no upcoming rides available. Would you like to
                schedule a new one?
              </h3>
            )}
          <div className="text-center">
            <RedirectButton
              title="Schedule New Ride"
              path="/schedule-ride"
              className="w-64 my-5"
            />
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <span className="loading loading-spinner loading-lg text-primary mt-5"></span>
    );
  }
}
