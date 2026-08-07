import { randomBytes, scryptSync } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = createInterface({ input, output });
const password = await rl.question('New admin password: ');
rl.close();
if (password.length < 12) {
  console.error('Use at least 12 characters.');
  process.exit(1);
}
const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');
console.log(`\nADMIN_PASSWORD_HASH=scrypt$${salt}$${hash}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(48).toString('base64url')}`);
