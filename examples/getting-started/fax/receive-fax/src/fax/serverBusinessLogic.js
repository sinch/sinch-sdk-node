import fs from 'fs';

/**
 * Handles an incoming fax event by saving the received document to disk.
 * @param { import('@sinch/sdk-core').Fax.IncomingFaxEventJson } incomingFaxEvent - The incoming fax event object
 */
export const handleIncomingFaxEvent = async (incomingFaxEvent) => {
  console.log(`Handling INCOMING_FAX event:\n${JSON.stringify(incomingFaxEvent, null, 2)}`);

  if (!incomingFaxEvent.file) {
    console.log('No file content found in this event.');
    return;
  }

  const fileExtension = (incomingFaxEvent.fileType || 'pdf').toLowerCase();
  const fileName = `${incomingFaxEvent.fax.id}.${fileExtension}`;
  const buffer = Buffer.from(incomingFaxEvent.file, 'base64');

  await fs.promises.writeFile(fileName, buffer);
  console.log('The file has been saved.');
};
