import { redirect } from "next/navigation";

export default function Index() {
  async function viewRides() {
    "use server";
    redirect("/my-rides");
  }

  return (
    <main className="animate-in">
      <h1 className="text-5xl font-bold mt-10 text-center">Success!</h1>
      <div className="text-center px-3">
        <h2 className="text-2xl font-light text-center mt-3 mb-5">
          The ride was successfully scheduled.
        </h2>
        <form action={viewRides}>
          <button className="btn btn-primary w-40 mt-3" type="submit">
            View My Rides
          </button>
        </form>
      </div>
    </main>
  );
}
