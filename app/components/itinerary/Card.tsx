"use client";

import { SafeCard } from "@/types";
import Image from "next/image";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { RiDraggable } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CardProps {
  card: SafeCard;
  index: number;
  cards: SafeCard[];
}

const Card: React.FC<CardProps> = ({ card, index, cards }) => {
  console.log("current card:", card);
  console.log("all cards:", cards);

  const found = cards.find((item) => item.id == card.id);

  const [toggleDelete, setToggleDelete] = useState(false);
  const router = useRouter();
  const [timeSlot, setTimeSlot] = useState({
    stb: card.startTime?.slice(0, 2),
    ste: card.startTime?.slice(2, 4),
    etb: card.endTime?.slice(0, 2),
    ete: card.endTime?.slice(2, 4),
  });

  const handleDelete = () => {
    axios
      .delete("/api/removeCard", {
        data: { cardId: card.id, itinId: card.itineraryId },
      })
      .then(() => {
        toast.success("Card Removed");
        window.location.reload();
        router.refresh();
      })
      .catch((error: any) => {
        toast.error(error);
      });
  };

  const handleStartFirst = (slot: string, value: string) => {
    setTimeSlot((prev) => ({ ...prev, [slot]: value }));
  };
  useEffect(() => {
    axios.post("/api/updateCardTime", {
      data: { cardId: card.id, timeSlot: timeSlot, itinId: card.itineraryId },
    });
  }, [timeSlot]);

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="flex flex-col sm:flex-row w-full gap-3 sm:gap-6"
          >
            <div className="flex items-center w-[100px]  bg-cusGrayBg/30 border-[1px] border-cusBorder text-cusText px-3 py-2 text-xs rounded-2xl">
              <select
                onChange={(e) => handleStartFirst("stb", e.target.value)}
                value={timeSlot.stb}
                id="hours"
                name="hours"
                className="appearance-none bg-transparent text-cusText border-transparent  focus:outline-none focus:border-transparent focus:ring-0"
              >
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
              </select>
              <div>:</div>
              <select
                onChange={(e) => handleStartFirst("ste", e.target.value)}
                value={timeSlot.ste}
                id="minutes"
                name="minutes"
                className="appearance-none bg-transparent focus:outline-none border-transparent focus:border-transparent focus:ring-0"
              >
                <option value="00">00</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <div>-</div>
              <select
                onChange={(e) => handleStartFirst("etb", e.target.value)}
                value={timeSlot.etb}
                id="hours"
                name="hours"
                className="appearance-none bg-transparent text-cusText border-transparent  focus:outline-none focus:ring-0"
              >
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
              </select>
              <div>:</div>
              <select
                onChange={(e) => handleStartFirst("ete", e.target.value)}
                value={timeSlot.ete}
                id="minutes"
                name="minutes"
                className="appearance-none bg-transparent focus:outline-none border-transparent focus:border-transparent focus:ring-0"
              >
                <option value="00">00</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex items-center gap-2 justify-between w-full">
              <div className=" relative w-[50px] h-[50px]">
                {found ? (
                  <Image
                    src={found?.listing.images[0].url}
                    alt="List Item Image"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={"/placeholder.png"}
                    alt="List Item Image"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <div>{card.listing.title}</div>
                <div className="text-cusText">{card.listing.description}</div>
              </div>
              <div
                className="cursor-pointer relative"
                onClick={() => setToggleDelete(!toggleDelete)}
              >
                <IoIosMore className="text-cusText/50 hover:text-cusText" />
                {toggleDelete && (
                  <div
                    className="absolute rounded-md p-2 bg-red-400/20 hover:bg-red-800 hover:text-red-400"
                    onClick={handleDelete}
                  >
                    <div>Delete</div>
                  </div>
                )}
              </div>
              <div
                {...provided.dragHandleProps}
                className="ml-auto cursor-move"
              >
                <RiDraggable
                  size={20}
                  className="text-cusText/30 hover:text-cusText"
                />
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Card;
