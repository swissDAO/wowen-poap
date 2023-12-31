import { type NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { CONTRACT_CONFIG } from "~/helpers/contract";

type EmailFormData = {
  email: string;
};

type Props = {
  attendees: { emails: string[] };
}

export function getStaticProps() {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      attendees: JSON.parse(`{"emails": ${process.env.NEXT_PUBLIC_EMAILS!}}`) as string[],
    },
  }
}

const Home: NextPage<Props> = ({ attendees }: Props) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const { isConnected } = useAccount();

  const { register, handleSubmit, formState: { isValid, errors } } = useForm<EmailFormData>({ mode: 'onBlur' });

  const { config } = usePrepareContractWrite({
    ...CONTRACT_CONFIG,
    functionName: 'safeMint',
  });
  const contractWrite = useContractWrite(config);

  useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onSuccess: () => toast.success('POAP has been minted!')
  });

  const onSubmit: SubmitHandler<EmailFormData> = ({ email }: EmailFormData) => {
    if (!attendees.emails.includes(email)) {
      toast('You are not eligable to mint!');
      return;
    }

    contractWrite.write?.();
    toast.success('POAP is minting!')
  }

  useEffect(() => {
    if (!isConnected) toast('Please connect your Wallet!');
    setIsWalletConnected(isConnected);
  }, [isConnected])

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="w-1/3 p-4 md:p-8 rounded-2xl border border-rtm-black-100">
          <div className="p-4 mb-4 text-sm">
            <div>
              <span className="font-medium">Ensure that these requirements are met:</span>
              <ul className="mt-1.5 ml-4 list-disc list-inside">
                <li><Link className="underline hover:text-highlight" href="https://www.wowen.io/home/" target="_blank">You have a managed wowen address</Link></li>
                <li><Link className="underline hover:text-highlight" href="https://www.wowen.io/home/faucet" target="_blank">You have wowen test tokens WOWn</Link></li>
              </ul>
            </div>
          </div>

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email", {
              required: true,
              pattern: {
                value: /[^\s@]+@[^\s@]+\.[^\s@]+/gi,
                message: 'Please provide a valid email.',
              },
            })}
              type="email"
              placeholder="Enter your email address"
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500 !border-rtm-black-100 !border-t-rtm-black-100 text-base !text-rtm-green-400 focus:!border-rtm-green-400 focus:!border-t-rtm-green-400"
            />

            {errors.email?.type === 'required' && <span>This field is required</span>}

            {errors.email?.type === 'pattern' && (
              <span>
                <>{errors.email?.message}</>
              </span>
            )}

            <button disabled={!(isValid && isWalletConnected)} className="mt-4 align-middle select-none font-sans transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none px-6 shadow-blue-500/20 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none normal-case text-base text-center font-bold rounded-lg cursor-pointer hover:shadow-rtm-green-400/30 shadow-none py-4 text-white bg-wowen w-full" type="submit">
              <div className="flex items-center">
                <div className="flex justify-center w-full">
                  <p>Mint</p>
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>

      <Toaster richColors />
    </>
  );
};

export default Home;
