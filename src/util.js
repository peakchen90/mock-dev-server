/**
 * 删除注释
 * @param {string} text
 * @return {string}
 */
exports.deleteComments = function (text) {
  let pattern = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g
  return text.replace(pattern, (word) => {
    return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word
  })
}
