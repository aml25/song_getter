# song_getter

Use at your own risk.

To use:

  1. Clone repo
  2. Follow instructions at https://github.com/jamon/playmusic to get Google Play Music login working (_tip: you'll need to add a `data` parameter in `login({config}, function(err))`_)
  2. Open Terminal and navigate to `song_getter` parent folder
  3. Type `node server.js`
  4. If everything is working you should see a prompt for a search query. Be as specific as you want (e.g. "J Dilla Love")
  5. Console will then print the results with an index and a prompt for which track to select. Use the index to select track (hint: select the last number to search again)
  6. The track will then be downloaded to the `music` folder
  7. Upon prompt to search again, type "yes" or "no" to close the program
