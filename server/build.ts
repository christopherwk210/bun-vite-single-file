// @ts-ignore
import html from '../dist/index.html' with { type: 'file' };
import { file } from 'bun';

export const contents = file(html);