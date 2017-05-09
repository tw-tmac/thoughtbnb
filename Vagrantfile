# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/xenial64"
  config.cache.enable :npm

  config.vm.network "private_network", ip: "192.168.33.15"

  config.vm.provider "virtualbox" do |vb|
    # vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y nodejs-legacy npm mongodb openjdk-8-jdk
    npm install -g grunt-cli mocha nodemon node-mongo-seeds
    cd /vagrant
    seed
  SHELL
end
