# angular-services

# Setup

`npm install` - Will run bower

for Development, you may want to run `npm install yo generator-angular` which enables scaffolding and yeoman

## Build & development

Run `gulp` for building.
Run `gulp build` for production dist build (minified)
Run `gulp serve` for preview.
Run `gulp serve:prod` to test production dist build.

## Testing

Running `gulp test` will run the unit tests with karma.
-A new folder will be created in /test called `coverage`, which shows test coverage at a type and script level.

## Scaffolding

To create a new service, use `yo angular:service name-the-service`, replace "name-the-service" with the service name
You can use this same idea for a controller, route, directive, view, etc. see generator-angular yeoman generator for more details.
