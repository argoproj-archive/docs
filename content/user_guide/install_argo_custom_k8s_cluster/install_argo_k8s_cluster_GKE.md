


# Install Argo on GKE

You can install Argo on a Kubernetes cluster that runs on Google Container Engine (GKE). This allows you to run Argo workflows and Kubernetes Deployments on GKE. You cannot run Argo deployments on GKE.

## Required Environment
You must configure your GKE environment for these minimum resource requirements for installing Argo on an existing Kubernetes cluster:

* Minimum of two (2) nodes with (2 vCPUs and 7.5GB memory)
* Kubernetes version 1.6 or above
* One Google Cloud storage bucket in same region

### Installing Argo

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

  Upon completing this step, you can now enter Development CLI commands on your Kubernetes cluster running in GKE.

4. Enter the following command to run a preprocessing script against the kube configuration file:

   ```

   $ curl https://raw.githubusercontent.com/argoproj/argo/master/argo_preprocess_kubeconfig.sh -o /tmp/argo_preprocess_kubeconfig.sh
   $ chmod ugo+x /tmp/argo_preprocess_kubeconfig.sh
   $ /tmp/argo_preprocess_kubeconfig.sh ~/.kube/config ~/.kube/argo-gke-config

   ```
   NOTE: The preprocessing script is required because the installer runs in a Docker container, which does not have sufficient access to the normal gcloud authentication schemes that are available in the host environment.

1. From the Argo CLI, run `argo cluster`. (The `argo cluster ops >` prompt appears. You are now in the Argo Cluster Management mode.)

1. Run the following command to install Argo:


   ```

   > argocluster install-argo-only --cloud-provider gke --cluster-name <my-gke-cluster-name> --kubeconfig /tmp/ax_kube/<name_of_argo-gke-config> --cluster-bucket <MY_BUCKET_NAME> --bucket-endpoint https://storage.googleapis.com --access-key <MY_ACCESS_KEY> --secret-key <MY_SECRET_KEY>

   ```



Where `<name_of_argo-gke-config>` is the output of running the preprocessing script in step 4.

   NOTE: If you have not generated the Google access key or the secret key, log into the Google Cloud platform and navigate to **Storage** > **Settings** > **Interoperability** and click `Create a new key`.

Once the installation completes, you will get the URL for the Argo Web UI, an admin Uid and password to run Argo workflows.


## Uninstalling Argo

```

> argocluster uninstall-argo-only --kubeconfig /tmp/ax_kube/name_of_kube-config_for_argo_on_gke>

```
