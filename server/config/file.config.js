import { app } from 'socket.config.js'

app.use('/upload', upload.single('file'), (req, res) => {
	if (!req.file) return res.sendStatus(400)

	const relativeFilePath = req.file.path
		.replace(/\\/g, '/')
		.split('server/files')[1]

	res.status(201).json(relativeFilePath)
})

app.use('/files', (req, res) => {
	const filePath = getFilePath(req.url)

	res.status(200).sendFile(filePath)
})