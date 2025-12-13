const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

// Generar los certificados
const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365 });

// Guardarlos en la raíz del proyecto (una carpeta más arriba de src)
// Así quedan en el mismo lugar donde los hubiera puesto el comando openssl
fs.writeFileSync(path.join(__dirname, '../server.key'), pems.private);
fs.writeFileSync(path.join(__dirname, '../server.cert'), pems.cert);

console.log('✅ Certificados creados: server.key y server.cert en la raíz del proyecto.');