const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
require('fs').mkdirSync('artifacts', { recursive: true });
(async()=>{
 const browser=await chromium.launch({headless:true,channel:"msedge"});
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5178/',{waitUntil:'networkidle'});
 await page.locator('.terrace').scrollIntoViewIfNeeded();
 await page.locator('.terrace img').evaluate(i=>i.decode());
 await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:'artifacts/qa-desktop.png',fullPage:true});
 await page.getByRole('button',{name:'Plats',exact:true}).click();
 if(await page.locator('.dish').count()!==1)throw Error('Filtre plats');
 await page.getByRole('button',{name:'Toute la carte',exact:true}).click();
 if(await page.locator('.dish').count()!==3)throw Error('Filtre toute la carte');
 await page.locator('.team-card.blue').click();
 if(!await page.locator('.site').evaluate(el=>el.classList.contains('team-blue')))throw Error('Brigade bleue');
 await page.getByLabel('Votre nom').fill('Camille');
 await page.getByLabel('Convives').selectOption('6');
 if(!await page.getByRole('button',{name:/La terrasse/}).isDisabled())throw Error('Capacite terrasse');
 await page.getByRole('button',{name:/Le salon/}).click();
 await page.getByRole('button',{name:/Envoyer au passe/}).click();
 if(!await page.locator('.ticket').isVisible())throw Error('Ticket absent');
 if(!((await page.locator('.ticket').innerText()).includes('Bleue')))throw Error('Brigade ticket');
 await page.locator('.ticket').screenshot({path:'artifacts/qa-ticket.png'});
 await page.getByRole('button',{name:'Déclencher le gag du compteur incendie'}).click();
 if(!((await page.locator('.incident').innerText()).includes('000')))throw Error('Compteur');
 await page.getByRole('button',{name:'C’est vraiment Hell’s Kitchen ?'}).click();
 if(!await page.locator('#answer-0').isVisible())throw Error('FAQ');
 const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));
 if(broken.length)throw Error('Images '+broken);
 const widths=[390,320,768];
 for(const width of widths){await page.setViewportSize({width,height:844});await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5178/',{waitUntil:'networkidle'});const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)throw Error('Overflow '+width);if(width===390){await page.screenshot({path:'artifacts/qa-mobile.png',fullPage:true});await page.getByRole('button',{name:'Ouvrir le menu'}).click();await page.locator('#mobile-nav').getByRole('link',{name:'Réserver une table'}).click();if(await page.locator('#mobile-nav').count())throw Error('Navigation mobile');}}
 await page.emulateMedia({reducedMotion:'reduce'});
 if(await page.locator('.hero-image').evaluate(el=>getComputedStyle(el).animationName)!=='none')throw Error('Reduced motion');
 console.log(JSON.stringify({passed:true,checks:['menu filters','brigade selection','table capacity','reservation ticket','incident counter','FAQ','all images','mobile navigation','no overflow 320/390/768','reduced motion'],errors},null,2));
 await browser.close();if(errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});

