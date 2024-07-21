# custom resource name
resource_name :Meme_Generator

# required properties
property :instance_name, String, name_property: true

# creates Meme_Generator application
action :create do

    # creating directory for our application
    directory node['MemeGen']['web_server']['new_directory'] do
        recursive true
        action :create
    end

    # install initial requirements
    bash 'install_requirements' do
        code <<-EOH

        sudo yum install git -y
        sudo yum install -y python3
        sudo yum install python3-pip
        sudo yum install firewalld
        sudo systemctl enable firewalld
        EOH
    end

    # set-up project directory to clone the repository
    bash 'setup_directory' do
        code <<-EOH
        cd /
        sudo git clone #{node['MemeGen']['web_server']['git_url']}
        sudo mv #{node['MemeGen']['web_server']['repo_name']}/* #{node['MemeGen']['web_server']['new_directory']}/
        sudo rm -r #{node['MemeGen']['web_server']['repo_name']}/
        cd #{node['MemeGen']['web_server']['new_directory']}
        EOH
    end

    # install required packages
    bash 'python_packages' do
        code <<-EOH
        cd /#{node['MemeGen']['web_server']['new_directory']}
        sudo pip3 install -r requirements.txt
        EOH
    end

    # opening the given port
    bash 'open_port' do
        code <<-EOH
        sudo firewall-cmd --zone=public --add-port=#{node['MemeGen']['web_server']['port']}/tcp --permanent
        sudo firewall-cmd --reload
        EOH
    end

    # creating a service for our application
    template  node['MemeGen']['web_server']['conf_path'] do
        source 'myservice.service.erb'
        variables(
          username: node['MemeGen']['web_server']['username'],
          instance_name: new_resource.instance_name,
          port: node['MemeGen']['web_server']['port']
        )
        action :create
    end

    # starting a service
    service "memegen" do
        action [:start]
    end
end

# stop the service
action :delete do
    service "MemeGen-#{new_resource.instance_name}" do
        action [:stop]
    end
end