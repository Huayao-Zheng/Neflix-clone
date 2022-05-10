import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';

type Props = {
  products: Product[];
  selectedPlan: Product | null;
};

export const Table = ({ products, selectedPlan }: Props) => {
  console.log(products);

  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly Price</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#e50814]'
                  : 'text-[gray]'
              }
            `}
            >
              US{product.prices[0].unit_amount! / 100}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#e50814]'
                  : 'text-[gray]'
              }
            `}
            >
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#E50914]'
                  : 'text-[gray]'
              }`}
              key={product.id}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#E50914]'
                  : 'text-[gray]'
              }`}
              key={product.id}
            >
              {product.metadata.portability === 'true' && (
                <CheckIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
