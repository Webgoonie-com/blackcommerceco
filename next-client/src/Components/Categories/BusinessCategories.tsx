"use client"

import { useSearchParams } from "next/navigation";
import CategoryBusinessBox from "@/Components/Categories/CategoryBusinessBox"
import { CategoriesOnlyBusinesses } from '@/Components/Categories/CategoriesOnly';
import Container from "@/Components/Container";

const BusinessCategories = () => {
    const params = useSearchParams();

    // extract the business from params
    const business = params?.get('business')
    return (
            <section id="allBusinessesSection" className="relative px-2 py-20 bg-gray-950">
                <Container>
                    <div className="relative">
                        <h3 className="text-white text-3xl font-semibold sm:text-4xl">
                            Businesses Categories
                        </h3>
                        <p className="mt-3 text-gray-200">
                            Browse a list of all businesses we have available
                        </p>
                    </div>
                    <div className="mt-10 grid grid-cols-12 gap-4">
                        {CategoriesOnlyBusinesses.map((item) => (
                            <div key={item.label} className="col-span-12 md:col-span-6 lg:col-span-3 bg-gray-900 border border-gray-800 rounded-md p-5">
                                <CategoryBusinessBox 
                                    description={item.description}
                                    selected={business == item.label}
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
export default BusinessCategories