import { FC } from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

interface Props {
  item: Contact;
}

const CardContact: FC<Props> = ({ item }) => {
  return (
    <div className="shadow-md bg-white rounded-2xl px-6 pt-4 pb-9 flex flex-col items-center">
      <img
        loading="lazy"
        src={
          item?.photo === "N/A"
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQQW8evYocVJa_sUjRKucO4U6qTPHmRLWeIixsej2Jlg&s"
            : item?.photo
        }
        alt="card-contact-img"
        className="w-24 h-24 rounded-full object-cover"
      />
      <div className="mt-2 text-center w-full">
        <p className="font-bold text-lg text-primary">
          {item?.firstName} {item?.lastName}
        </p>
        <p className="text-orange-300 text-sm mb-4">{item?.age} years old</p>
        <Link to={`/contact?id=${item?.id}`}>
          <Button className="w-full">Detail</Button>
        </Link>
      </div>
    </div>
  );
};

export default CardContact;
