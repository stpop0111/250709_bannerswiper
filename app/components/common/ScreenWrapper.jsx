export default function ScreenWrapper({ children }) {
  return (
    <section className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto my-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}
