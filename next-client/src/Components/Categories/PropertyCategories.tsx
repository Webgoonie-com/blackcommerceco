"use client"

import { useSearchParams } from "next/navigation";
import CategoryBox from "../CategoryBox"
import { categories } from "../navbar/categories/CategoriesProperties"
import Container from "@/Components/Container";

const PropertyCategories = () => {
    const params = useSearchParams();

    // extract the category from params
    const category = params?.get('category')

    return (
        <section id="allCategoriesSection" className="relative px-2 py-20 bg-gray-950">
            <Container>
                <div className="relative">
                    <h3 className="text-white text-3xl font-semibold sm:text-4xl">
                        Property Categories
                    </h3>
                    <p className="mt-3 text-gray-200">
                        Browse a list of all our property categories.
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-12 gap-4">
                    {categories.map((item: any) => (
                        <div key={item.label} className="col-span-12 md:col-span-6 lg:col-span-3 bg-gray-900 border border-gray-800 rounded-md p-5">
                            <CategoryBox 
                                key={item.label}
                                //description={item.description}
                                selected={category == item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
export default PropertyCategories