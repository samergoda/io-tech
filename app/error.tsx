"use client";

export default function Error({
    error,
    reset,
  }: {
    error: Error;
    reset: () => void;
}) {
  return (
    // Error page HTML content goes here...
    <html>
      <body>
        <main>Error! {error.message}</main>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
