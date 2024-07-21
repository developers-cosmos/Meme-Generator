# Exported Chef Infra Repository for Policy 'MemeGen'

Policy revision: 3fb3615fcf51b4802e090ad3e52e3c5d3cd3d1cb38deb6c962ca1849bc120760

This directory contains all the cookbooks and configuration necessary for Chef
to converge a system using this exported policy. To converge a system with the
exported policy, use a privileged account to run `chef-client -z` from the
directory containing the exported policy.

## Contents:

### Policyfile.lock.json

A copy of the exported policy, used by the `chef push-archive` command.

### .chef/config.rb

A configuration file for Chef Infra Client. This file configures Chef Infra Client to
use the correct `policy_name` and `policy_group` for this exported repository. Chef
Infra Client will use this configuration automatically if you've set your working
directory properly.

### cookbook_artifacts/

All of the cookbooks required by the policy will be stored in this directory.

### policies/

A different copy of the exported policy, used by the `chef-client` command.

### policy_groups/

Policy groups are used by Chef Infra Server to manage multiple revisions of the same
policy. However, exported policies contain only a single policy revision, so
this policy group name is hardcoded to "local" and should not be changed.

