import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Express API for AppJS-start-template',
		version: '1.0.0',
		description:
			'This is a REST API application made with Express.',
		license: {
			name: 'MIT License',
			url: 'https://spdx.org/licenses/MIT.html',
		},
		contact: {
			name: 'Vyacheslav',
			url: 'https://github.com/Hashmann/AppJS-start-template/tree/master/server',
			// description: 'Development server',
			email: 'yarkov.slav@gmail.com',
		},
	},
	servers: [
		{
			url: 'http://localhost:5000',
			description: 'Development server',
		},
	],
}

const options = {
	swaggerDefinition,
	// Paths to files containing OpenAPI definitions
	apis: ['./router/*.js', './models/*.js'],
	// apis: ['./router/*.js'],
}

// const swaggerSpec = swaggerJSDoc(options);
export const swaggerSpec = swaggerJSDoc(options)