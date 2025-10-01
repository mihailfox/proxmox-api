      let location = response.headersList.get("location");
      if (location !== null && isValidHeaderValue(location)) {
        location = new URL(location, responseURL(response));
      if (location && !location.hash) {
        location.hash = requestFragment;
      return location;
        const escape = (str) => str.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
            const chunk2 = textEncoder.encode(prefix + `; name="${escape(normalizeLinefeeds(name))}"\r
            const chunk2 = textEncoder.encode(`${prefix}; name="${escape(normalizeLinefeeds(name))}"` + (value.name ? `; filename="${escape(value.name)}"` : "") + `\r
        let window = "client";
          window = request.window;
          throw new TypeError(`'window' option '${window}' must be null`);
          window = "no-window";
          window,
              let location = "";
                    location = val;
                    location = val;
              const willFollow = request.redirect === "follow" && location && redirectStatusSet.has(status);
    var { btoa } = require("buffer");
            dataURL += btoa(decoder.write(chunk));
          dataURL += btoa(decoder.end());
var import_swagger_parser = __toESM(require("@apidevtools/swagger-parser"));
var import_yaml2 = require("yaml");
function createParameter(name, schema, location) {
    in: location,
    required: location === "path" ? true : !schema.optional,
var import_yaml = require("yaml");
    const methodCount = Object.entries(pathItem).reduce((count, [key, value]) => {
    return total + methodCount;
