import {
  Application,
  Router,
  RouterContext
} from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { v4 as UUID } from 'https://deno.land/std/uuid/mod.ts';
import * as Colors from 'https://deno.land/std/fmt/colors.ts';

export class PokemonService {
  private router: Router;
  private application: Application;
  private port: number;

  constructor(port: number = 8080) {
    this.router = new Router();
    this.router.get('/pokemon', this.all);
    this.router.get('/pokemon/:id', this.get);

    this.application = new Application();
    this.application.use(oakCors());
    this.application.use(this.router.routes());
    this.application.use(this.router.allowedMethods());

    this.port = port;
  }

  /**
   * Builds the response by setting the status and an optional response body
   *
   * @param context the router context containing the response object
   * @param status the status code of the response
   * @param body optional body to include in the response
   */
  private buildResponse = (
    context: RouterContext,
    status: number,
    body?: string | any | any[]
  ) => {
    context.response.status = status;
    context.response.body = body;
  };

  all = (ctx: RouterContext) => {
    this.buildResponse(ctx, 200, null);
  };

  get = (ctx: RouterContext) => {
    const id = ctx.params.id;

    this.buildResponse(ctx, 200, null);
  };

  /**
   * Starts the enrollee service
   */
  async start(): Promise<void> {
    console.log(Colors.blue(`Server running on port ${this.port}`));
    await this.application.listen({ port: this.port });
  }
}
