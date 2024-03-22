import CategoriesProperties from '@/Components/Categories/Categories'
import CategoriesBusinesses from './CategoriesBusinesses'

import Container from '@/Components/Container'

const Categories = () => {
    

    return (
        <Container>
                <div className="pt-4 flex flex-row items-center justify-between-overflow-x-auto">
                    
                    <CategoriesProperties />

                    <CategoriesBusinesses />
                    
                </div>
        </Container>
    )
}
export default Categories