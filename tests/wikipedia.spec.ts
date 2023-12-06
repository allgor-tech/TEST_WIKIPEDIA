import { test, expect } from '@playwright/test';
import Wikipedia from '../pageElements/selectors';

let webContext;
let page;

const languages = ['uk', 'en'];
let language;

test.beforeEach(async ({ browser }) => {
  // Open Browser with saved login states
  webContext = await browser.newContext({ storageState: process.env.STATE_PATH });
  page = await webContext.newPage();
  // Open URL
  await page.goto(process.env.URL);
});

test('Wikipedia language', async () => {
 await test.step('Open Preferences', async () => {
  await page.locator(Wikipedia.BTN_USER_DROPDOWN).click();
  await page.locator(Wikipedia.BTN_PREFERENCES).click();
 });

 await test.step('Open User Profile tab', async () => {
  await page.locator(Wikipedia.BTN_MENU_TAB).first().click();
 });

 await test.step('Select a Language', async () => {
  // Check if the language is different (necessary for uninterrupted CI execution)
  language = (await page.locator(`html[lang="${languages[0]}"]`).count() > 0) ? languages[1] : languages[0];
  await page.locator(Wikipedia.FIELD_LANGUAGE).selectOption(language, { force: true });
 });

 await test.step('Press the submit button', async () => {
  await page.locator(Wikipedia.BTN_SUBMIT).click();
 });

 await test.step('Confirm that the language has been changed', async () => {
  await expect(page.locator(Wikipedia.FIELD_LANGUAGE)).toHaveValue(language);
  await expect(page.locator(`html[lang="${language}"]`)).toBeVisible();
 })
});
