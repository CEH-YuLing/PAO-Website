import test from 'node:test';
import assert from 'node:assert/strict';
import { localSectionId } from '../lib/section-navigation.mjs';

test('section links work with clean or existing fragments and locale paths', () => {
  assert.equal(localSectionId('#gioi-thieu','https://pao-os.com/'),'gioi-thieu');
  assert.equal(localSectionId('#doi-ngu','https://pao-os.com/#gioi-thieu'),'doi-ngu');
  assert.equal(localSectionId('/en/#tri-thuc','https://pao-os.com/en/'),'tri-thuc');
  assert.equal(localSectionId('#policy-2','https://pao-os.com/privacy/'),'policy-2');
  assert.equal(localSectionId('#m%E1%BB%A5c','https://pao-os.com/'),'mục');
});
test('real page changes, external destinations and different queries stay native', () => {
  for(const href of ['/privacy/','/en/#doi-ngu','https://example.com/#gioi-thieu','mailto:cs@pao-os.com','tel:+84925880088','/?ref=new#gioi-thieu']) assert.equal(localSectionId(href,'https://pao-os.com/'),null);
  assert.equal(localSectionId('#gioi-thieu','https://pao-os.com/?ref=campaign'),'gioi-thieu');
});
test('empty and malformed fragments do not break navigation', () => {
  for(const href of ['','#','#bad%ZZ'])assert.equal(localSectionId(href,'https://pao-os.com/'),null);
});
