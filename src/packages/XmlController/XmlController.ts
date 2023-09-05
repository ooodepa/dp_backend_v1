import * as xml2js from 'js2xmlparser';

class XmlController {
  static JSObject2XmlString(object: any): string {
    return Array.isArray(object)
      ? xml2js.parse('ARRAY', { OBJECT: object })
      : xml2js.parse('OBJECT', object);
  }
}

export default XmlController;
