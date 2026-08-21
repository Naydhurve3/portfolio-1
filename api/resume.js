import handler from '../netlify/functions/public-resume.mjs';
import { adapt } from './_adapter.js';
export default adapt(handler);
