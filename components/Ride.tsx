"use client";

import { convertDate } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Enums } from "@/types/supabase";
import CustomModal from "@/components/ui/CustomModal";
import CustomToast from "@/components/ui/CustomToast";
import { Accordion } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Ride({
  id,
  destinationLat,
  destinationLong,
  destinationName,
  sourceName,
  date,
  time,
  transit,
  capacity,
  year,
  owner,
  ownerName,
  ownerPhone,
  ownerImage,
  house,
  guests,
  includeImage,
  includeActions,
  includeSchedule,
  includeOwner,
  includeGuests,
}: {
  id: number;
  destinationLat: number | null;
  destinationLong: number | null;
  destinationName: string | null;
  sourceName: string | null;
  date: string | null;
  time: string | null;
  transit: string | null;
  capacity: number | null;
  year: Enums<"Year">;
  owner: string | null;
  ownerName?: string | null;
  ownerPhone?: string | null;
  ownerImage?: string | null;
  house: Enums<"House">;
  guests: Array<string> | null | undefined;
  includeImage?: boolean;
  includeActions?: boolean;
  includeSchedule?: boolean;
  includeOwner?: boolean;
  includeGuests?: boolean;
}) {
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("none");
  const [guestRequests, setGuestRequests] = useState<Array<any>>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showToast2, setShowToast2] = useState<boolean>(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchImage = async (url: string) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setImage(imageObjectURL);
    };

    fetchImage(
      "https://maps.googleapis.com/maps/api/streetview?location=" +
        destinationLat +
        "," +
        destinationLong +
        "&size=400x400&key=" +
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API
    );

    async function fetchStatus() {
      const { data: user } = await supabase.auth.getUser();
      const userId = user.user?.id;
      const { data: rides } = await supabase
        .from("requests")
        .select("*")
        .eq("ride", id);

      const requests = rides?.filter((request) => {
        if (request.requester == userId) {
          return true;
        }
        return false;
      });

      if (requests && requests.length > 0) {
        if (requests[0].approved) {
          setStatus("approved");
        } else {
          setStatus("pending");
        }
      }

      if (owner == userId) {
        setStatus("approved");
      }

      const { data: guestRequests } = await supabase
        .from("requests")
        .select("requester(*), approved")
        .eq("ride", id);

      if (guestRequests) {
        setGuestRequests(guestRequests);
      }
    }

    fetchStatus();
  }, []);

  let newCapacity = capacity;
  if (guests) {
    newCapacity = capacity! - guests.length;
  }

  async function joinRide() {
    const { data: user } = await supabase.auth.getUser();
    const userId = user.user?.id;
    const { data: ride } = await supabase
      .from("rides")
      .select("*")
      .eq("id", id)
      .single();

    const { error } = await supabase.from("requests").insert({
      requester: userId,
      ride: ride?.id,
    });
    if (!error) {
      setShowToast(true);
      setStatus("pending");
      window.scrollTo(0, 0);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  }

  async function approveRequest(requesterId: string) {
    let newGuests = guests;
    if (guests) {
      newGuests = guests.concat(requesterId);
    } else {
      newGuests = [requesterId];
    }

    await supabase
      .from("requests")
      .update({ approved: true })
      .eq("requester", requesterId)
      .eq("ride", id);

    await supabase.from("rides").update({ guests: newGuests }).eq("id", id);

    setShowToast2(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setShowToast2(false);
    }, 5000);
    router.refresh();
  }

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.className = "btn btn-success text-white pointer-events-none";
    e.currentTarget.innerHTML = "Approved";
  }

  return (
    <div key={id} className="card lg:card-side bg-base-100 shadow-xl my-5">
      {includeImage && (
        <figure className="max-h-64">
          {image && <img src={image} alt="Destination Location" />}
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">
          {transit} to {destinationName}
        </h2>
        <p>
          Leaving from {sourceName} at {time} on {convertDate(date)}
        </p>
        {includeSchedule && year == "First Year" ? (
          <p>Scheduled by a {year} in Harvard Yard</p>
        ) : (
          includeSchedule && (
            <p>
              Scheduled by a {year} in {house}
            </p>
          )
        )}
        <p className="font-bold">
          {newCapacity == 1
            ? newCapacity + " seat remaining"
            : newCapacity + " seats remaining"}
        </p>
        {includeActions && (
          <div className="card-actions justify-end">
            {status == "none" && (
              <CustomModal
                buttonTitle="Join Ride"
                header="Confirm Ride Request"
                body1={
                  "Are you sure you want to join this ride to " +
                  destinationName +
                  "?"
                }
                body2={
                  "This will send a request to the " +
                  year.toLowerCase() +
                  " organizing the ride, who will then be able to accept or reject your request to join."
                }
                callback={joinRide}
              />
            )}
            {status == "pending" && (
              <button className="btn btn-disabled">Request Pending</button>
            )}
            {status == "approved" && (
              <button className="btn btn-success text-white pointer-events-none">
                Ride Joined
              </button>
            )}
          </div>
        )}
        {includeOwner && (
          <div className="card-actions justify-end">
            <CustomModal
              buttonTitle="Contact Organizer"
              header="Organizer Contact Information"
              image={ownerImage!}
              body2={
                "This ride is being organized by " +
                ownerName +
                ", a " +
                year.toLowerCase() +
                " in " +
                (house == "First Year Dorm"
                  ? "a first year dorm"
                  : house + " House") +
                ". Reach out to them for more details about your ride!"
              }
              contact={ownerPhone!}
            />
          </div>
        )}
        {includeGuests && guestRequests && guestRequests.length > 0 && (
          <Accordion className="max-w-lg" collapseAll>
            <Accordion.Panel>
              <Accordion.Title>View Guests</Accordion.Title>
              <Accordion.Content>
                <div className="flex flex-col gap-6">
                  {guestRequests.map((guestRequest) => (
                    <div
                      key={guestRequest.requester.id}
                      className="flex flex-row items-center gap-2"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={guestRequest.requester.image}
                      />
                      <p>{guestRequest.requester.name}</p>
                      {guestRequest.approved && (
                        <button className="btn btn-success text-white pointer-events-none">
                          Approved
                        </button>
                      )}
                      {!guestRequest.approved &&
                        guests &&
                        capacity &&
                        guests.length >= capacity && (
                          <button className="btn btn-disabled">
                            Ride Full
                          </button>
                        )}
                      {!guestRequest.approved &&
                        ((guests && capacity && guests.length < capacity) ||
                          guests == null ||
                          guests == undefined) && (
                          <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              approveRequest(guestRequest.requester.id);
                              handleButtonClick(e);
                            }}
                          >
                            Approve Request
                          </button>
                        )}
                    </div>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        )}
      </div>
      <CustomToast
        message="Join Request Sent!"
        showToast={showToast}
        setShowToast={setShowToast}
      />
      <CustomToast
        message="Request Approved!"
        showToast={showToast2}
        setShowToast={setShowToast2}
      />
    </div>
  );
}
