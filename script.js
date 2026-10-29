/* BACKPACK & STASH — HYBRID EDIT v6.2
 * Les anciennes catégories Hash / Fleurs / Extraction sont supprimées.
 * Pour ajouter les références d'une farm, remplir son tableau `products`.
 * Exemple de format (ne pas utiliser de fausses références) :
 * { id:'reference-unique', name:'Nom du produit', image:'Produit.jpg', video:'',
 *   description:'Description', promoEligible:false,
 *   tarifs:[{weight:'5g', price:60}, {weight:'10g', price:110}] }
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const tg = window.Telegram?.WebApp || null;
  const ORDER_TELEGRAM_USERNAME = 'BPDiSPENSARY';
  const money = value => `${Number(value || 0).toFixed(2).replace('.', ',')} €`;
  const safe = text => String(text ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const $ = id => document.getElementById(id);
  const farms = [
   {
      id:'doja-pak', name:'DOJA PAK', image:'DojaPak.png',
      tag:'FARM 01 / EXCLUSIVE EDIT', description:'Une identité unique. Découvre la sélection Doja Pak.',
      glow:'#5d2351', products:[
         {
                        "id": "SUGAR ROCKET",
                        "name": "🍬 SUGAR ROCKET 🚀",
                        "farm": "DOJA PAK 🗽",
                        "type": "CALI TOPSHELF",
                        "image": "ProductSR.png",
                        "video": "VideoSR.mov",
                        "description": `🏆 CALI TOPSHELF`,
                        "tarifs": [
                            { weight: "3.5g", price: 120 },
                            { weight: "7g", price: 220 },
                            { weight: "10.5g", price: 300 },
                        ]
                    },
      ]
    },
    {
      id:'hightower', name:'HIGHTOWER', image:'HighTower.png',
      tag:'FARM 02 / EXCLUSIVE EDIT', description:'L’univers Hightower et sa sélection.',
      glow:'#4c536a', products:[
          {
                        "id": "WHITE CHERRY ICE",
                        "name": "🍒 WHITE CHERRY ICE ⛸️",
                        "farm": "HIGHTOWER 🗼",
                        "type": "LIVE ROSIN",
                        "image": "ProductWC.jpg",
                        "video": "",
                        "description": `🍯 LIVE ROSIN`,
                        "tarifs": [
                            { weight: "2g", price: 250 },
                            { weight: "4g", price: 450 },
                        ]
                    },
      ]
    },
    {
      id:'popey-static-grower', name:'POPEY STATIC GROWER', image:'PopeyStatic.png',
      tag:'FARM 03 / EXCLUSIVE EDIT', description:'Une ambiance à part. Découvre la sélection Popey.',
      glow:'#6b5121', products:[
           {
                        "id": "GMO X PAPAYA ",
                        "name": "⭐ GMO X PAPAYA  🥭",
                        "farm": "POPEY STATIC GROWER 🎯",
                        "type": "LIVE ROSIN",
                        "image": "ProductGM.jpg",
                        "video": "",
                        "description": `🍯 LIVE ROSIN`,
                        "tarifs": [
                            { weight: "2g", price: 230 },
                            { weight: "4g", price: 400 },
                        ]
                    },
      ]
    }
  ];
  const contactLinks = [
    {name:'Telegram', url:'https://t.me/+Gbbmzh-zZ4IyZDc0', cls:'telegram', icon:'✈'},
    {name:'Instagram', url:'https://www.instagram.com/back_packstash?igsh=NDRhZjA2MzJrbWh0',cls:'instagram',icon:'◎'}
  ];
  // Codes d'origine conservés ; seuls les articles promoEligible en bénéficient.
  const validPromoCodes = {
    ACTUPLUG33:{type:'fixed',value:10,appliesTo:'eligible',cumulative:false},
    BACKPACK10:{type:'fixed',value:10,appliesTo:'eligible',cumulative:false}
  };
  let activeFarm = null;
  let activeProduct = null;
  let cart = [];
  let appliedPromo = null;
  let paymentMethod = 'Espèce';
  let toastTimeout;

  function vibrate(type='success') {
    try { tg?.HapticFeedback?.notificationOccurred(type); } catch (_) {}
  }
  function notify(message) {
    const el = $('notification-toast');
    if (!el) return;
    clearTimeout(toastTimeout);
    el.textContent = message;
    el.classList.add('show');
    toastTimeout = setTimeout(() => el.classList.remove('show'), 3200);
  }
  function navigate(page) {
    document.querySelectorAll('.page').forEach(el => el.classList.toggle('active', el.id === page));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === page || (page === 'page-farm' && el.dataset.page === 'page-home')));
    window.scrollTo({top:0,behavior:'instant'});
  }
  function findProduct(id) {
    for (const farm of farms) {
      const found = farm.products.find(product => product.id === id);
      if (found) return found;
    }
    return null;
  }
  function renderFarms() {
    $('farm-grid').innerHTML = farms.map((farm,i) => `
      <button class="farm-card" data-farm-id="${safe(farm.id)}" data-index="0${i+1}" style="--farm-glow:${safe(farm.glow)}" aria-label="Découvrir la farm ${safe(farm.name)}">
        <span class="farm-card-body"><span class="farm-img-wrap"><img class="farm-img" src="${safe(farm.image)}" alt="Logo ${safe(farm.name)}" loading="lazy"></span><span class="farm-text"><span class="farm-overline">✦ FARM 0${i+1}</span><span class="farm-name" style="display:block">${safe(farm.name)}</span><span class="farm-detail" style="display:block">${safe(farm.description)}</span></span></span>
        <span class="farm-card-bottom"><span>VOIR LA COLLECTION</span><span class="arrow-circle">↗</span></span>
      </button>`).join('');
  }
  function openFarm(id) {
    activeFarm = farms.find(farm => farm.id === id);
    if (!activeFarm) return;
    const farm = activeFarm;
    $('farm-feature').style.setProperty('--farm-glow', farm.glow);
    $('farm-feature').innerHTML = `<img src="${safe(farm.image)}" alt="Logo ${safe(farm.name)}"><div><span class="eyebrow">${safe(farm.tag)}</span><h1>${safe(farm.name)}</h1><p>${safe(farm.description)}</p></div>`;
    const container = $('product-list');
    if (!farm.products.length) {
      container.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">✦</div><span class="line-tag">COLLECTION</span><h3>La sélection arrive bientôt.</h3><p>Aucune référence n'est encore publiée pour cette farm. Les produits s'afficheront ici dès qu'ils auront été ajoutés à <code>script.js</code>.</p><button type="button" class="btn btn-quiet" id="empty-back">← Voir les autres farms</button></div>`;
    } else {
      container.innerHTML = farm.products.map(product => {
        const first = product.tarifs?.[0];
        return `<button class="product-card" data-product-id="${safe(product.id)}"><img src="${safe(product.image || 'LogoReel.png')}" alt="${safe(product.name)}" loading="lazy"><div class="product-card-info"><h3>${safe(product.name)}</h3><p>${safe(farm.name)}</p><strong>${first ? 'Dès '+money(first.price) : 'Découvrir'}</strong></div></button>`;
      }).join('');
    }
    navigate('page-farm');
  }
  function openProduct(id) {
    const product = findProduct(id);
    if (!product) return;
    activeProduct = product;
    const media = product.video
      ? `<video controls playsinline preload="metadata" poster="${safe(product.image || 'LogoReel.png')}" src="${safe(product.video)}"></video>`
      : `<img class="product-image" src="${safe(product.image || 'LogoReel.png')}" alt="${safe(product.name)}">`;
    $('product-detail').innerHTML = `<div class="media-card">${media}</div><div class="panel" style="margin-top:15px"><div class="product-farm-name">${safe(activeFarm?.name || '')}</div><h1 class="product-name">${safe(product.name)}</h1>${product.description ? `<p class="product-description">${safe(product.description)}</p>` : ''}<div class="checkout-title">Tarifs disponibles</div>${(product.tarifs || []).map(t => `<div class="tarif-row"><span>${safe(t.weight)}</span><strong>${money(t.price)}</strong><button class="btn btn-red" data-add-id="${safe(product.id)}" data-add-weight="${safe(t.weight)}">+ Panier</button></div>`).join('') || `<p class="small-note">Tarifs à venir.</p>`}</div>`;
    navigate('page-product');
  }
  function updateCartBadge() {
    const count = cart.reduce((sum,item) => sum+item.quantity,0);
    document.querySelectorAll('.cart-count').forEach(el => {el.textContent=count;el.style.display=count?'grid':'none';});
  }
  function addToCart(id,weight) {
    const product=findProduct(id);
    const tarif=product?.tarifs?.find(t=>t.weight===weight);
    if(!product || !tarif) {notify('Produit introuvable.');return;}
    const key=`${id}::${weight}`;
    const existing=cart.find(item=>item.key===key);
    if(existing) existing.quantity++;
    else cart.push({key,productId:id,name:product.name,image:product.image || 'LogoReel.png',weight,unitPrice:Number(tarif.price),quantity:1});
    updateCartBadge();vibrate();notify('Ajouté au panier ✓');
  }
  function calculateTotals() {
    const subtotal=cart.reduce((sum,item)=>sum+item.unitPrice*item.quantity,0);
    const promo=validPromoCodes[appliedPromo];
    let discount=0;
    if(promo) {
      const eligibleAmount=cart.reduce((sum,item)=> {
        const p=findProduct(item.productId);
        return sum + (promo.appliesTo==='all' || p?.promoEligible ? item.unitPrice*item.quantity : 0);
      },0);
      if(eligibleAmount>0) discount=promo.type==='percent' ? eligibleAmount*promo.value/100 : Math.min(promo.value,eligibleAmount);
    }
    discount=Math.min(subtotal,discount);
    return {subtotal,discount,total:subtotal-discount,quantity:cart.reduce((sum,item)=>sum+item.quantity,0)};
  }
  function cartPage() {
    const list=$('cart-items-container');
    list.innerHTML=cart.length ? cart.map(item => `<div class="cart-item"><img src="${safe(item.image)}" alt="${safe(item.name)}"><div class="cart-info"><h3>${safe(item.name)}</h3><p>${safe(item.weight)} · ${money(item.unitPrice)} / unité</p><strong>${money(item.quantity*item.unitPrice)}</strong></div><div class="quantity-selector"><button class="quantity-btn" data-qty="minus" data-key="${safe(item.key)}" aria-label="Diminuer">−</button><span>${item.quantity}</span><button class="quantity-btn" data-qty="plus" data-key="${safe(item.key)}" aria-label="Augmenter">+</button></div></div>`).join('')
    : `<div class="empty-state"><div class="empty-icon">🎒</div><h3>Ton panier est vide.</h3><p>Explore les trois farms pour retrouver leurs sélections.</p><button id="empty-cart-back" class="btn btn-red">Voir les farms ↗</button></div>`;
    $('cart-total-price').textContent=money(calculateTotals().subtotal);
    $('checkout-button').disabled=cart.length===0;
    navigate('page-cart');
  }
  function confirmationPage() {
    if (!cart.length) {cartPage();notify('Ton panier est vide.');return;}
    const t=calculateTotals();
    $('confirmation-items-count').textContent=`${t.quantity} article${t.quantity>1?'s':''}`;
    $('confirmation-total-price').textContent=money(t.total);
    $('confirmation-items-list').innerHTML=cart.map(item=>`<div class="review-item"><span>${safe(item.name)}<br><span class="muted">${item.quantity} × ${safe(item.weight)} · ${money(item.unitPrice)}</span></span><strong>${money(item.quantity*item.unitPrice)}</strong></div>`).join('');
    $('promo-input-container').style.display=appliedPromo?'none':'flex';
    $('promo-applied-container').style.display=appliedPromo?'flex':'none';
    $('promo-applied-text').textContent=appliedPromo?`Code ${appliedPromo} appliqué`:'';
    $('confirmation-summary').innerHTML=`<div class="summary-line"><span>Sous-total</span><span>${money(t.subtotal)}</span></div>${t.discount>0?`<div class="summary-line discount-label"><span>Réduction ${safe(appliedPromo)}</span><span>− ${money(t.discount)}</span></div>`:''}<div class="summary-line total"><span>TOTAL FINAL</span><strong>${money(t.total)}</strong></div>`;
    document.querySelectorAll('.payment-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.method===paymentMethod));
    navigate('page-confirmation');
  }
  function formatOrderMessage() {
    const t=calculateTotals();
    const date=new Date().toLocaleString('fr-FR',{dateStyle:'long',timeStyle:'short'});
    const lines=['🎒 BACKPACK & STASH — NOUVELLE COMMANDE','',`Date : ${date}`,`Paiement : ${paymentMethod}`,'','DÉTAIL DES ARTICLES :'];
    cart.forEach((item,i)=>lines.push(`${i+1}. ${item.name}`,`   ${item.quantity} × ${item.weight} — ${money(item.unitPrice)}`,`   Sous-total : ${money(item.unitPrice*item.quantity)}`));
    lines.push('',`Sous-total : ${money(t.subtotal)}`);
    if(t.discount>0) lines.push(`Réduction (${appliedPromo}) : − ${money(t.discount)}`);
    lines.push(`TOTAL : ${money(t.total)}`,'','Livraison : à convenir','Merci de confirmer cette commande.');
    return lines.join('\n');
  }
  async function copyText(text) {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      else {
        const area=document.createElement('textarea');area.value=text;area.style.cssText='position:fixed;left:-10000px';document.body.append(area);area.select();
        if(!document.execCommand('copy')) throw Error('Copie impossible');area.remove();
      }
      vibrate();notify('Récapitulatif copié ✓');
    } catch(_) {notify('Copie impossible sur cet appareil.');}
  }
  function sendTelegramOrder() {
    if(!cart.length){notify('Ton panier est vide.');return;}
    const message=formatOrderMessage();
    const base=`https://t.me/${ORDER_TELEGRAM_USERNAME}`;
    const url=Array.from(message).length<=3900 ? `${base}?text=${encodeURIComponent(message)}` : base;
    if(url===base){copyText(message);notify('Message long : récapitulatif copié. Colle-le dans Telegram.');}
    try {
      if(tg?.openTelegramLink) tg.openTelegramLink(url);
      else window.location.href=url;
    } catch(_) {notify('Impossible d’ouvrir Telegram. Utilise le bouton Copier.');}
  }
  function renderContact() {
    $('contact-links-container').innerHTML=contactLinks.map(link=>`<a class="social-link ${link.cls}" href="${safe(link.url)}" target="_blank" rel="noopener noreferrer"><span><span style="font-size:21px">${link.icon}</span>${safe(link.name)}</span><span>↗</span></a>`).join('');
  }
  function renderReviews() {
    const cont=$('reviews-container');
    for(let i=1;i<=9;i++){
      const img=document.createElement('img');img.src=`Avis${i}.jpeg`;img.alt=`Avis ${i}`;img.loading='lazy';
      img.onerror=()=>{img.remove(); if(!cont.children.length){cont.innerHTML='<div class="empty-state" style="width:100%"><h3>Avis à venir</h3><p>Ajoute les images Avis1.jpeg à Avis9.jpeg dans ton dossier si tu souhaites les afficher.</p></div>';}};
      img.addEventListener('click',()=>{$('img-in-modal').src=img.src;$('image-modal').classList.add('show');$('image-modal').setAttribute('aria-hidden','false');});cont.appendChild(img);
    }
  }
  // Events : delegation pour les cartes créées dynamiquement.
  document.addEventListener('click',event=>{
    const t=event.target;
    const closest=sel=>t.closest(sel);
    const pageBtn=closest('.nav-item');
    if(pageBtn){const page=pageBtn.dataset.page;if(page==='page-home')navigate('page-home');else navigate(page);return;}
    if(closest('#brand-home') || closest('#back-to-farms') || closest('#empty-back') || closest('#empty-cart-back') || closest('#cart-continue-shopping')){navigate('page-home');return;}
    if(closest('#go-farms')){document.getElementById('farms-section')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
    if(closest('#home-cart-button')){cartPage();return;}
    const farmCard=closest('[data-farm-id]');if(farmCard){openFarm(farmCard.dataset.farmId);return;}
    const productCard=closest('[data-product-id]');if(productCard){openProduct(productCard.dataset.productId);return;}
    if(closest('#back-to-products')){if(activeFarm)openFarm(activeFarm.id);else navigate('page-home');return;}
    const addBtn=closest('[data-add-id]');if(addBtn){addToCart(addBtn.dataset.addId,addBtn.dataset.addWeight);return;}
    const qtyBtn=closest('[data-qty]');if(qtyBtn){const item=cart.find(row=>row.key===qtyBtn.dataset.key);if(item){item.quantity+=qtyBtn.dataset.qty==='plus'?1:-1;if(item.quantity<=0)cart=cart.filter(row=>row!==item);updateCartBadge();cartPage();}return;}
    if(closest('#checkout-button')){confirmationPage();return;}
    if(closest('#confirmation-modify-order')){cartPage();return;}
    if(closest('#apply-promo-btn')){
      const code=$('promo-code-input').value.trim().toUpperCase();
      if(!validPromoCodes[code]){notify('Code promo invalide.');vibrate('error');return;}
      const eligible=cart.some(item=>validPromoCodes[code].appliesTo==='all' || findProduct(item.productId)?.promoEligible);
      if(!eligible){notify('Ce code ne s’applique pas aux articles du panier.');return;}
      appliedPromo=code;notify('Code promo appliqué ✓');vibrate();confirmationPage();return;
    }
    if(closest('#remove-promo-btn')){appliedPromo=null;confirmationPage();return;}
    const pay=closest('.payment-btn');if(pay){paymentMethod=pay.dataset.method;document.querySelectorAll('.payment-btn').forEach(b=>b.classList.toggle('active',b===pay));return;}
    if(closest('#confirm-order-button')){sendTelegramOrder();return;}
    if(closest('#copy-order-btn')){copyText(formatOrderMessage());return;}
    const acc=closest('.accordion-header');if(acc){const row=acc.closest('.info-item');const open=!row.classList.contains('active');document.querySelectorAll('.info-item').forEach(el=>{el.classList.remove('active');el.querySelector('.accordion-header')?.setAttribute('aria-expanded','false');});row.classList.toggle('active',open);acc.setAttribute('aria-expanded',String(open));return;}
    if(closest('.close-modal') || closest('#image-modal') && !closest('#img-in-modal')){$('image-modal').classList.remove('show');$('image-modal').setAttribute('aria-hidden','true');return;}
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){$('image-modal').classList.remove('show');$('image-modal').setAttribute('aria-hidden','true');}});
  try {tg?.ready();tg?.expand();tg?.setHeaderColor('#1b0d12');tg?.setBackgroundColor('#100c0f');}catch(_){}
  renderFarms();renderContact();renderReviews();updateCartBadge();navigate('page-home');
  // Comme sur l'ancien bot : splash de chargement lors de chaque nouvelle ouverture.
  // On retire le loader uniquement une fois la boutique initialisée.
  const loader = $('page-loader');
  window.setTimeout(() => {
    if (!loader) return;
    loader.classList.add('is-hidden');
    document.body.classList.remove('site-loading');
    window.setTimeout(() => loader.remove(), 600);
  }, 1600);
});
