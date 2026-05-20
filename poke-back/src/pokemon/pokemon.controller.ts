import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
@UseInterceptors(CacheInterceptor)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // URL: http://localhost:3000/pokemon/types
  @Get('types')
  getTypes() {
    return this.pokemonService.getTypes();
  }

  // URL: http://localhost:3000/pokemon
  @Get()
  findAll(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.pokemonService.getPokemonList(Number(limit) || 151, Number(offset) || 0);
  }

  // URL: http://localhost:3000/pokemon/pikachu
  @Get(':nameOrId')
  findOne(@Param('nameOrId') nameOrId: string) {
    return this.pokemonService.getPokemonDetail(nameOrId);
  }
}