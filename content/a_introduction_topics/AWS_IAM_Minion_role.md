# IAM Role for Minion Nodes

The following IAM role example shows the access needed by Argo on Kubernetes minion nodes. You only need to specify the resources that you need. For example, if you are using volumes, specify the
`CreateVolume`, `DeleteVolume`, `DetachVolume` and `AttachVolume` actions.

 NOTE: For the bucket resource, replace `<my-bucket-name>` with the actual name of the S3 bucket you are using.

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
