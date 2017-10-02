# Development CLI

Use these commands to execute the common tasks of running workflows and applications on a Kubernetes cluster.

### Log into Argo

 ```

 $ ./argo login

 ```

After you enter this command, the interactive prompt displays the following:

 ```
 Enter a configuration name (default):
 Enter cluster URL: <cluster_URL>
 Enter cluster username: <email_address_of_cluster_user>
 Enter cluster password: <password>
 Config written to: <path_to_config>

 ```
You are now ready to use the Argo development CLI commands.

### Submitting a Job
* **Using a template from a repo branch**

 ```
 $ argo job submit <Argo_YAML_template_name> --argument "parameters.<INPUT_PARAMETER_PATH>" --branch <NAME_OF_BRANCH> --repo <URL_of_Repository>

 ```

* **Using a local template**

 ```
  $ argo job submit  <Argo_YAML_template_name> --local

 ```  

### Get ID for the Job You Submitted

 ```

 $ argo job list --submitter <user_name>

 ```

### Get a list of all jobs running on Argo

 ```

 $ argo job list --show-all

 ```

### Show status of a Job

 ```
 $ argo job show <job_ID>

 ```

### Show status of a workflow

 ```

 $ argo job show <job_ID> --tree

 ```

### Terminating a Job

 ```
 $ argo job kill <job_ID>

 ```  

### View the apps running on Argo and their status

 ```
 $ argo app list

 ```

### View the details for an app

 ```
 $ argo app show <name_of_app>

 ```

### View username/password/URL for Argo

 ```
 $ argo config show

 ```
### View logs

 ```
 $ argo job logs <job_ID>

 ```

### Changing configuration settings for Argo

 ```
 $ cd .argo

 ```

and open the configuration file you want to change.
