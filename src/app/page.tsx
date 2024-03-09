
import { unstable_noStore as noStore } from "next/cache";
import Header from "./_components/Header";
import CategoriesSection from "./_components/CategoriesSection";
import ProductsSection from "./_components/ProductsSection";
import CartSection from "./_components/CartSection";


export default async function Home() {
  noStore();

  return (
    <main className="min-h-screen max-h-screen flex pt-4 flex-col bg-gradient-to-b from-[#2a0f33] to-[#490581] text-white">
      <Header />
      <div className="main flex-1  max-xl:mb-20 flex flex-row gap-4 p-4 justify-start max-md:flex-col overflow-auto">
        <CategoriesSection />
        <ProductsSection />
        <CartSection />
      </div>
    </main>
  );
}

