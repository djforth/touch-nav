var testsContext = require.context('.', true, /_spec$/);
console.log(testsContext.keys())
testsContext.keys().forEach(testsContext);