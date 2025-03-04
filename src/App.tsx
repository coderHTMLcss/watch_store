import Sidebar from './components/Sidebar';
import { data } from './db/data';
import ProductCard from './components/ProductCard';
import { useFilterStore } from './store/store';

interface Product {
  id: string;
  country: string;
  img: { [key: string]: string | undefined };
  price: number;
  title: string;
}

const App = () => {

  const { selectedCountries, selectedColors, selectedPriceRange } =
    useFilterStore();

  const filteredData = data.filter((item: Product) => {
    const matchesColor =
      selectedColors.length === 0 ||
      Object.keys(item.img).some((color) => selectedColors.includes(color));

    const matchesCountry =
      selectedCountries.length === 0 ||
      selectedCountries.includes(item.country);

    const matchesPrice = selectedPriceRange
      ? item.price >= selectedPriceRange.min &&
      item.price <= selectedPriceRange.max
      : true;

    return matchesColor && matchesCountry && matchesPrice;
  });

  return (
    <>
      <Sidebar />

      <div className='p-4 flex flex-wrap justify-center items-center'>
        {filteredData.length > 0 && filteredData.map((product) =>
          <ProductCard key={product.id} product={product} />
        )}
      </div>
    </>
  )
}

export default App
