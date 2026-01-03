export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pepe p-6">
      <div className="text-center">
        <div className="bg-pepe min-h-screen p-10">
          {/* 'font-sans' is now Poppins by default */}
          <h1 className="text-sale text-5xl font-bold font-poppins">
            SalePepe
          </h1>
          <p className="text-sale/60 mt-2 font-light">
            Our secret recipes.
          </p>
        </div>
      </div>
    </main>
  );
}
