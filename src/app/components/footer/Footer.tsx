"use client";
import BottomFoot from "./BottomFoot";
import DesktopFooter from "./DesktopFooter";
import MobileFooter from "./MobileFooter/MobileFooter";

export const footerLists = [
  {
    title: "Стартувај",
    items: [
      {
        id: 6,
        url: "/configure",
        text: "Конфигурирај",
      },
      {
        id: 7,
        url: "/dealer",
        text: "Контакт",
      },
    ],
  },
  {
    title: '"For the ride"',
    items: [
      {
        id: 8,
        url: "https://triumph-mediakits.com/en/news/news-listing.html",
        text: "Нoвости",
      },
    ],
  },
  {
    title: "За Сопственици",
    items: [
      {
        id: 11,
        url: "/owners/my-triumph-app",
        text: 'Мојата "Triumph" апликација',
      },
      {
        id: 12,
        url: "/owners/what3words",
        text: '"what3words"',
      },
      {
        id: 13,
        url: "/owners/your-triumph",
        text: 'Вашиот "Triumph"',
      },
    ],
  },
];

type FooterProps = {
  families: any[];
};

const Footer = ({ families }: FooterProps) => {
  if (families.length > 0) {
    return (
      <footer className="md:px-0 border-thin-gray md:pt-8 mt-8 md:mt-0 w-full md:w-10/12 m-auto">
        <div className="px-4 py-4">
          <DesktopFooter familyItems={families} />
          <MobileFooter familyItems={families} />
          <BottomFoot />
        </div>
      </footer>
    );
  } else {
    return "Loading";
  }
};

export default Footer;
