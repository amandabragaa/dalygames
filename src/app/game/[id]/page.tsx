import Image from "next/image";
import { GameProps } from "@/utils/type/games";
import { Container } from "@/components/container";
import { BiRightArrowCircle } from "react-icons/bi";
import Link from "next/link";

async function getGame(id: number) {
  try {
    const idJogo = id;
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${idJogo}`,
    );

    const data = await res.json();

    return {
      ...data,
      release: data.release ?? data.data_release,
    };
  } catch (err) {
    return null;
  }
}

async function getDalyGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 320 } },
    );
    return res.json();
  } catch {
    throw new Error("Failed to fetch data");
  }
}

export default async function GameId({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const jogo: GameProps = await getGame(id);
  const dalyGame: GameProps = await getDalyGame();

  return (
    <main className="w-full">
      <div className="max-h-96 h-96 relative">
        <Image
          src={jogo.image_url}
          alt={jogo.title}
          priority={true}
          quality={100}
          fill={true}
          className="max-h-96 object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
        />
      </div>

      <Container>
        <h1 className="font-bold mt-4 mb-5">{jogo.title}</h1>

        <p>{jogo.description}</p>

        <div>
          <p className="font-bold mt-5 mb-3">Plataformas disponíveis:</p>
          <div className=" flex gap-2">
            {jogo.platforms.map((item, index) => (
              <p
                key={index}
                className="bg-slate-200 px-3 py-1 rounded-lg text-sm"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="font-bold mt-5 mb-3">Categorias:</p>
          <div className=" flex gap-2">
            {jogo.categories.map((item, index) => (
              <p
                key={index}
                className=" bg-slate-200 px-3 py-1 rounded-lg text-sm"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-5 mb-3">
          <p className="font-bold">Lançamento:</p>
          <p>{jogo.release}</p>
        </div>

        <p className="font-bold mt-5 mb-3">Outros jogos que recomendamos:</p>

        <Link href={`/game/${dalyGame.id}`}>
          <section className="w-full  bg-slate-200 rounded-lg p-4 mb-5">
            <div className="max-h-96 h-96 relative">
              <Image
                className="rouded-ls object-cover"
                src={dalyGame.image_url}
                alt={dalyGame.title}
                fill={true}
                priority={true}
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm font-bold text-black px-2 text-ellipsis truncate whitespace-nowrap overflow-hidden">
                {dalyGame.title}
              </p>
              <BiRightArrowCircle size={24} color="#000" />
            </div>
          </section>
        </Link>
      </Container>
    </main>
  );
}
