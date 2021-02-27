import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { RouterContext, Application } from 'https://deno.land/x/oak/mod.ts';
import { stub, Stub } from 'https://deno.land/x/mock/stub.ts';
import * as Colors from 'https://deno.land/std/fmt/colors.ts';

import { PokemonService } from './pokemon.service.ts';

const pokemonId = 2;
const nonMatchingPokemonId = 160;
const mockPokemon = {};
const mockPokemonDetailed = {
  test: 'test'
};

Deno.test('Service started on the default port.', async () => {
  validateServiceStarted(8080);
});

Deno.test('Service started on custom port.', async () => {
  validateServiceStarted(8585, 8585);
});

Deno.test('Create a PokemonService', () => {
  const service: PokemonService = new PokemonService();
  assertEquals(!!service, true);
});

Deno.test('Get all pokemon', () => {
  const service: PokemonService = new PokemonService();
  const ctx: RouterContext = {
    response: { body: '' }
  } as RouterContext;

  service.all(ctx);
  assertEquals((ctx.response.body as any[]).length, 151);
});

Deno.test('Get a specific pokemon -- success response', () => {
  const service: PokemonService = new PokemonService();
  const ctx: RouterContext = {
    params: {
      id: pokemonId
    } as any,
    response: {
      body: ''
    }
  } as RouterContext;

  service.get(ctx);
  assertEquals(ctx.response.status, 200);
  assertEquals((ctx.response.body as any).id, ctx.params.id);
});

Deno.test('Get a specific pokemon -- no ID', () => {
  validateGetError(undefined, 400, 'Please supply a pokemon id');
});

Deno.test('Get a specific pokemon -- no matching ID', () => {
  validateGetError(nonMatchingPokemonId, 404, undefined);
});

/**
 * Validates that the service is started
 *
 * @param expectedPort the port on which the service is expected to be started
 * @param port the port on which to start the service
 */
async function validateServiceStarted(
  expectedPort: number,
  port: number = 8080
) {
  const service: PokemonService = new PokemonService(port);
  const application: Application = service['application'];
  const listenStub: Stub<Application> = stub(application, 'listen', [
    new Promise<void>((resolve) => {
      resolve();
    })
  ]);

  const logStub: Stub<Console> = stub(console, 'log');

  await service.start();
  assertEquals(
    logStub.calls[0].args[0],
    Colors.blue(`Server running on port ${expectedPort}`)
  );
  listenStub.restore();
  logStub.restore();
}

/**
 * Validates the error response when performing a get for a specific pokemon
 *
 * @param id the pokemon id to be used in the context params
 * @param statusCode the expected status code
 * @param errorMessage the expected error message
 */
function validateGetError(
  id: number | undefined,
  statusCode: number,
  errorMessage: string | undefined
) {
  const service: PokemonService = new PokemonService();
  const context: RouterContext = {
    params: {
      id: id
    } as any,
    response: {}
  } as RouterContext;

  service.get(context);
  assertEquals(context.response.status, statusCode);
  assertEquals(context.response.body, errorMessage);
}
