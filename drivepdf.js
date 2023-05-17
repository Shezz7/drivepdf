function main() {
	const docsFolder = DriveApp.getFolderById('<drive_folder_id>') // Insert Google Drive folder ID for the folder with Docs/Sheets
	const now = new Date()
	const pdfFolder = DriveApp.createFolder('Coverted PDF Files ' + now) // Create new folder to store the converted documents
	convert(docsFolder, pdfFolder)
}

function convert(docsFolder, pdfFolder) {
	var file
	var blob
	var pdf
	const fileList = docsFolder.getFiles() // Get all files in the folder with Docs/Sheets

  Logger.log("Converting files in %s and adding them to new folder %s", docsFolder.getName(), pdfFolder.getName())

	while(fileList.hasNext()){
		file = fileList.next()

		if(file.getMimeType() === MimeType.GOOGLE_DOCS || file.getMimeType() === MimeType.GOOGLE_SHEETS){ // Check whether file is a Google Doc or Google Sheet
      Logger.log("Converting %s", file.getName())
			blob = file.getBlob()
			pdf = blob.getAs('application/pdf')
			pdfDoc = pdfFolder.createFile(pdf)
		}
	}
  Logger.log("Conversion complete!")
}
