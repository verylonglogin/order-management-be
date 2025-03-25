module.exports = {
    roots: ['<rootDir>/test'],
    testMatch: ['**/?(*.)+(spec|test).[tj]s'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    testEnvironment: 'node',
};
