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
    <div style={{ maxHeight: '500px' }}>
      {isMounted && poaps?.data?.map((poap, i) => (
        <img key={i} src={String(poap.result)} alt="" height={300} width={300} />
      ))}
    </div>
  );
}
