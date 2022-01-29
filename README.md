# Containers workshop


## Containers and local development

Useful resources
 * [DockerFile reference][dockerfile]
 * [Docker Compose file reference][composefile]
 * [DockerFile best practices][dockerbp]
 * [Slides][slides]

### Tasks

1. Pull images
2. Try out nginx
 - expose port
 - mount volume
3. [Create a .Net][dotnetcreate] project in a container
 - mount volume
4. Run Postgres
5. Create a Docker project with compose to this solution
 - give parameters what you would use with docker cli
 - use service discovery
 - rebuild projects
 - start/stop/restart components
 - inject dev tools

[dotnetcreate]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new
[slides]: http://patakino.web.elte.hu/wsps-containers.pdf
[dockerbp]: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
[composefile]: https://docs.docker.com/compose/compose-file/
[dockerfile]: https://docs.docker.com/engine/reference/builder/
