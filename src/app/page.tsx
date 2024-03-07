
import { unstable_noStore as noStore } from "next/cache";
import Header from "./_components/Header";
import Categories from "./_components/Categories";
import Products from "./_components/Products";
import Cart from "./_components/Cart";


export default async function Home() {
  noStore();

  return (
    <main className="min-h-screen max-h-screen flex flex-col bg-gradient-to-b from-[#2a0f33] to-[#490581] text-white">
      <Header />
      <div className="main flex-1  max-xl:mb-20 flex flex-row gap-3 p-4 justify-between max-md:flex-col overflow-auto">
        <Categories />
        <Products />
        <Cart />
      </div>
    </main>
  );
}

