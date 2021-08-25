import {Logger} from '../../util/Logger.js';

/**
 * Interface for all classes whose objects can be serialized to and
 * deserialized from XML documents and XML DOM objects.
 * @interface
 * @template T
 */
export class XmlSerializable {
  /**
   * @return {Object} XML DOM object for this object.
   * @abstract
   */
  toXmlDom() {
    Logger.abstractMethodExecution();
    return null;
  }

  /**
   * @return {String} XML document for this object.
   * @abstract
   */
  toXmlString() {
    Logger.abstractMethodExecution();
    return '';
  }

  /**
   * @param {String} xmlElement The XML DOM object.
   * @return {T}
   * @abstract
   */
  static fromXmlDom(xmlElement) {
    Logger.abstractMethodExecution();
    return null;
  }

  /**
   * @abstract
   * @param {String} xml The XML document.
   * @return {T}
   */
  static fromXmlString(xml) {
    Logger.abstractMethodExecution();
    return null;
  }
}
