/**
 * Creates a sperator upon the text and under it
 * @param {string} text 
 */
module.exports.createSperator = (text) => {
    let str = "\n";
    for (let i=0; i < text.length; i++) {
        str += "=";
    }

    str += "=\n" + text + "\n";

    for (let i=0; i < text.length; i++) {
        str += "=";
    }


    str+= "="

    return str;
}