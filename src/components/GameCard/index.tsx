import Link from "next/link";
import Image from "next/image";
import { BiRightArrowCircle } from "react-icons/bi";
import { GameProps } from "@/utils/type/games";

interface GameCardProps {
  data: GameProps;
  prioridade?: boolean;
}

export function GameCard({ data, prioridade }: GameCardProps) {
  return (
    <Link href={`/game/${data.id}`}>
      <section className="w-full bg-slate-200 rounded-lg p-4 mb-5">
        <div className="relative w-full h-56 hover:scale-105 transition-all duration-300">
          <Image
            className="rouded-ls object-cover"
            src={data.image_url}
            alt={data.title}
            fill={true}
            priority={prioridade}
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm font-bold text-black px-2 text-ellipsis truncate whitespace-nowrap overflow-hidden">
            {data.title}
          </p>
          <BiRightArrowCircle size={24} color="#000" />
        </div>
      </section>
    </Link>
  );
}
