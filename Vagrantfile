# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.cache.enable :npm

  config.vm.network "private_network", ip: "192.168.33.15"

  config.vm.provider "virtualbox" do |vb|
    # vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y nodejs-legacy npm mongodb
    npm install -g grunt-cli mocha nodemon node-mongo-seeds
    cd /vagrant
    seed
  SHELL
end
