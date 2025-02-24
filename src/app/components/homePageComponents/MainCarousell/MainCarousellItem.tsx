import React from "react";
import MainBtn from "../../MainBtn";
import Image from "next/image";

export type MainCarousellItemType = {
  image?: string;
  imageMobile: string | any;
  video?: string;
  videoPoster?: string;
  title: string;
  desc: string;
  link1?: {
    url: string;
    text: string;
  };
  link2?: {
    url: string;
    text: string;
  };
};

type MainCarousellItemProps = {
  item: MainCarousellItemType;
};

const MainCarousellItem = ({
  item: { image, video, title, desc, link1, link2, imageMobile, videoPoster },
}: MainCarousellItemProps) => {

  if(video && video !== null){

    return (
      <div className="h-full relative" style={{ minWidth: "100vw" }}>
          <>
            <video
              className="relative object-fill "
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={videoPoster ?? imageMobile}
              style={{
                height: "auto",
                minWidth: "100%",
                filter: "brightness(80%)",
              }}
            >
              <source
                className="absolute w-full h-full top-0 left-0"
                src={video}
                type="video/mp4"
              />
            </video>
          </>

          <div className="ml-44 absolute" style={{ top: "20%" }}>
            <h2 className="mb-4 uppercase font-bold lg:text-4xl xl:text-7xl text-white w-2/4">
              {title ?? "Triumph"}
            </h2>
            <p className="mb-4 w-2/4 text-white text-2xl font-semibold">
              {desc ?? "Triumph"}
            </p>
            <div className="flex gap-4">
              {link1 && (
                <MainBtn
                  text={link1.text ?? "Детали"}
                  bgBlack={false}
                  isLink={true}
                  link={link1.url}
                />
              )}
              {link2 && (
                <MainBtn
                  text={link2.text ?? "Детали"}
                  bgBlack={true}
                  isLink={true}
                  link={link2.url}
                />
              )}
            </div>
          </div>
        </div>
    )
  }

  return (
    <div
      className="relative"
      style={{
        minWidth: "100%",
        backgroundColor: '#2a2a2a',
        backgroundImage: `url('${image ?? "/images/triumphLogo.png"}')`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "calc(100vh - 64px)",
      }}
    >

        <div className="ml-44 absolute" style={{ top: "20%" }}>
          <h2 className="mb-4 uppercase font-bold lg:text-6xl xl:text-7xl text-white w-2/4">
            {title ?? "Triumph"}
          </h2>
          <p className="mb-4 w-2/4 text-white lg:text-xl xl:text-2xl font-semibold">
            {desc ?? "Triumph"}
          </p>
          <div className="flex gap-4">
            {link1 && (
              <MainBtn
                text={link1.text ?? "Детали"}
                bgBlack={false}
                isLink={true}
                link={link1.url}
              />
            )}
            {link2 && (
              <MainBtn
                text={link2.text ?? "Детали"}
                bgBlack={true}
                isLink={true}
                link={link2.url}
              />
            )}
          </div>
        </div>
    </div>
  );
};

export default MainCarousellItem;
