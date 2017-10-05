# FAQs

## Jobs

**Q.** When my test fails, I can't don't see any failure messages in my logs.

**A.** You need to identify where in the process of running a job the failure occurred. From the **Timeline** >  **Jobs** view of the Argo Web UI, look for the left-most container or workflow that has a red circle. This indicates the part of the process that failed. For example, if the deployment step shows a red circle and there are no error messages in that log, this means the failure occurred earlier in the process. In this case, you could check an earlier step, such as the workflow logs to see what part of the YAML code failed.

**Q.** My YAML code failed on one of the parameters.

**A.** Your YAML code was grabbing something that wasn't created. Argo has YAML checker to verify that the YAML code is valid. The checkers are available from the Argo Developer CLI for Linux and Apple MacOS operating systems. Download this CLI from the Argo Web UI (**Navigation** > **Administration** > **Docs** > **Argo CLI**) or from the [Argo Install page](https://argoproj.github.io/argo-site/get-started/installation).

## Artifacts

**Q.** How does Argo manage artifacts that are produced by a job?

**A.** There are two ways Argo manages artifacts. Internally, the Argo system manages artifacts for you. Use the internal system when you only need to use them for an application. Create a name for each artifact and you can reference them in any workflow or job. The other method is to use an external storage system to manage your artifacts. This is useful when you need to distribute binary files. Argo is pre-integrated with the Nexus Repository for storing artifacts. For more information about integrating an artifact repo with Argo, see [Connecting an Artifact Repository to Argo](/../user_guide/configapplatixcluster/connectartifactrepo.md).

## Resource Usage

**Q.** How do I find out how much usage the Kubernetes cluster is using versus Argo in the AWS system?

**A.** Use the [Claudia](https://applatix.com/claudia/) application to learn where your resources are being consumed in AWS. For each AWS account, you have groups that you can view. Claudia allows you to create custom groups so you can view more specific subsets of the AWS cost and usage. You can view data as recent as the last few minutes instead of having to wait 12 hours before the next AWS report is available.

**Q.** Why should I run spot instances versus on-demand? Aren't spot instances more costly to run?

**A.** The proper use of spot instances in AWS can dramatically reduce your spend on running instances. To activate spot instances from Argo, see
[Enabling Spot Instances for a Kubernetes Cluster](/../user_guide/configapplatixcluster/managesystemsettings.md#enable-spot-instances).

**Q.** My workflow is failing and I'm getting this log message "`ax_gzip_ax: stdout: Cannot allocate memory`". How can I fix this?

**A.** For this type of message, Argo recommends that you increase the `mem_mib` setting in the corresponding container template. For an example, see [Container templates](/../yaml/container_templates.md).

## Installation

**Q.** I'm trying to reinstall Argo with different configuration settings but the re-installation fails to take my latest changes. How do I get Argo to accept my changes to the configuration settings?
 
**A.** When you rerun the Argo installer with the same cluster name without first uninstalling the cluster, Argo assumes you are trying to resume the failed install from where it left off. This is done to ensure that the installation is idempotent and can be retried multiple times. The Argo installer persists the installation settings and reuses them in subsequent installations of the cluster with the same name. (The settings are stored by cluster name in a S3 bucket.)
 
To reinstall Argo with new configuration settings, you must first uninstall Argo and then install it again with the new settings. Here's an example of the Argo Cluster CLI commands to do this:
 
```

$ argocluster uninstall --cluster-name <yourArgoName> --cloud-provider aws --cloud-profile default
 
$ argocluster install --cluster-name argo-cluster \
--cloud-provider aws \
--cloud-profile default \
--cluster-size small \
--cluster-type standard \
--cloud-region us-east-1 \
--cloud-placement us-east-1a \
--vpc-cidr-base 172.20 \
--subnet-mask-size 22 \
--trusted-cidrs 0.0.0.0/0 \
--user-on-demand-nodes 2 \
--spot-instances-option all \
--vpc-id <my-vpc-id>

```

For more details about the Cluster CLI commands, see [CLI for Managing Kubernetes Cluster from Argo](/../cli_reference.md)
