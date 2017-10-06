# CLI to Manage Kubernetes Cluster from Argo

NOTE: The basic CLI commands for managing a Kubernetes cluster from Argo ("Cluster CLI") are listed below. Each Cluster CLI command also has options you can specify. For details about these options, check out the Cluster CLI's  online help.


## Launch shell for managing Kubernetes Cluster from Argo

Point to the directory where you installed Argo and enter the following command:

```

$ argo cluster

```

After you enter this command, the prompt displays `argo cluster ops>` which means you are in the shell for managing a Kubernetes cluster from Argo.

## <a name="InstallCmdOptions"></a>Install

Installs an Argo cluster based on given configurations.
<!--from Harry; After the cluster is installed, Argo generates an initial access credential and creates an Argo CLI configuration file, which is named as "<cluster-name>-<cluster-id>".-->


```

> argocluster install --cluster-name <yourClusterName>

```


## <a name="UninstallCmdOptions"></a>Uninstall

Uninstalls a Kubernetes cluster and cleans up all cluster-related resources in your cloud provider based on the options you provide.

NOTE: You may need to manually delete the S3 bucket as it is shared by all clusters in your cloud provider account.


```

> argocluster uninstall --force-uninstall --cluster-name <yourClusterName>

```

## <a name="UpgradeCmdOptions"></a>Upgrade

Upgrades a Kubernetes cluster to a target version of Argo. 

<!--from Harry; Currently some important software, i.e. Kubernetes binaries, Kubernetes salt come with the cluster manager container from where you runs the install. You can set the Argo service software namespace / version through exporting environment variables.-->

```

> argocluster upgrade --cluster-name <yourClusterName>

```


## <a name="PauseCmdOptions"></a>Pause

Tears down unnecessary resources from cloud provider, while making sure your Kubernetes cluster can recover to the state before it was paused. Pausing a cluster helps you minimize the amount that the cloud provider charges, such as lessening the cost of persistent volumes or S3 object storage. 

```

> argocluster pause --cluster-name <yourClusterName>

```

## <a name="ResumeCmdOptions"></a>Resume

Restores a paused Kubernetes cluster to its previous state before pausing. After resuming, the cluster has the same software version, the same configurations for node, network, and security. All applications or jobs that were paused are also restarted.

```

> argocluster resume --cluster-name <yourClusterName>

```

## Restart

Restarts a Kubernetes cluster.

```

> argocluster restart --cluster-name <yourClusterName>

```
