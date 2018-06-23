const path = require('path');
const request = require('request-promise');
const loaderUtils = require('loader-utils');


module.exports = function (content) {

  // Set async mode & options
  const callback = this.async();
  const options = loaderUtils.getOptions(this) || {};
  const fontsPath = options.fontsPath || 'fonts';

  try {

    // Get icomoon project base url
    const icomoonProjectBaseUrl = content.split(`@import url('`)[1].split(`/style.css');`)[0];

    // Get icomoon css content
    request(`${icomoonProjectBaseUrl}/style.css`).then(content=> {

      // Get URL for each font file
      const urls = content.match(/url\(\'(.*?)\'\)/g).filter(i=>!i.includes('iefix')).map(i=>i.replace(`url('`, '').replace(`')`, ''));

      // Download all font files
      Promise.all(urls.map(url => request(url))).then(fontContents => {

        // Replace the public urls with local urls
        content = content.replace(new RegExp(icomoonProjectBaseUrl, 'g'), fontsPath);

        // Write every font file
        fontContents.forEach((fontContent, k) => {
          const fileName = urls[k].replace(icomoonProjectBaseUrl, '');
          this.emitFile(path.join(fontsPath, fileName), fontContent);
        });

        // Finish job with no errors
        callback(null, content);

      }).catch(err => {
        callback(err);
      });

    }).catch(err => {
      callback(err);
    });

  } catch(err) {
    callback(err);
  }

};
