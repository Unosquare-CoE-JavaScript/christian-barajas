## NX CLI Commands

Thought it will be useful to save this commands:

To create a Library, Ex:
```sh
nx g lib core-state --parent-module=apps/dashboard/src/app/app.module.ts --routing --style=scss
nx g lib material --parent-module=apps/dashboard/src/app/app.module.ts --routing --style=scss
nx g lib ui-toolbar --style=scss
```

To create a Service, Ex:
```sh
nx g s services/widgets/widgets --project=core-data
nx g s services/items/items --project=core-data
```

To create a module, Ex:
```sh
nx g m routing --flat=true -m=app.module.ts
```

To create a Component, Ex:
```sh
nx g c widgets -m app.module.ts --style=scss 
nx g c widgets/widget-list -m app.module.ts --style=scss 
nx g c widgets/widget-details -m app.module.ts --style=scss
nx g c home -m app.module.ts --style=scss
nx g c toolbar/toolbar --project=ui-toolbar --style=scss 
```

To create Endpoints with NX and NestJS, Ex:
```sh
nx g @nestjs/schematics:resource widgets --type rest --crud true --source-root apps/api/src
```

To create a facade, Ex:
```sh
nx g @nrwl/angular:ngrx widgets --module=libs/core-state/src/lib/core-state.module.ts --directory widgets --defaults --facade
```
