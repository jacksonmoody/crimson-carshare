import RedirectButton from "./RedirectButton";

export default function NoRidesAvailable({
  myRides,
  requestedRides,
  joinedRides,
}: {
  myRides: any;
  requestedRides: any;
  joinedRides: any;
}) {
  if (
    myRides?.length > 0 ||
    requestedRides?.length > 0 ||
    joinedRides?.length > 0 
  ) {
    return null;
  }

  return (
    <>
      <h3 className="text-xl font-bold mt-6 text-center">
        You don't have any rides upcoming. Would you like to join a new one?
      </h3>
      <div className="text-center">
        <RedirectButton title="Join New Ride" path="/" className="w-64 my-5" />
      </div>
    </>
  );
}
