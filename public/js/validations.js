/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * @class Validations
 */
class Validations {

  /**
   * isValidJson ()
   * @param {any} jsonFile
   * @returns {boolean} - return true or false
   * @memberOf Validations
   */
  static isValidJson(jsonFile) {
    try {
      JSON.parse(jsonFile);
      return true;
    } catch (e) {
      bootbox.alert({
        message: 'JSON file is not properly formatted',
        backdrop: true,
        buttons: {
          ok: {
            className: 'btn-danger'
          }
        }
      });
      return false;
    }
  }

  /**
   * isValidContent ()
   * @param {any} bookContent
   * @returns {boolean} - returns true or false
   * @memberOf Validations
   */
  static isValidContent(bookContent) {
    bookContent = JSON.parse(bookContent);
    

    for (let i = 0; i < bookContent.length; i += 1) {
      if ((!bookContent[i].title) || (!bookContent[i].text)) {
        bootbox.alert({
          message: 'The content of the file is not valid',
          backdrop: true,
          buttons: {
            ok: {
              className: 'btn-danger'
            }
          }
        });
        return false;
      }
    }
    return true;
  }

}

