which node > /dev/null 2>&1
if [ $? -ne 0 ] ; then
  echo "command not found: node"
  echo "please install node. e.g. sudo port install nodejs"
  exit
fi

node app.js
