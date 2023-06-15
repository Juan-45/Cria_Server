import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
//import { saveAs } from "file-saver";
//import { isNotEmptyString } from "helpers/data";

//const downloadFile = (blob, fileName) => saveAs(blob, fileName);

/*
const generateItineratedDocument = (templateInstance, data, fileName) => {
  const getDataWithPageBreakEnding = (data) => {
    const arrayWithoutLastItem = data.filter(
      (element, index) => index < data.length - 1
    );

    const lastItem = data[data.length - 1];

    const lastItemWithPageBreakEnding = {
      ...lastItem,
      raw_loop_pagebreak: "",
    };

    return [...arrayWithoutLastItem, lastItemWithPageBreakEnding];
  };

  templateInstance.render({
    raw_loop_pagebreak: `<w:br w:type="page"/>`,
    loop: getDataWithPageBreakEnding(data),
  });

  downloadFileFromInstance({
    templateInstance,
    fileName,
  });
};
*/

//FUNCIONES PARA ESTA APP

const getArrayBuffer = async (fileHandle) => {
  const fileObj = await fileHandle.getFile();
  const arrayBuffer = await fileObj.arrayBuffer();
  return arrayBuffer;
};

const getZipInstance = (arrayBuffer) => new PizZip(arrayBuffer);

const getDocxTemplaterInstance = (arrayBuffer, settings) =>
  new Docxtemplater(getZipInstance(arrayBuffer), settings);

const getBlob = (docxTemplaterInstance, config) =>
  docxTemplaterInstance.getZip().generate(config);

const getUpdatedBlobForTemplates = async ({
  fileHandle,
  data,
  onlyWord = true,
}) => {
  const arrayBuffer = await getArrayBuffer(fileHandle);
  const instance = getDocxTemplaterInstance(arrayBuffer, {
    paragraphLoop: true,
    linebreaks: true,
  });
  instance.render(data);
  const blob = getBlob(instance, {
    type: "blob",
    mimeType: onlyWord
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : [
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ],
  });

  return blob;
};

export { getUpdatedBlobForTemplates };
