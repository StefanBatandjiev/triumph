"use client";
import { CustomizationColorType } from "@/app/types/HomeTypes/SharedTypes/types";
import {
  faBars,
  faChevronLeft,
  faChevronRight,
  faFloppyDisk,
  faPlus,
  faShareNodes,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import MainBtn from "../MainBtn";
import { handleBodyScrollWhenMenuIsOpen } from "../helpers/handleBodyScrollWhenMenuOpens";
import { useBreakpoint } from "../helpers/useBreakpoint";
import Garage from "./Garage";

type BottomFixedRibbonProps = {
  info: any;
};

const BottomFixedRibbon = ({ info }: BottomFixedRibbonProps) => {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isTextCopied, setIsTextCopied] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const [garage, setGarage] = useState<any[]>([]);
  const [isGarageVisible, setIsGarageVisible] = useState(false);

  const [isBikeInGarage, setIsBikeInGarage] = useState(Boolean(garage.find((bike) => bike.id === info.id)));

  const mobileSaveBtn = useRef<HTMLSpanElement>(null);

  const breakpoint = useBreakpoint();
  const router = useRouter();
  const pathname = usePathname()
  const colorQuery = useSearchParams().get("color") ?? "color1";

  const colorPrice = info.customizationColors.find(
    (color: CustomizationColorType) => color.colorCode === colorQuery
  ).price;

  useEffect(() => {
    if (breakpoint > 768) {
      setIsMobileMenuShown(false);
    }
  }, [breakpoint]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handlePreviousBtn = () => router.back();

  const handleMenu = () => {
    setIsMobileMenuShown(!isMobileMenuShown);
    handleBodyScrollWhenMenuIsOpen(isMobileMenuShown);
  };

  const handlePriceChange = (startingPrice: number) => {
    if (colorQuery !== null) {

      const finalPrice = startingPrice + colorPrice

      return finalPrice.toLocaleString('en-EN')
    }

    return startingPrice.toLocaleString('en-EN');
  };

  const getLinkForSharing = () => window?.location.href;

  const handleSaveBike = (bike: any) => {
    if (localStorage.getItem("garage") === null) {
      const createdGarage = [bike];

      localStorage.setItem("garage", JSON.stringify(createdGarage));
      toast.success("Моторот е зачуван во вашата гаража.");
      setGarage(createdGarage);
    } else {
      const garage = JSON.parse(localStorage.getItem("garage")!);

      const bikeIsFound = garage
        .slice()
        .find((bikeFromGarage: any) => bikeFromGarage.id === bike.id);

      if (Boolean(bikeIsFound)) {
        toast.error("Веќе го имате овој мотор во гаража.");
      } else {
        garage.push(bike);

        const updatedGarage = [...garage, bike];
        setGarage(updatedGarage);
        toast.success("Моторот е зачуван во вашата гаража.");
      }

      localStorage.setItem("garage", JSON.stringify(garage));
    }
  };

  useEffect(() => {
    const storedGarage = JSON.parse(localStorage.getItem("garage")!) || [];
    setGarage(storedGarage);
    
  }, []);

  useEffect(() => {
    setIsBikeInGarage(Boolean(garage.find((bike) => bike.id === info.id)))
  },[garage, info])

  // const getGarage = () => {
  //   if (localStorage.getItem("garage") === null) {
  //     return [];
  //   }

  //   return JSON.parse(localStorage.getItem("garage")!);
  // };

  const closeGarage = () => {
    setIsGarageVisible(false);
    handleBodyScrollWhenMenuIsOpen(isGarageVisible);
  };

  const handleDeleteBikeBtn = () => {
    setIsBikeInGarage(false)
  }


  if (breakpoint > 1000) {
    return (
      <>
        <Toaster
          containerStyle={{
            position: "absolute",
            top: 70,
            left: 70,
          }}
        />
        <section
          className="fixed bottom-0 left-0 right-0 flex justify-between border-t-2 gray-300"
          style={{
            transition: "transform 0.3s ease-in-out",
            transform: visible ? "" : "translateY(100%)",
          }}
        >
          <button
            className="py-6 px-4 font-semibold text-neutral-800 light-gray-bg hover:bg-neutral-600 hover:text-neutral-900 transition-colors ease-in-out delay-50 basis-3/12"
            onClick={handlePreviousBtn}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              color="38 38 38"
              size="2xs"
              className="pr-2"
            />
            НАЗАД
          </button>
          <button
            disabled={isBikeInGarage}
            className={`${
              isBikeInGarage ? "bg-neutral-200" : "bg-white"
            } basis-2/12 flex flex-col items-center justify-center text-lg text-neutral-600`}
            onClick={(e) => {
              handleSaveBike(info);
              // e.currentTarget.innerText = "Зачувано";
            }}
          >
            <FontAwesomeIcon icon={faFloppyDisk} color="black" size="lg" />
            {isBikeInGarage ? "Зачувано" : "Зачувај"}
          </button>
          <button
            className={`bg-white basis-2/12 flex flex-col items-center justify-center text-lg border-x-2 border-gray-300 text-neutral-600`}
            onClick={() => setIsGarageVisible(!isGarageVisible)}
          >
            <FontAwesomeIcon icon={faWarehouse} color="black" size="lg" />
            Моја Гаража
          </button>
          <button
            className="bg-white basis-2/12 flex flex-col items-center justify-center text-lg text-neutral-600"
            onClick={() => {
              setIsModalShown(true);
              handleBodyScrollWhenMenuIsOpen(isModalShown);
            }}
          >
            <FontAwesomeIcon icon={faShareNodes} color="black" size="lg" />
            Сподели
          </button>
          <div className="basis-3/12 bg text-white justify-between items-center flex">
            <button className="flex justify-end items-center basis-1/3 group relative">
              <span className="hidden group-hover:inline absolute -top-20 py-2 text-xs gray-bg rounded-md font-medium">
                Цените може да варираат.
              </span>
                <FontAwesomeIcon icon={faInfoCircle} />
            </button>
            <div className="flex flex-col justify-center items-start basis-2/3 pl-5">
              <p className="text-sm">Цена</p>
              {info.price && (
                <p className="text-xl font-medium">
                  €{handlePriceChange(info.price)}
                </p>
              )}
              {info.price === null && (
                <p className="text-xl font-medium">Наскоро!!! </p>
              )}
            </div>
          </div>
          <Link
            className="basis-3/12 red-bg-color text-white red-bg-hover-color font-semibold flex"
            href={`/motorcycles/${info.category}/${info.subFamilyCategory}/${info.model}`}
          >
            <div className="flex justify-center items-center w-full h-full">
              <span>ДЕТАЛИ</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                color="white"
                size="2xs"
                className="pl-2"
              />{" "}
            </div>
          </Link>
        </section>

        {isModalShown && (
          <div className="absolute w-full top-0 left-0 h-screen flex justify-center items-center modal-blur">
            <div className="bg-neutral-200 flex flex-col justify-center gap-8 items-center p-8">
              <Image
                src={"/images/triumphLogo.png"}
                alt="Logo"
                width={100}
                height={100}
              />

              <div className="flex justify-between gap-2">
                <FacebookShareButton url={getLinkForSharing()}>
                  <FacebookIcon
                    className="rounded-full"
                    style={{ width: 40, height: 40 }}
                  />
                </FacebookShareButton>

                <TwitterShareButton url={getLinkForSharing()}>
                  <XIcon
                    className="rounded-full"
                    style={{ width: 40, height: 40 }}
                  />
                </TwitterShareButton>

                <ViberShareButton url={getLinkForSharing()}>
                  <ViberIcon
                    className="rounded-full"
                    style={{ width: 40, height: 40 }}
                  />
                </ViberShareButton>

                <WhatsappShareButton url={getLinkForSharing()}>
                  <WhatsappIcon
                    className="rounded-full"
                    style={{ width: 40, height: 40 }}
                  />
                </WhatsappShareButton>

                <EmailShareButton url={getLinkForSharing()}>
                  <EmailIcon
                    className="rounded-full"
                    style={{ width: 40, height: 40 }}
                  />
                </EmailShareButton>
              </div>

              <p className="font-bold text-2xl text-center">
                Или копирајте го следниот линк.
              </p>

              <p
                className={`font-bold text-sm text-center italic ${
                  isTextCopied ? "text-red-500" : "text-black"
                }`}
              >
                {isTextCopied
                  ? "Успешно го ископиравте линкот!"
                  : "Кликнете на линкот за да го ископирате."}
              </p>

              <input
                type="text"
                readOnly
                value={getLinkForSharing()}
                className="border-2 border-neutral-500 p-2 bg-white shadow rounded-md w-full"
                onClick={(e) => {
                  navigator.clipboard.writeText(e.currentTarget.value);
                  setIsTextCopied(true);
                }}
              />

              <button
                className={`red-bg-color main-btn-hover uppercase font-bold px-5 py-3 text-slate-100 text-base `}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBodyScrollWhenMenuIsOpen(isModalShown);
                  setIsModalShown(false);
                  setIsTextCopied(false);
                }}
              >
                Затвори
              </button>
            </div>
          </div>
        )}

        {isGarageVisible && (
          <Garage handleClose={closeGarage} handleBtn={handleDeleteBikeBtn}/>
        )}
      </>
    );
  }

  return (
    <>
      <Toaster
        containerStyle={{
          position: "absolute",
          zIndex: 99999,
          top: 50,
        }}
      />
      <section
        className="fixed bottom-0 left-0 right-0 flex justify-between border-t-2 gray-300"
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: visible ? "" : "translateY(100%)",
        }}
      >
        <button
          className="basis-2/12 light-gray-bg"
          onClick={() => {
            handleMenu();
          }}
        >
          <FontAwesomeIcon icon={faBars} color="black" size="xl" />
        </button>
        <div className="basis-5/12 bg text-white justify-start items-center flex">
          <button className="flex justify-end items-center basis-1/5 group">
            <span className="hidden group-hover:inline absolute -top-14 py-2 px-4 text-xs gray-bg rounded-md font-medium w-36" style={{left: '18%'}}>
              Цените може да варираат.
            </span>
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
          <div className="flex flex-col justify-center items-start basis-3/5 pl-2">
            <p className="text-xs">Цена</p>
            {info.price && (
              <p className="text-xl font-medium">
                €{handlePriceChange(info.price)}{" "}
              </p>
            )}
            {info.price === null && (
              <p className="text-xl font-medium">Наскоро!!! </p>
            )}
          </div>
        </div>
        <Link
          className="basis-5/12 red-bg-color text-white red-bg-hover-color font-semibold py-6"
          href={`/motorcycles/${info.category}/${info.subFamilyCategory}/${info.model}`}
        >
          <div className="flex justify-center items-center w-full h-full">
            <span>ДЕТАЛИ</span>
            <FontAwesomeIcon
              icon={faChevronRight}
              color="white"
              size="2xs"
              className="pl-2"
            />{" "}
          </div>
        </Link>
      </section>

      {isMobileMenuShown && (
        <section
          className="fixed z-100 bottom-0 left-0 right-0 h-screen w-screen bg-white flex flex-col justify-center overflow-hidden"
          style={{
            top: 64,
          }}
        >
          <div className="px-10 flex flex-col justify-start items gap-2">
            <button
              disabled={isBikeInGarage}
              className={`px-4 rounded-xl flex items-center justify-between text-lg text-neutral-600 py-3 ${
                isBikeInGarage ? "bg-neutral-300" : ""
              }`}
              onClick={(e) => {
                handleSaveBike(info);
              }}
            >
              <FontAwesomeIcon icon={faFloppyDisk} color="black" size="lg" />

              <span ref={mobileSaveBtn}>
                {isBikeInGarage ? "Зачувано" : " Зачувај"}
              </span>

              <FontAwesomeIcon icon={faPlus} color="black" size="lg" />
            </button>
            <button
              className="px-4 rounded-xl flex  justify-between text-lg text-neutral-600 py-3"
              onClick={() => {
                setIsGarageVisible(true);
                handleBodyScrollWhenMenuIsOpen(isGarageVisible);
              }}
            >
              <FontAwesomeIcon icon={faWarehouse} color="black" size="lg" />
              Гаража
              <FontAwesomeIcon icon={faChevronRight} color="black" size="lg" />
            </button>
            <button
              className="px-4 rounded-xl flex  justify-between text-lg text-neutral-600 py-3"
              onClick={() => {
                setIsModalShown(true);
                handleBodyScrollWhenMenuIsOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faShareNodes} color="black" size="lg" />
              Сподели
              <FontAwesomeIcon icon={faChevronRight} color="black" size="lg" />
            </button>
            <button
              className="red-bg-color py-4 text-white uppercase font-semibold rounded-xl"
              onClick={() => {
                setIsMobileMenuShown(false);
                handleBodyScrollWhenMenuIsOpen(isMobileMenuShown);
              }}
            >
              НАЗАД
            </button>
          </div>
        </section>
      )}

      {isModalShown && (
        <div
          className="absolute w-full top-0 left-0 bg-neutral-100 px-4 py-16 flex items-start justify-center"
          style={{ zIndex: 80, height: "100%" }}
        >
          <div className="flex gap-4 flex-col justify-center items-center">
            <Image
              src={"/images/triumphLogo.png"}
              alt="Logo"
              width={100}
              height={100}
            />

            <div className="flex justify-between gap-2">
              <FacebookShareButton url={getLinkForSharing()}>
                <FacebookIcon
                  className="rounded-full"
                  style={{ width: 40, height: 40 }}
                />
              </FacebookShareButton>

              <TwitterShareButton url={getLinkForSharing()}>
                <XIcon
                  className="rounded-full"
                  style={{ width: 40, height: 40 }}
                />
              </TwitterShareButton>

              <ViberShareButton url={getLinkForSharing()}>
                <ViberIcon
                  className="rounded-full"
                  style={{ width: 40, height: 40 }}
                />
              </ViberShareButton>

              <WhatsappShareButton url={getLinkForSharing()}>
                <WhatsappIcon
                  className="rounded-full"
                  style={{ width: 40, height: 40 }}
                />
              </WhatsappShareButton>

              <EmailShareButton url={getLinkForSharing()}>
                <EmailIcon
                  className="rounded-full"
                  style={{ width: 40, height: 40 }}
                />
              </EmailShareButton>
            </div>

            <p className="font-bold text-2xl text-center">
              Или ископирајте го овој линк.
            </p>
            <p
              className={`font-bold text-sm text-center ${
                isTextCopied ? "text-red-500" : "text-black"
              }`}
            >
              {isTextCopied
                ? "Успешно го ископиравте линкот!"
                : "Кликнете на линкот за да го ископирате."}
            </p>

            <input
              readOnly
              type="text"
              value={getLinkForSharing()}
              className="border-2 border-neutral-500 p-2 bg-white shadow rounded-md w-full"
              onClick={(e) => {
                navigator.clipboard.writeText(e.currentTarget.value);
                setIsTextCopied(true);
              }}
            />
            <MainBtn
              text={"Затвори"}
              bgBlack={false}
              action={() => {
                handleBodyScrollWhenMenuIsOpen(true);
                setIsModalShown(false);
                setIsTextCopied(false);
              }}
            />
          </div>
        </div>
      )}

      {isGarageVisible && (
        <Garage handleClose={closeGarage} handleBtn={handleDeleteBikeBtn}/>
      )}
    </>
  );
};

export default BottomFixedRibbon;
