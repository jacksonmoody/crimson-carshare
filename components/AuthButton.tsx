import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link href="/login" className="btn btn-ghost rounded-btn text-white">
        Login
      </Link>
    );
  }

  const { data } = await supabase
    .from("users")
    .select("image")
    .eq("id", user.id)
    .single();

  const signOut = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <>
      {data && data.image && (
        <form action={signOut}>
          <div className="dropdown dropdown-end dropdown-hover">
            <div tabIndex={0} role="button" className="avatar">
              <div className="w-full h-10 rounded-full mt-1 mx-3">
                <img src={data.image} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[2] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/onboarding">Edit Profile</Link>
              </li>
              <li>
                <button type="submit">Logout</button>
              </li>
            </ul>
          </div>
        </form>
      )}
    </>
  );
}
