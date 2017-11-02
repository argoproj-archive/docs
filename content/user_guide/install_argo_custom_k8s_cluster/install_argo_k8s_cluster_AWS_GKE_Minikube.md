
# Installing Argo Workflow Engine on Kubernetes

This section covers the tasks for provisioning the Argo Workflow Engine on top of an existing Kubernetes cluster.
You can install Argo on a cluster that runs on Amazon Web Services (AWS), Google Container Engine (GKE) or Minikube. Here are the rules for which install environment you should use:

* If you want to run workflows only, use Minikube or AWS or GKE.
* If you want to run workflows, applications and deployments, use AWS or GKE.

# AWS

On AWS, you can run Argo workflows, Kubernetes Deployments, and Argo deployments.

## Required Environment

You must configure your AWS environment for these minimum resource requirements to install Argo on a Kubernetes cluster on AWS:

* Minimum of two (2) m3.large minion nodes
* Kubernetes version 1.6 and above
* One S3 bucket in same region (for Argo to store metadata and artifacts that are generated in a workflow)
* `kubeconfig` file for the cluster

  NOTE: If you do not have this file, enter the following command to export the kubeconfig of your existing cluster:

  ```

  $ KUBECONFIG=$HOME/.kube/cluster_my_kops_cluster.conf kops export kubecfg --name <name_of_cluster>

  ```
<!--  Where `KUBECONFIG` is the name of the environmental variable that exists while kops or kubectl runs.-->

* IAM role for minion nodes with appropriate permissions.

  The following IAM role example configures the minion nodes to access the functionality that Argo provides. You only need to specify the resources that you need. For example, if you are using volumes, specify the
`CreateVolume`, `DeleteVolume`, `DetachVolume` and `AttachVolume` actions.

 NOTE: For the bucket resource, replace `<my-bucket-name>` with the actual name of the bucket you are using.

 ```

 {
      "Version": "2012-10-17",
      "Statement": [
         {
             "Action": "s3:*",
             "Resource": [
                 "arn:aws:s3:::<my-bucket-name>",
                 "arn:aws:s3:::<my-bucket-name>/*",
                 "arn:aws:s3:::applatix-*",
                 "arn:aws:s3:::ax-public",
                 "arn:aws:s3:::ax-public/*"
             ],
             "Effect": "Allow"
         },
         {
             "Action": [
                 "ec2:Describe*",
                 "ec2:CreateVolume",
                 "ec2:DeleteVolume",
                 "ec2:AttachVolume",
                 "ec2:DetachVolume",
                 "ec2:ReplaceRoute",
                 "ec2:CreateSnapshot",
                 "ec2:DeleteSnapshot",
                 "ec2:AuthorizeSecurityGroupIngress",
                 "ec2:AuthorizeSecurityGroupEgress",
                 "ec2:RevokeSecurityGroupIngress",
                 "ec2:RevokeSecurityGroupEgress",
                 "ec2:RunInstances",
                 "ec2:TerminateInstances",
                 "ec2:AssociateAddress",
                 "ec2:CreateTags",
                 "ec2:CreateSecurityGroup",
                 "ec2:DeleteSecurityGroup",
                 "ec2:DescribeSecurityGroups"
             ],
             "Resource": "*",
             "Effect": "Allow"
         },
         {
             "Action": "route53:*",
             "Resource": "*",
             "Effect": "Allow"
         },
         {
             "Action": [
                 "autoscaling:DescribeAutoScalingGroups",
                 "autoscaling:DescribeAutoScalingInstances",
                 "autoscaling:SetDesiredCapacity",
                 "autoscaling:TerminateInstanceInAutoScalingGroup",
                 "autoscaling:UpdateAutoScalingGroup",
                 "autoscaling:DescribeLaunchConfigurations",
                 "autoscaling:CreateLaunchConfiguration",
                 "autoscaling:DeleteLaunchConfiguration",
                 "autoscaling:AttachLoadBalancers",
                 "autoscaling:DetachLoadBalancers"
             ],
             "Resource": "*",
             "Effect": "Allow"
         },
         {
             "Action": "elasticloadbalancing:*",
             "Resource": "*",
             "Effect": "Allow"
         },
         {
             "Action": "sts:AssumeRole",
             "Resource": "*",
             "Effect": "Allow"
         },
         {
             "Action": [
                 "iam:GetServerCertificate",
                 "iam:DeleteServerCertificate",
                 "iam:UploadServerCertificate"
             ],
             "Resource": "*",
             "Effect": "Allow"
         }
     ]
 }

 ```

## Installing Argo on AWS

1. Install the Argo CLI using this command:

  * For Mac

    ```

    curl -sSL -O https://s3-us-west-1.amazonaws.com/ax-public/argocli/stable/darwin_amd64/argo

    ```
  * For Linux

    ```

    curl -sSL -O https://s3-us-west-1.amazonaws.com/ax-public/argocli/stable/linux_amd64/argo
    chmod +x argo

    ```

2. Enter this command to log into Argo:

  ```

  $ ./argo login

  ```

3. Enter the appropriate value for each interactive prompt:

  ```

  Enter a configuration name (default):
  Enter cluster URL: <cluster_URL>
  Enter cluster username: <email_address_of_cluster_user>
  Enter cluster password: <password>
  Config written to: <path_to_config>

  ```

1. Enter `argo cluster`. (The `argo cluster ops >` prompt appears. You are now in the Argo Cluster Management mode.)

2. Enter the following command line to install Argo on the Kubernetes cluster:

 ```

 > argocluster install-argo-only --cloud-provider aws --cluster-name <name_of_kubernetes_cluster> --cloud-profile <aws_profile_name>  --cloud-region <aws_cloud_region> --cluster-bucket <name_of_S3_bucket> --kubeconfig /tmp/ax_kube/<name_of_kubeconfig_file>

 ```

 Where:
  * `--cluster-bucket` is the S3 bucket that stores the Argo metadata (configs) and artifacts. The bucket must be provisioned before you install Argo and be located in the same region as the Kubernetes cluster.
  * `--cluster-name` is the name of your cluster.
  * `--kube-config` is the Kubernetes configuration file from your existing cluster.

Once the installation completes, you will get the URL for Argo Web UI, an admin Uid and password to run Argo workflows.

# GKE

You can run Argo workflows and Kubernetes Deployments on GKE. You cannot run Argo deployments on GKE.

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

1. Install the Argo CLI using this command:

  * For Mac

    ```

    curl -sSL -O https://s3-us-west-1.amazonaws.com/ax-public/argocli/stable/darwin_amd64/argo

    ```
  * For Linux

    ```

    curl -sSL -O https://s3-us-west-1.amazonaws.com/ax-public/argocli/stable/linux_amd64/argo
    chmod +x argo

    ```

2. Enter this command to log into Argo:

  ```

  $ ./argo login

  ```

3. Enter the appropriate value for each interactive prompt:

  ```

  Enter a configuration name (default):
  Enter cluster URL: <cluster_URL>
  Enter cluster username: <email_address_of_cluster_user>
  Enter cluster password: <password>
  Config written to: <path_to_config>

  ```

1. From the Argo CLI, run `argo cluster`. (The `argo cluster ops >` prompt appears. You are now in the Argo Cluster Management mode.)

1. Run the following command to install Argo:

   ```

   > argocluster install-argo-only --cloud-provider gke --cluster-name <my-gke-cluster-name> --kubeconfig /tmp/ax_kube/<name_of_argo-gke-config> --cluster-bucket <MY_BUCKET_NAME> --bucket-endpoint https://storage.googleapis.com --access-key <MY_ACCESS_KEY> --secret-key <MY_SECRET_KEY>

   ```

  Where `<name_of_argo-gke-config>` is the output of running the preprocessing script in step 1.

   NOTE: If you have not generated the Google access key or the secret key, log into the Google Cloud platform and navigate to **Storage** > **Settings** > **Interoperability** and click `Create a new key`.

Once the installation completes, you will get the URL for the Argo Web UI, an admin Uid and password to run Argo workflows.

# Minikube

On Minikube, you can run Argo workflows and Kubernetes Deployments on Minikube. You cannot run Argo deployments on Minikube.

## Required Environment

You must configure your Minikube environment for these minimum resource requirements to install Argo on a Kubernetes cluster:

<!--Argo on Minikube has been tested on Mac OSX. Minikube was using the xhyve hypervisor.-->

* Minikube version 0.22.3
* Kubernetes version 1.7.5
* Minimum of 4GB of memory
* `kubeconfig` file for the cluster

## Installing Minikube and Installing Argo on Minikube

1. Install Minikube following the instructions [here](https://kubernetes.io/docs/tasks/tools/install-minikube/).

2. Start Minikube with at least 4 GB of memory.

 ```
 $ minikube start --memory 4096

 ```

1. Install the Argo CLI using this command:

  * For Mac

    ```

    curl -sSL -O https://s3-us-west-1.amazonaws.com/ax-public/argocli/stable/darwin_amd64/argo

    ```
  * For Linux

    ```

    curl -sSL -O https://s3-us-west-1.amazonaws.com/ax-public/argocli/stable/linux_amd64/argo
    chmod +x argo

    ```

2. Enter this command to log into Argo:

  ```

  $ ./argo login

  ```

3. Enter the appropriate value for each interactive prompt:

  ```

  Enter a configuration name (default):
  Enter cluster URL: <cluster_URL>
  Enter cluster username: <email_address_of_cluster_user>
  Enter cluster password: <password>
  Config written to: <path_to_config>

  ```

1. From the Argo CLI, run `argo cluster`. (The `argo cluster ops >` prompt appears. You are now in the Argo Cluster Management mode.)

5. Install Argo on the Kubernetes cluster with either Local Storage or External Storage.

  **Using Local Storage**

  Argo creates a local S3Proxy pod that writes data to a local volume.

  ```

  > argocluster install-argo-only --cloud-provider minikube --cluster-name <name_of_kubernetes_cluster> --kubeconfig /tmp/ax_kube/<name_of_kubeconfig_file>

  ```
  **Using External Storage**

  You want to use Minikube locally but store the artifacts generated by a workflow in a central sharable bucket such as Amazon S3 or Google Cloud Storage.
  You specify the bucket that Argo uses along with the given access key, secret key and endpoint. (Argo uses the bucket to store metadata and artifacts that are generated in a workflow.)

  ```
  > argocluster install-argo-only --cloud-provider minikube --cluster-name <name_of_kubernetes_cluster> --kubeconfig /tmp/ax_kube/<name_of_kubeconfig_file> --access-key <my_access_key> --secret-key <my_secret_key> --bucket-endpoint https://storage.googleapis.com --cluster-bucket <my_bucket_name>

  ```

6. After the installation completes, launch the Argo Web UI by running this command:

  ```
  $ minikube service -n axsys axops

  ```
After this, you can run Argo workflows.

# Uninstalling Argo

```

> argocluster uninstall-argo-only --kubeconfig /tmp/ax_kube/name_of_kube-config_for_argo_on_Minikube>

```
