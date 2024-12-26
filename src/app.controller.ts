import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getRoutes() {
    const routes = [
      { route: { path: '/', method: 'get' } },
      { route: { path: '/loadouts', method: 'post' } },
      { route: { path: '/loadouts', method: 'get' } },
      { route: { path: '/loadouts/:uniqueId', method: 'get' } },
      { route: { path: '/loadouts/:id', method: 'put' } },
      { route: { path: '/loadouts/:id', method: 'delete' } },
      { route: { path: '/firing-modes', method: 'get' } },
      { route: { path: '/firing-modes/:id', method: 'get' } },
      { route: { path: '/firing-modes', method: 'post' } },
      { route: { path: '/firing-modes/:id', method: 'put' } },
      { route: { path: '/firing-modes/:id', method: 'delete' } },
      { route: { path: '/throwables/image/:id', method: 'post' } },
      { route: { path: '/throwables', method: 'post' } },
      { route: { path: '/throwables', method: 'get' } },
      { route: { path: '/throwables/:id', method: 'get' } },
      { route: { path: '/throwables/:id', method: 'put' } },
      { route: { path: '/throwables/:id', method: 'delete' } },
      { route: { path: '/traits', method: 'post' } },
      { route: { path: '/traits', method: 'get' } },
      { route: { path: '/traits/:id', method: 'get' } },
      { route: { path: '/traits/:id', method: 'put' } },
      { route: { path: '/traits/:id', method: 'delete' } },
      { route: { path: '/passives', method: 'get' } },
      { route: { path: '/passives/:id', method: 'get' } },
      { route: { path: '/passives', method: 'post' } },
      { route: { path: '/passives/:id', method: 'put' } },
      { route: { path: '/passives/:id', method: 'delete' } },
      { route: { path: '/primary-weapon/image/:id', method: 'post' } },
      { route: { path: '/primary-weapon', method: 'post' } },
      { route: { path: '/primary-weapon', method: 'get' } },
      { route: { path: '/primary-weapon/:id', method: 'get' } },
      { route: { path: '/primary-weapon/:id', method: 'put' } },
      { route: { path: '/secondary-weapon/image/:id', method: 'post' } },
      { route: { path: '/secondary-weapon', method: 'post' } },
      { route: { path: '/secondary-weapon', method: 'get' } },
      { route: { path: '/secondary-weapon/:id', method: 'get' } },
      { route: { path: '/secondary-weapon/:id', method: 'put' } },
      { route: { path: '/helmet/image/:id', method: 'post' } },
      { route: { path: '/helmet', method: 'post' } },
      { route: { path: '/helmet', method: 'get' } },
      { route: { path: '/helmet/:id', method: 'get' } },
      { route: { path: '/helmet/:id', method: 'put' } },
      { route: { path: '/armor/image/:id', method: 'post' } },
      { route: { path: '/armor', method: 'post' } },
      { route: { path: '/armor', method: 'get' } },
      { route: { path: '/armor/:id', method: 'get' } },
      { route: { path: '/armor/:id', method: 'put' } },
      { route: { path: '/cape/image/:id', method: 'post' } },
      { route: { path: '/cape', method: 'post' } },
      { route: { path: '/cape', method: 'get' } },
      { route: { path: '/cape/:id', method: 'get' } },
      { route: { path: '/cape/:id', method: 'put' } },
      { route: { path: '/auth/signup', method: 'post' } },
      { route: { path: '/auth/login', method: 'post' } },
    ];
    const formattedRoutes = routes.map((route) => ({
      path: route.route.path,
      method: route.route.method.toUpperCase(),
    }));

    return {
      endpoints: formattedRoutes,
    };
  }
}
