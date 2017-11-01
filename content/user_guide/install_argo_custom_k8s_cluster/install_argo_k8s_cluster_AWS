


# Install Argo on AWS

You can install Argo on a Kubernetes cluster that runs on Amazon Web Services (AWS). This allows you to run Argo workflows, Kubernetes Deployments, and Argo deployments.

## Required Environment

This is the environment configuration for installing Argo on an existing Kubernetes cluster on AWS:

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

### Installing Argo on AWS

1. Install the command-line interface (CLI) for Argo using this command:

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

  Upon completing this step, you can now enter Development CLI commands on your Kubernetes cluster running in AWS.

2. From the Argo CLI, run `argo cluster`. (The `argo cluster ops >` prompt appears. You are now in the Argo Cluster Management mode.)

2. Enter the following command line to install Argo on the Kubernetes cluster:

 ```

 > argocluster install-argo-only --cloud-provider aws --cluster-name <name_of_kubernetes_cluster> --cloud-profile <aws_profile_name>  --cloud-region <aws_cloud_region> --cluster-bucket <name_of_S3_bucket> --kubeconfig /tmp/ax_kube/<name_of_kubeconfig_file>

 ```

 Where:
 * `--cluster-bucket` is the S3 bucket that stores the Argo metadata (configs) and artifacts. The bucket must be provisioned before you install Argo and be located in the same region as the Kubernetes cluster.
 * `--cluster-name` is the name of your cluster.
 * `--kube-config` is the Kubernetes configuration file from your existing cluster.

Once the installation completes, you will get the URL for Argo Web UI, an admin Uid and password to run Argo workflows.

## Uninstalling Argo

```

> argocluster uninstall-argo-only --kubeconfig /tmp/ax_kube/name_of_kube-config_for_argo_on_AWS>

```
