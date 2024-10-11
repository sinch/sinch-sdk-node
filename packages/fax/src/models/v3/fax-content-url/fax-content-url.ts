/**
 * Give us any URL on the Internet (including ones with basic authentication) At least one file or contentUrl parameter is required.
 * Please note: If you are passing fax a secure URL (starting with https://), make sure that your SSL certificate (including your intermediate cert, if you have one) is installed properly, valid, and up-to-date.
 * If the file parameter is specified as well, content from URLs will be rendered before content from files.
 * You can add multiple URLs by adding them as an array them with a comma when posting as multipart/form-data
 * For example: "https://developers.sinch.com/fax/fax.pdf, https://developers.sinch.com/" or if posting JSON `"contentUrl": ["https://developers.sinch.com/fax/fax.pdf", "https://developers.sinch.com/"]`
 */
export type FaxContentUrl = string | string[];
