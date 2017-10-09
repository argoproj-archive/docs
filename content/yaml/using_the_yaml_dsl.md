# Tutorials

The Argo tutorials take you through the creation of YAML templates for workflows and deployments of containerized apps running at scale in Argo. The following examples show how to run CI/CD workflows, deploy stateful and stateless applications, and also use external, non-containerized resources (fixtures) in your workflows.

NOTE: All examples in these tutorials are available on the Argo GitHub account under  the `.argo` directory of the [https://github.com/argoproj](https://github.com/argoproj) repo. Argo also provides a syntax-and-consistency checker to validate the YAML DSL definitions. You can download the checker from the Argo Web UI (**Navigation** > **Administration** > **Docs** > **Argo CLI**) or from the [Argo Install page](https://argoproj.github.io/argo-site/get-started/installation).


## Prerequisites

Before you try out the tutorials, you must have installed Argo and integrated Argo with a [source repository](/../user_guide/configapplatixcluster/connectdockerhub-registry.md) and a [container registry](/../user_guide/configapplatixcluster/connectdockerhub-registry.md). By default, the Argo installation is automatically integrated with the [https://github.com/argoproj](https://github.com/argoproj) repo and the  [https://hub.docker.com/argoproj](https://github.com/argoproj) container registry.
