module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': [
            '@swc/jest',{
                jsc: {
                    parser: {syntax: 'typescript'},
                    target: 'esnext'
                },
                module: {type: 'es6'}
            }
        ]
    },
    moduleNameMapper: {
		'^(@prisma/client/runtime/.*)\\.mjs$': '$1.js'
	},
	testMatch: ['<rootDir>/tests/**/*.test.ts']
}