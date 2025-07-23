const scanner = require('sonarqube-scanner');

scanner({
  serverUrl: 'http://localhost:9001',
  token: 'sqp_ba1bc3576017a97a352ef5127b3e4aebac10530b',
  options: {
    'sonar.projectKey': 'my-secure-app',
    'sonar.sources': '.',
    'sonar.language': 'js',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.verbose': 'true',
  }
}, () => process.exit());
