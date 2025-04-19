import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import ProductListSec from "@/components/common/ProductListSec";
import { notFound } from "next/navigation";
import { Product } from "@/types/product.types";

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const id = params.slug[0];

  let productData: Product;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
      {
        cache: "no-store", // Ensures SSR always gets fresh data
      }
    );

    if (!res.ok) {
      notFound();
    }

    productData = await res.json();
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData.title ?? "Product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>

      {/* You can show related products if needed – this can be fetched separately */}
      {/* <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProducts} />
      </div> */}
    </main>
  );
}
