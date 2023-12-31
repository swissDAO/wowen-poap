import { useContractRead, useContractReads } from "wagmi";
import { CONTRACT_CONFIG } from "~/helpers/contract";
import { useIsMounted } from '../hooks/useIsMounted';

export default function Gallery() {
  const isMounted = useIsMounted();

  const totalSupply = useContractRead({
    ...CONTRACT_CONFIG,
    functionName: 'totalSupply',
  })

  const poaps = useContractReads({
    contracts: [...Array(Number(totalSupply.data) || 0).keys()].map((_, i) => ({
      ...CONTRACT_CONFIG,
      functionName: 'tokenURI',
      args: [i += 1]
    } as never))
  });

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-24 py-32">
        {isMounted && poaps?.data?.map((poap, i) => (
          <img key={i} src={String(poap.result)} className="rounded-lg" alt="" height={300} width={300} />
        ))}
      </div>
    </div>
  );
}
