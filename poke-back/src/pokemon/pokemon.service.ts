import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}
 
  async getTypes() {
    try {
      const { data } = await firstValueFrom(this.httpService.get('type'));
      return data.results.map((t: any) => t.name);
    } catch (error) {
      throw new HttpException('Error al conectar con PokéAPI', HttpStatus.BAD_GATEWAY);
    }
  }
 
  async getPokemonDetail(nameOrId: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`pokemon/${nameOrId.toLowerCase()}`),
      );
      return data;
    } catch (error) {
      throw new HttpException('Pokémon no encontrado en el proxy', HttpStatus.NOT_FOUND);
    }
  }
 
  async getPokemonList(limit: number, offset: number) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`pokemon?limit=${limit}&offset=${offset}`),
      );
 
      // Procesa en lotes de 10 para no saturar la PokeAPI
      const LOTE = 10;
      const resultados: any[] = [];
 
      for (let i = 0; i < data.results.length; i += LOTE) {
        const lote = data.results.slice(i, i + LOTE);
 
        const detallesLote = await Promise.all(
          lote.map(async (poke: any) => {
            const detalle = await this.getPokemonDetail(poke.name);
            return {
              id: detalle.id,
              name: detalle.name,
              image: detalle.sprites.other['official-artwork'].front_default,
              types: detalle.types.map((t: any) => t.type.name),
            };
          }),
        );
 
        resultados.push(...detallesLote);
      }
 
      return resultados;
    } catch (error) {
      throw new HttpException(
        'Error al procesar la lista en el Proxy',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}