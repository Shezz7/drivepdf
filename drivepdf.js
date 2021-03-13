function main() {
	var folder = DriveApp.getFolderById('<drive_folder_id>') // Insert Google Drive folder ID here
	var now = new Date()
	var pdfFolder = DriveApp.createFolder('Coverted Docs ' + now) // Folder to store the converted documents
	convert(folder, pdfFolder)
}

function convert(folder, pdfFolder) {
	var file
	var blob
	var pdf
	var fileList = folder.getFiles()

	while(fileList.hasNext()){
		file = fileList.next()
		if(file.getMimeType() === MimeType.GOOGLE_DOCS || file.getMimeType() === MimeType.GOOGLE_SHEETS){
			blob = file.getBlob()
			pdf = blob.getAs('application/pdf')
			pdfDoc = pdfFolder.createFile(pdf)
		}
	}
}
