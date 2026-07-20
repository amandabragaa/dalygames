import { GameProps } from "@/utils/type/games";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { GameCard } from "@/components/GameCard";

async function getData(title: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${title}`,
    );
    return res.json();
  } catch (err) {
    return null;
  }
}

export default async function Search({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const games: GameProps[] = await getData(title);

  return (
    <main className="w-full text-black">
      <Container>
        <Input />

        <h1 className="text-black font-bold text-xl mt-8 mb-5">
          Veja o que encontramos na nossa base:
        </h1>
        {!games && <p>Este jogo não foi econtrado!</p>}

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games && games.map((item) => <GameCard key={item.id} data={item} />)}
        </section>
      </Container>
    </main>
  );
}
