import { randomBytes } from 'node:crypto';

const recoveryCode = randomBytes(18).toString('base64url');
console.log(`\nADMIN_RECOVERY_CODE=${recoveryCode}`);
console.log('\nStore this value as a Sensitive environment variable and keep an offline copy.');
