import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { wowen } from "~/helpers/chain";
import ABI from "../resources/ABI.json";

const Home: NextPage = () => {
  const { register, handleSubmit, formState: { isValid, errors } } = useForm({ mode: 'onBlur' });

  const { config } = usePrepareContractWrite({
    address: '0x0f88ed2ECD8C851Fa7bfc1D72E723c65a41eD652',
    chainId: wowen.id,
    abi: ABI,
    functionName: 'safeMint',
  });

  const { write } = useContractWrite(config);

  const onSubmit = () => {
    write?.();
  }

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-1/3 p-4 md:p-8 rounded-2xl border border-rtm-black-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email", {
              required: true,
              pattern: {
                value: /[^\s@]+@[^\s@]+\.[^\s@]+/gi,
                message: 'Please provide a valid email.',
              },
            })} type="email" placeholder="Enter your email address" className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500 !border-rtm-black-100 !border-t-rtm-black-100 text-base !text-rtm-green-400 focus:!border-rtm-green-400 focus:!border-t-rtm-green-400" />

            {errors.email?.type === 'required' && <span>This field is required</span>}

            {errors.email?.type === 'pattern' && (
              <span>
                <>{errors.email?.message}</>
              </span>
            )}

            <button disabled={!isValid} className="align-middle select-none font-sans transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none px-6 shadow-blue-500/20 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none normal-case text-base text-center font-bold rounded-lg cursor-pointer hover:shadow-rtm-green-400/30 shadow-none py-4 text-white bg-wowen w-full" type="submit">
              <div className="flex items-center">
                <div className="flex justify-center w-full">
                  <p>Check Eligibility</p>
                </div>
              </div>
            </button>

            <button onClick={() => write?.()} className="align-middle select-none font-sans transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none px-6 shadow-blue-500/20 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none normal-case text-base text-center font-bold rounded-lg cursor-pointer hover:shadow-rtm-green-400/30 shadow-none py-4 text-white bg-wowen w-full" type="button">
              <div className="flex items-center">
                <div className="flex justify-center w-full">
                  <p>Mint POAP</p>
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
