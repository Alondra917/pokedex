import { Module } from '@nestjs/common';import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';



@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://pokeapi.co/api/v2/',
      timeout: 30000, 
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 1000,
      max: 100,
    }),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class AppModule {}