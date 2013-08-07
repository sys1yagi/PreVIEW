npm install
bower install

if [ -e review ]; then
  echo "review already exists."
else
  git clone https://github.com/kmuto/review.git
fi
