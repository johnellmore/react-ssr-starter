import { useLoader } from "../react/useLoader";

export async function ServerSideLoader() {
  // demonstrates fetching data from a remote source, like a database or an API
  const resp = await fetch("https://api.sampleapis.com/futurama/characters");
  const json: { name: { first: string; middle: string; last: string } }[] =
    await resp.json();
  const characters = json
    .map((c: any) => c.name)
    .map(({ first, middle, last }) => `${first} ${middle} ${last}`);
  return { characters };
}

export function ServerSideView() {
  const { characters } = useLoader<typeof ServerSideLoader>();
  return (
    <div>
      <h1>Server-side fetch</h1>
      <h2>Futurama characters</h2>
      <ul>
        {characters.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
