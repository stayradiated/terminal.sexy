/*
 * Minimal LocalStorage wrapper
 */

var LocalStore = {

  save: function (name, content) {
    localStorage[name] = JSON.stringify(content);
  },

  load: function (name) {
    var data;
    try {
      data = JSON.parse(localStorage[name]);
    } catch (e) {
      data = undefined;
    }
    return data;
  }

};

module.exports = LocalStore;
