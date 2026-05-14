import { Link } from "react-router-dom";
import type { PokemonCardProps } from "../types/Interfases";
import { Card, CardContent,CardDescription,CardHeader, CardTitle } from "./ui/card";



export const PokemonCard = ({ name, url }: PokemonCardProps) => {
  const id = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link to={`/pokemon/${name}`} className="block">
      <Card className="transition-all hover:shadow-md hover:border-primary cursor-pointer">
        <CardHeader className="p-4">
          <CardTitle className="capitalize text-xl">{name}</CardTitle>
          <CardDescription># {id?.padStart(1, '0')}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-4">
          <img
            src={imageUrl}
            alt={name}
            className="w-32 h-32 object-contain"
          />
        </CardContent>
      </Card>
    </Link>
  );
};