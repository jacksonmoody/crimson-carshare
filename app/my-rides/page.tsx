// @ts-nocheck
// Necessary due to nested types in Supabase query

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Ride from "@/components/Ride";
import NoRidesAvailable from "@/components/NoRidesAvailable";
import { convertDate } from "@/utils/helpers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  if (!userId) {
    return null;
  }

  const { data: myRides } = await supabase
    .from("rides")
    .select(
      "id, destination, source, date, time, transit, capacity, guests, owner, users(house, year)"
    )
    .eq("owner", userId)
    .order("created_at", { ascending: false });

  const { data: joinedRides } = await supabase
    .from("requests")
    .select("ride(id, destination, source, date, time, transit, capacity, guests, owner, users(name, phone, image, house, year)), approved")
    .eq("requester", userId)
    .eq("approved", true)
    .order("created_at", { ascending: false })

  const { data: requestedRides } = await supabase
    .from("requests")
    .select("ride(*), approved")
    .eq("requester", userId)
    .eq("approved", false)
    .order("created_at", { ascending: false })

  const currentDate = convertDate(new Date().toString());

  const myRidesFiltered = myRides?.filter((ride) => {
    if (new Date(ride.date!) < new Date() && convertDate(ride.date!) !== currentDate) {
      return false;
    }
    return true;
  });

  const joinedRidesFiltered = joinedRides?.filter((ride) => {
    if (new Date(ride.ride.date!) < new Date() && convertDate(ride.ride.date!) !== currentDate) {
      return false;
    }
    return true;
  });

  const requestedRidesFiltered = requestedRides?.filter((ride) => {
    if (new Date(ride.ride.date!) < new Date() && convertDate(ride.ride.date!) !== currentDate) {
      return false;
    }
    return true;
  });

  return (
    <main className="animate-in px-3">
      <h1 className="text-5xl font-bold mt-10 text-center">
        My Upcoming Rides
      </h1>
      {(myRidesFiltered && myRidesFiltered.length > 0) && (
        <h3 className="text-xl font-bold mt-6">Rides I've Scheduled:</h3>
      )}
      {myRidesFiltered?.map((ride) => (
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
          owner={ride.owner!}
          guests={ride.guests}
          year={ride.users?.year!}
          house={ride.users?.house!}
          includeGuests
        />
      ))}
      {(joinedRidesFiltered && joinedRidesFiltered.length > 0) && (
        <h3 className="text-xl font-bold mt-6">Rides I've Joined:</h3>
      )}
      {joinedRidesFiltered?.map((ride) => (
        <Ride
          key={ride.ride.id}
          id={ride.ride.id}
          destinationLat={ride.ride.destination?.lat!}
          destinationLong={ride.ride.destination?.long!}
          destinationName={ride.ride.destination?.name!}
          sourceName={ride.ride.source?.name!}
          date={ride.ride.date}
          time={ride.ride.time}
          transit={ride.ride.transit}
          capacity={ride.ride.capacity!}
          owner={ride.owner!}
          ownerName={ride.ride.users?.name!}
          ownerPhone={ride.ride.users?.phone!}
          ownerImage={ride.ride.users?.image!}
          guests={ride.ride.guests}
          year={ride.ride.users?.year!}
          house={ride.ride.users?.house!}
          includeOwner
        />
      ))}
      {(requestedRidesFiltered && requestedRidesFiltered.length > 0) && (
        <h3 className="text-xl font-bold mt-6">Rides I've Requested:</h3>
      )}
      {requestedRidesFiltered?.map((ride) => (
        <Ride
          key={ride.ride.id}
          id={ride.ride.id}
          destinationLat={ride.ride.destination?.lat!}
          destinationLong={ride.ride.destination?.long!}
          destinationName={ride.ride.destination?.name!}
          sourceName={ride.ride.source?.name!}
          date={ride.ride.date}
          time={ride.ride.time}
          transit={ride.ride.transit}
          capacity={ride.ride.capacity!}
          guests={ride.ride.guests}
          owner={ride.owner!}
          year={ride.ride.users?.year!}
          house={ride.ride.users?.house!}
        />
      ))}
      <NoRidesAvailable
        myRides={myRidesFiltered}
        requestedRides={requestedRidesFiltered}
        joinedRides={joinedRidesFiltered}
      />
    </main>
  );
}
