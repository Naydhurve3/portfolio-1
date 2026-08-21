import { randomBytes, scryptSync } from 'node:crypto';

const recoveryCode = randomBytes(18).toString('base64url');
const salt = randomBytes(16).toString('hex');
const hash = scryptSync(recoveryCode, salt, 64).toString('hex');

console.log(`\nADMIN_RECOVERY_HASH=scrypt$${salt}$${hash}`);
console.log(`\nRECOVERY CODE (store offline; shown once): ${recoveryCode}`);
