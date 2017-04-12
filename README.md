# blogAPI
## How to deploy:
###### Note: this example is on an ubuntu 16.04 machine, and it is running as a local vm. There are 3 rows in the database that are used for testing purposes, they will be returned with a get request.
I have the default port for the server set to 3000. Change this anytime in server.js or another means of networking.

Dependencies:
###### git: 
    apt-get install -y git
###### node: 
    wget https://nodejs.org/dist/v6.9.5/node-v6.9.5-linux-x64.tar.xz
    mkdir node
    tar xvf node-v*.tar.?z --strip-components=1 -C ./node
    rm -rf node-v*
    mkdir node/etc
    echo 'prefix=/usr/local' > node/etc/npmrc
    sudo mv node /opt/
    sudo chown -R root: /opt/node
    sudo ln -s /opt/node/bin/node /usr/local/bin/node
    sudo ln -s /opt/node/bin/npm /usr/local/bin/npm
    node should now be installed, check by running 'node -v'
###### pm2: 
    sudo npm install -g pm2

###### download API:
    git clone git://github.com/cruxone/blogAPI.git

###### install npm packages:
    cd blogAPI
    npm install

###### run server and check response:
    node server.js
        output should say "connected to db, listening on port"
    On seperate terminal 'curl http://host:3000/posts'
        if there is data within the database, it will be displayed

###### start application with pm2:
    pm2 start server.js
    pm2 startup systemd
    run the next command with sudo privilege, in my case it was: 
        sudo env PATH=$PATH:/opt/node/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u crux --hp /home/crux

###### To ensure the server is running properly:
    on machine: 'curl http://localhost:3000/posts'
        if there is data within the database, it will be displayed
    on other machine: 'curl http://host:3000/posts'
        if there is data within the database, it will be displayed
