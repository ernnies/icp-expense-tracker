import { Fragment, useContext, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAccount, useSwitchChain } from "wagmi";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ArrowDown2 } from "iconsax-react";
import { toast } from "react-toastify";
import { config } from "../Wagmi";
import { avalancheFuji, sepolia } from "viem/chains";
import { SidebarContext } from "../context/SidebarContext";

function SwitchNetworkDropdown({ width }) {
  const { chain } = useAccount();
  const { chains, error, isLoading, pendingChainId, switchChain } =
    useSwitchChain();

  // console.log("configured chains include", chains, chain);

  async function handleSwitchChain() {
    const response = switchChain({ chainId: sepolia.id });
  }
  const { isXLM, userPubKey, selectedNetwork } = useContext(SidebarContext);

  useEffect(() => {
    if (error && error.message) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <Menu
      as="div"
      className={clsx(
        "relative inline-block text-left",
        width === "full" && "w-full"
      )}
    >
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              "flex gap-2 items-center p-1 pr-2.5 rounded-full text-sm font-medium border border-dark-300 transition-colors hover:bg-dark-300",
              width === "full" && "w-full",
              open ? "bg-dark-300" : "bg-dark-400"
            )}
          >
            {isXLM ? (
              <>
                <div className="bg-[#101115] p-1 rounded-full">
                  <img
                    className="w-6 h-6"
                    src={`/cryptoIcons/${2024}.svg`}
                    alt=""
                  />
                </div>
                <span className="lg:hidden xl:inline">{selectedNetwork}</span>
              </>
            ) : chain ? (
              <>
                <div className="bg-[#101115] p-1 rounded-full">
                  <img
                    className="w-6 h-6"
                    src={`/cryptoIcons/${chain?.id}.svg`}
                    alt=""
                  />
                </div>
                <span className="lg:hidden xl:inline">{chain?.name}</span>
              </>
            ) : (
              <>
                <div className="bg-[#101115] p-1 rounded-full">
                  <img
                    className="w-6 h-6"
                    src={`/cryptoIcons/wrong.svg`}
                    alt=""
                  />
                </div>

                <span>Wrong Network</span>
              </>
            )}

            <ArrowDown2
              size="16"
              color="#fff"
              className={clsx(
                "transition-transform will-change-transform ml-auto",
                !isXLM && open && "rotate-180"
              )}
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute right-0 z-10 w-56 py-1 mt-2 origin-top-right border rounded-md shadow-lg bg-dark-400 border-dark-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {!isXLM &&
                chains.map((x) => (
                  <Menu.Item key={x?.id}>
                    <button
                      disabled={!switchChain || x?.id === chain?.id}
                      // onClick={() => switchChain?.(x.id)}
                      onClick={() => switchChain({ chainId: x?.id })}
                      className={clsx(
                        "px-4 py-2 text-sm transition-colors flex items-center gap-2 w-full text-left hover:bg-dark-300",
                        !switchChain || (x?.id === chain?.id && "!hidden")
                      )}
                    >
                      <img
                        className="w-6 h-6"
                        src={`/cryptoIcons/${x?.id}.svg`}
                        alt=""
                      />
                      {x.name}
                      {isLoading && pendingChainId === x.id && " (switching)"}
                    </button>
                  </Menu.Item>
                ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

export default SwitchNetworkDropdown;
