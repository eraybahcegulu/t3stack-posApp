
import { unstable_noStore as noStore } from "next/cache";
import Header from "./_components/Header";


export default async function Home() {
  noStore();

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Header />
      <div className="main grow max-xl:mb-20 flex border border-black flex-row  justify-between max-md:flex-col overflow-auto">

        <div className="flex flex-col border border-black min-w-[200px]">
          <span>a</span>
          <span>a</span>
        </div>

        <div className="border border-black grow">
          Products
        </div>

        <div className="border border-black min-w-[300px] ">
          Cart
        </div>

      </div>
    </main>
  );
}

