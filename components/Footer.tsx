import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs gap-5">
      <a
        href="https://forms.gle/q5pttJmYyMk9SAh4A"
        className="link-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Submit Feedback
      </a>
      <Link
        href="/terms-of-service"
        className="link-underline"
      >
        Terms of Service
      </Link>
      <Link
        href="/privacy-policy"
        className="link-underline"
      >
        Privacy Policy
      </Link>
    </footer>
  );
}
