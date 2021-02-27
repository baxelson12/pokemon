import { PokemonService } from './pokemon.service.ts';

// get the port option
const portArg = Deno.args.find((arg) => arg.includes('--port'));
// pull the value out of the port option if it was supplied
const port = portArg ? parseInt(portArg.split('--port=')[1]) : undefined;
// start the pokemon service
new PokemonService(port).start();
