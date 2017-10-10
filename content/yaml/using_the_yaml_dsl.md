# Tutorials

The Argo tutorials take you through the creation of YAML templates for workflows and deployments of containerized apps running at scale in Argo. You'll learn how to run CI/CD workflows, deploy stateful and stateless applications, and also use external, non-containerized resources (fixtures) in your workflows.

You can access the YAML files for the tutorials from the Argo GitHub account under  the `.argo` directory of the [https://github.com/argoproj](https://github.com/argoproj) repo. If you modify a YAML file, Argo recommends that you use the command-line "syntax-and-consistency" checker to validate the YAML DSL definitions. From the Developer CLI, run `argo yaml validate <name_of_directory>`.

NOTE: Before you try out the tutorials, you must have installed Argo and integrated Argo with a [source repository](/../user_guide/configapplatixcluster/connectdockerhub-registry.md) and a [container registry](/../user_guide/configapplatixcluster/connectdockerhub-registry.md). By default, the Argo installation integrates with the [https://github.com/argoproj](https://github.com/argoproj) repo and the  [https://hub.docker.com/argoproj](https://hub.docker.com/argoproj) container registry.
