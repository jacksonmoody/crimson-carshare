"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Enums } from "@/types/supabase";

export const completeOnboarding = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();

  const phone = formData.get("phone") as string;
  const year = formData.get("year") as Enums<"Year">;
  const house = formData.get("house") as Enums<"House">;
  const uber = formData.get("Uber") as string;
  const lyft = formData.get("Lyft") as string;
  const mbta = formData.get("MBTA") as string;
  let transit: Array<Enums<"Transit">> = [];
  if (uber == "checked") {
    transit.push("Uber");
  }
  if (lyft == "checked") {
    transit.push("Lyft");
  }
  if (mbta == "checked") {
    transit.push("MBTA");
  }

  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (!re.test(phone)) {
    redirect("/onboarding?message=invalid-phone");
  }

  if (!year) {
    redirect("/onboarding?message=invalid-year");
  }

  if (!house) {
    redirect("/onboarding?message=invalid-house");
  }

  if (transit.length == 0) {
    redirect("/onboarding?message=invalid-transit");
  }

  if (data.user) {
    const { error } = await supabase
      .from("users")
      .update({
        phone: phone,
        year: year,
        house: house,
        transit: transit,
        onboarded: true,
      })
      .eq("id", data.user.id);
    if (!error) {
      redirect("/");
    }
  }
};
