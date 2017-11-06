
# Installing Argo Workflow Engine on Kubernetes

This section covers the tasks for provisioning the Argo Workflow Engine on top of an existing Kubernetes cluster. Argo has been tested and certified for Kubernetes clusters running on Amazon Web Services (AWS), Google Container Engine (GKE) and Minikube.

The process for installing Argo is:

* Complete the Prerequisite
* Choose your install option
  - Minikube
  - GKE
  - AWS (for an existing or new Kubernetes cluster)
* Log into Argo


## Prerequisite

The Argo CLI must be installed to install Argo on any cluster. Here is the command to install Argo CLI:

  * For Mac

    ```
    curl -sSL -O https://s3-us-west-1.amazonaws.com/ax-public/argocli/stable/darwin_amd64/argo
    chmod +x argo
    ```
  * For Linux

    ```
    curl -sSL -O https://s3-us-west-1.amazonaws.com/ax-public/argocli/stable/linux_amd64/argo
    chmod +x argo
    ```

# Minikube

## Required Environment

You must configure your Minikube environment for these minimum resource requirements to install Argo on a Kubernetes cluster:

<!--Argo on Minikube has been tested on Mac OSX. Minikube was using the xhyve hypervisor.-->

* Minikube version 0.22.3
* Kubernetes version 1.7.5
* Minimum of 4GB of memory
* Access to the `kubeconfig` file for the cluster

## Installing Minikube and Argo

1. Install Minikube following the instructions [here](https://kubernetes.io/docs/tasks/tools/install-minikube/).

2. Start Minikube with at least 4 GB of memory.

   ```
   $ minikube start --memory 4096
   ```

5. Install Argo on the Kubernetes cluster with either Local Storage or External Storage.

    **Using Local Storage**

    Argo creates a local S3Proxy pod that writes data to a local volume.

    ```
    $ argo cluster
    argo cluster ops> argocluster install-argo-only --cloud-provider minikube --cluster-name <name_of_kubernetes_cluster> --kubeconfig /tmp/ax_kube/<name_of_kubeconfig_file>
      ```
    **Using External Storage**

    Using Amazon S3 or Google Cloud Storage.

    ```
    $ argo cluster
    argo cluster ops> argocluster install-argo-only --cloud-provider minikube --cluster-name <name_of_kubernetes_cluster> --kubeconfig /tmp/ax_kube/<name_of_kubeconfig_file> --access-key <my_access_key> --secret-key <my_secret_key> --bucket-endpoint https://storage.googleapis.com --cluster-bucket <my_bucket_name>
    ```
6. After the installation completes, launch the Argo Web UI by running this command:

    ```
    $ minikube service -n axsys axops
    ```

# GKE

## Required Environment

You must configure your GKE environment for these minimum resource requirements to install Argo on a Kubernetes cluster:

* Minimum of two (2) nodes with (2 vCPUs and 7.5GB memory)
* Kubernetes version 1.6 or above
* One Google Cloud storage bucket in same region

## Installing Argo on GKE

1. Enter the following command to run a preprocessing script against the kube configuration file:

   ```
   $ curl https://raw.githubusercontent.com/argoproj/argo/master/argo_preprocess_kubeconfig.sh -o /tmp/argo_preprocess_kubeconfig.sh
   $ chmod ugo+x /tmp/argo_preprocess_kubeconfig.sh
   $ /tmp/argo_preprocess_kubeconfig.sh ~/.kube/config ~/.kube/argo-gke-config
   ```
   NOTE: The preprocessing script is required because the installer runs in a Docker container, which does not have sufficient access to the normal gcloud authentication schemes that are available in the host environment.

1. Enter the following command line to install Argo on the Kubernetes cluster:

   ```
   $ argo cluster
   argo cluster ops> argocluster install-argo-only --cloud-provider gke --cluster-name <my-gke-cluster-name> --kubeconfig /tmp/ax_kube/<name_of_argo-gke-config> --cluster-bucket <MY_BUCKET_NAME> --bucket-endpoint https://storage.googleapis.com --access-key <MY_ACCESS_KEY> --secret-key <MY_SECRET_KEY>
   ```
   Where `<name_of_argo-gke-config>` is the output of running the preprocessing script in step 1.

   NOTE: If you have not generated the Google access key or the secret key, log into the Google Cloud platform and navigate to **Storage** > **Settings** > **Interoperability** and click `Create a new key`.



# AWS

## Required Environment

You must configure your AWS environment for these minimum resource requirements:

* Minimum of two (2) m3.large minion nodes
* Kubernetes version 1.6 and above
* One S3 bucket in same region (NOTE: You must provision the bucket before you install Argo. The bucket stores the metadata and artifacts that an Argo workflow generates.)
* Additional [AWS resources](../../a_introduction_topics/Min_Req_AWS_Resources_4_Argo.md) that Argo requires
* IAM role permissions as defined [here](../../a_introduction_topics/AWS_IAM_Minion_role.md).
* Access to the `kubeconfig` file for the cluster

  NOTE: If you do not have this file, enter the following command to export the kubeconfig of your existing cluster:

  ```
  $ KUBECONFIG=$HOME/.kube/cluster_my_kops_cluster.conf kops export kubecfg --name <name_of_cluster>
  ```
<!--  Where `KUBECONFIG` is the name of the environmental variable that exists while kops or kubectl runs.-->

## Installing Argo on existing Kubernetes cluster on AWS

Enter the following command line to install Argo on the Kubernetes cluster:

 ```
 $ argo cluster
 argo cluster ops> argocluster install-argo-only --cloud-provider aws --cluster-name <name_of_kubernetes_cluster> --cloud-profile <aws_profile_name>  --cloud-region <aws_cloud_region> --cluster-bucket <name_of_S3_bucket> --kubeconfig /tmp/ax_kube/<name_of_kubeconfig_file>
 ```

## Installing Argo and Kubernetes cluster on AWS

Enter the following command line to install Argo on a new Kubernetes cluster:

 ```
 $ argo cluster
 argo cluster ops> argocluster install
 ```

#### Argo is now installed. You now have the URL for Argo Web UI, an admin Uid and password to run Argo workflows.

# Log into Argo

1. Enter this command to log into Argo from the CLI:

  ```
  $ ./argo login
  ```

2. Enter the appropriate value for each interactive prompt:

  ```
  Enter a configuration name (default):
  Enter cluster URL: <cluster_URL>
  Enter cluster username: <email_address_of_cluster_user>
  Enter cluster password: <password>
  Config written to: <path_to_config>
  ```

# Run the Sample Workflows

  To run sample workflows on Argo, clone them from the following Argo repos and submit the workflows using the respective Argo CLI commands:

  * InfluxDB build/test workflow [repo](https://github.com/argoproj/influxdb): `argo job submit 'InfluxDB CI' --local`
  * Selenium test workflow [repo](https://github.com/argoproj/appstore): `argo job submit 'Selenium Demo' --local`
  * Docker-In-Docker usage example [repo](https://github.com/argoproj/example-dind): `argo job submit 'example-build-using-dind' --local`


# Uninstalling Argo

On existing Kubernetes cluster on AWS, GKE, or Minikube

```
 argo cluster ops> argocluster uninstall-argo-only --kubeconfig /tmp/ax_kube/name_of_kube-config_for_argo_on_Minikube>
```
On new Kubernetes cluster on AWS

```
 argo cluster ops> argocluster uninstall
```
