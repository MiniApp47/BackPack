/* BACKPACK & STASH — HYBRID EDIT v6.2
 * Les anciennes catégories Hash / Fleurs / Extraction sont supprimées.
 * Pour ajouter les références d'une farm, remplir son tableau `products`.
 * Exemple de format (ne pas utiliser de fausses références) :
 * { id:'reference-unique', name:'Nom du produit', image:'Produit.jpg', video:'',
 *   images:['Photo2.jpg', 'Photo3.jpg'], // Photos supplémentaires (facultatif)
 *   description:'Description', promoEligible:false,
 *   tarifs:[{weight:'5g', price:60}, {weight:'10g', price:110}] }
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const tg = window.Telegram?.WebApp || null;
  // Contact de commande TatoTalk (les liens sociaux Telegram sont conservés).
  const ORDER_TATO_USERNAME = 'BPCOMMANDE';
  const ORDER_TATO_URL = `https://tato.im/${ORDER_TATO_USERNAME}`;
  const money = value => `${Number(value || 0).toFixed(2).replace('.', ',')} €`;
  const safe = text => String(text ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const $ = id => document.getElementById(id);
  const farms = [
    {
      id:'WIZARD TREES', name:'WIZARD TREES 🧙‍♂️', image:'FarmWIZ.png',
      tag:'FARM 01 / EXCLUSIVE EDIT', description:'Une farm qui n\'as plus a faire c\'est preuve 🔮 \n Découvre la sélection Wizard Trees 🪄',
      glow:'#4c068a', products:[
         {
                        "id": "🚀 NEBULA  🔮",
                        "name": "🚀 NEBULA  🔮",
                        "farm": "WIZARD TREES 🧙‍♂️",
                        "type": "CALI TOPSHELF 🐉",
                        "image": "ProductNB.jpg",
                        "video": "VideoNB.mp4",
                        "description": `CALI TOPSHELF 🐉`,
                        "tarifs": [
                            { weight: "1 BAG (3.5g)", price: 120 },
                            { weight: "2 BAGS (7g)", price: 220 },
                            { weight: "3 BAGS (10.5g)", price: 300 },
                        ]
                    },
      ]
    },
     {
      id:'CleanSift', name:'CLEAN SIFT OFFICIAL 🇪🇸', image:'FarmClean.png',
      tag:'FARM 02 / EXCLUSIVE EDIT', description:'Decouvrez notre selection Clean Sift Officiel 🇪🇸',
      glow:'#5d3c23', products:[
         {
                        "id": "🍑 BARBARA CHERRY 🍒",
                        "name": "🍑 BARBARA CHERRY 🍒",
                        "farm": "CLEAN SIFT OFFICIAL 🇪🇸",
                        "type": "PLASMA-STATIC ⚡️",
                        "image": "ProductBC.jpg",
                        "video": "VideoBC.mp4",
                        "description": `PLASMA-STATIC ⚡️`,
                        "tarifs": [
                            { weight: "5g", price: 80 },
                            { weight: "10g", price: 160 },
                            { weight: "25g", price: 370 },
                        ]
                    },
         {
                        "id": "🍊 ORANGE RUNTZ 🍇",
                        "name": "🍊 ORANGE RUNTZ 🍇",
                        "farm": "CLEAN SIFT OFFICIAL 🇪🇸",
                        "type": "PLASMA-STATIC ⚡️",
                        "image": "ProductOR.jpg",
                        "video": "VideoBC.mp4",
                        "description": `PLASMA-STATIC ⚡️`,
                        "tarifs": [
                            { weight: "5g", price: 80 },
                            { weight: "10g", price: 160 },
                            { weight: "25g", price: 370 },
                        ]
                    },
        {
                        "id": "🪻 LAVENDER 🪻",
                        "name": "🪻 LAVENDER 🪻",
                        "farm": "CLEAN SIFT OFFICIAL 🇪🇸",
                        "type": "STATIC-SIFT 🧤",
                        "image": "ProductLV.jpg",
                        "video": "VideoLV.mp4",
                        "description": `STATIC-SIFT 🧤`,
                        "tarifs": [
                            { weight: "5g", price: 100 },
                            { weight: "10g", price: 180 },
                            { weight: "25g", price: 400 },
                        ]
                    },
                    {
                        "id": "🍊 ORANGE DIESEL ⛽️",
                        "name": "🍊 ORANGE DIESEL ⛽️",
                        "farm": "CLEAN SIFT OFFICIAL 🇪🇸",
                        "type": "FROZEN-SIFT 180/160/90u ❄️",
                        "image": "ProductOD.jpg",
                        "video": "VideoOD.mp4",
                        "description": `FROZEN-SIFT 180/160/90u ❄️`,
                        "tarifs": [
                            { weight: "5g", price: 70 },
                            { weight: "10g", price: 130 },
                            { weight: "25g", price: 270 },
                        ]
                    },
                     {
                        "id": "🍊 RAMBOW MINTS 🥭",
                        "name": "🍊 RAMBOW MINTS 🥭",
                        "farm": "CLEAN SIFT OFFICIAL 🇪🇸",
                        "type": "DRY-SIFT 🥁",
                        "image": "ProductRM.jpg",
                        "video": "VideoRM.mp4",
                        "description": `DRY-SIFT 🥁`,
                        "tarifs": [
                            { weight: "5g", price: 40 },
                            { weight: "10g", price: 70 },
                            { weight: "25g", price: 150 },
                        ]
                    },
        /* {
                        "id": "🍇 FORBIDDEN JOY 🫐",
                        "name": "🍇 FORBIDDEN JOY 🫐",
                        "farm": "BACKPACK SÉLECTION 🎒",
                        "type": "WHOLE PLANT FRESH FROZEN 🧊",
                        "image": "ProductFJ.png",
                        "video": "VideoFJ.mp4",
                        "description": `WHOLE PLANT FRESH FROZEN 🧊`,
                        "tarifs": [
                            { weight: "1g", price: 70 },
                            { weight: "2g", price: 130 },
                        ]
                    }, */
        /* {
                        "id": "🍓 STRAWBERRY X GMO 🧄",
                        "name": "🍓 STRAWBERRY X GMO 🧄",
                        "farm": "BACKPACK SÉLECTION 🎒",
                        "type": "STATIC-SIFT 🧤",
                        "image": "ProductSG.png",
                        "video": "VideoSG.mp4",
                        "description": `STATIC-SIFT 🧤`,
                        "tarifs": [
                            { weight: "5g", price: 100 },
                            { weight: "10g", price: 180 },
                            { weight: "25g", price: 400 },
                        ]
                    },
        {
                        "id": "🍌 BANANA HONEY 🍯",
                        "name": "🍌 BANANA HONEY 🍯",
                        "farm": "BACKPACK SÉLECTION 🎒",
                        "type": "PLASMA-STATIC ⚡️",
                        "image": "ProductBH.png",
                        "video": "VideoBH.mp4",
                        "description": `PLASMA-STATIC ⚡️`,
                        "tarifs": [
                            { weight: "5g", price: 80 },
                            { weight: "10g", price: 160 },
                            { weight: "25g", price: 370 },
                        ]
                    },
         {
                        "id": "🍊 ORANGE TANGIE 🥭",
                        "name": "🍊 ORANGE TANGIE 🥭",
                        "farm": "BACKPACK SÉLECTION 🎒",
                        "type": "DRY-SIFT 🥁",
                        "image": "ProductOT.png",
                        "video": "VideoOT.mp4",
                        "description": `DRY-SIFT 🥁`,
                        "tarifs": [
                            { weight: "5g", price: 40 },
                            { weight: "10g", price: 70 },
                            { weight: "25g", price: 150 },
                        ]
                    },
         {
                        "id": "🧄 GARLIC JUICE🥤",
                        "name": "🧄 GARLIC JUICE🥤",
                        "farm": "BACKPACK SÉLECTION 🎒",
                        "type": "FROZEN-SIFT ❄️",
                        "image": "ProductGJ.png",
                        "video": "VideoGJ.mp4",
                        "description": `FROZEN-SIFT ❄️`,
                        "tarifs": [
                            { weight: "5g", price: 70 },
                            { weight: "10g", price: 130 },
                            { weight: "25g", price: 270 },
                        ]
                    }, */
      ]
    },
    {
      id:'ICE MELT', name:'ICE MELT 🇪🇸', image:'FarmIce.png',
      tag:'FARM 03 / EXCLUSIVE EDIT', description:'Découvre la sélection ICE MELT 🇪🇸',
      glow:'#23265d', products:[
         {
                        "id": "🍇 Ff x pineapple madness 🍍",
                        "name": "🍇 Ff x pineapple madness 🍍",
                        "farm": "ICE MELT 🇪🇸",
                        "type": "WHOLE PLANT FRESH FROZEN 🧊",
                        "image": "ProductFP.jpg",
                        "video": "",
                        "description": `WHOLE PLANT FRESH FROZEN 🧊`,
                        "tarifs": [
                            { weight: "1G", price: 70 },
                            { weight: "2G", price: 130 },
                        ]
                    },
         {
                        "id": "🍔 Hash burger x ff 🍇",
                        "name": "🍔 Hash burger x ff 🍇",
                        "farm": "ICE MELT 🇪🇸",
                        "type": "WHOLE PLANT FRESH FROZEN 🧊",
                        "image": "ProductHB.jpg",
                        "video": "",
                        "description": `WHOLE PLANT FRESH FROZEN 🧊`,
                        "tarifs": [
                            { weight: "1G", price: 70 },
                            { weight: "2G", price: 130 },
                        ]
                    },
         {
                        "id": "🚀 Super Boof Cherry 🍒",
                        "name": "🚀 Super Boof Cherry 🍒",
                        "farm": "ICE MELT 🇪🇸",
                        "type": "WHOLE PLANT FRESH FROZEN 🧊",
                        "image": "ProductSBC.jpg",
                        "video": "",
                        "description": `WHOLE PLANT FRESH FROZEN 🧊`,
                        "tarifs": [
                            { weight: "1G", price: 70 },
                            { weight: "2G", price: 130 },
                        ]
                    },
      ]
    },
    {
      id:'FROSTY HASH x CALITÉ FARM', name:'FROSTYHASH X CALITÉ FARM ❄️🦍', image:'FarmFHC.png',
      tag:'FARM 04 / EXCLUSIVE EDIT', description:'Un mix de qualité. Découvre la sélection FROSTY HASH x CALITÉ FARM.',
      glow:'#234c5d', products:[
         {
                        "id": "🦜 TROPICANA COOKIES 🍪",
                        "name": "🦜 TROPICANA COOKIES 🍪",
                        "farm": "FROSTYHASH X CALITÉ FARM ❄️🦍",
                        "type": "LIVE ROSIN DRY-SIFT 🍯",
                        "image": "ProductTC.jpg",
                        "images": ["ProductTC2.jpg"], // Ajoute ici "ProductTC3.jpg", etc.
                        "video": "",
                        "description": `LIVE ROSIN DRY-SIFT 🍯`,
                        "tarifs": [
                            { weight: "2G", price: 250 },
                            { weight: "4G", price: 480 },
                        ]
                    },
      ]
    },
    {
      id:'burningRope', name:'BURNING ROPE 🏜️🇺🇸', image:'Burning.png',
      tag:'FARM 05 / EXCLUSIVE EDIT', description:'Une marque de folie. Découvre la sélection Burning Rope.',
      glow:'#5d4d23', products:[
         {
                        "id": "🥭 SMOOTHIE 🥤",
                        "name": "🥭 SMOOTHIE 🥤",
                        "farm": "BURNING ROPE 🏜️🇺🇸",
                        "type": "CALI TOPSHELF",
                        "image": "ProductSM.jpg",
                        "video": "VideoSM.mov",
                        "description": `🏆 CALI TOPSHELF`,
                        "tarifs": [
                            { weight: "1 JAR (3.5G)", price: 120 },
                            { weight: "2 JAR (7G)", price: 220 },
                            { weight: "3 JAR (10.5G)", price: 300 },
                        ]
                    },
         {
                        "id": "🤰BABY YODA 🪖",
                        "name": "🤰BABY YODA 🪖",
                        "farm": "BURNING ROPE 🏜️🇺🇸",
                        "type": "CALI TOPSHELF",
                        "image": "ProductBY.jpg",
                        "video": "VideoBY.mov",
                        "description": `🏆 CALI TOPSHELF`,
                        "tarifs": [
                            { weight: "1 JAR (3.5G)", price: 120 },
                            { weight: "2 JAR (7G)", price: 220 },
                            { weight: "3 JAR (10.5G)", price: 300 },
                        ]
                    },
      ]
    },
  /*  {
      id:'backPackSelect', name:'BACKPACK SÉLECTION 🎒', image:'LogoBackTransparent.png',
      tag:'BACKPACK FARM', description:'Notre selection backpack.',
      glow:'#5d2325', products:[
        /* {
                        "id": "🍇 FORBIDDEN JOY 🫐",
                        "name": "🍇 FORBIDDEN JOY 🫐",
                        "farm": "BACKPACK SÉLECTION 🎒",
                        "type": "WHOLE PLANT FRESH FROZEN 🧊",
                        "image": "ProductFJ.png",
                        "video": "VideoFJ.mp4",
                        "description": `WHOLE PLANT FRESH FROZEN 🧊`,
                        "tarifs": [
                            { weight: "1g", price: 70 },
                            { weight: "2g", price: 130 },
                        ]
                    }, */
        /* {
                        "id": "🍓 STRAWBERRY X GMO 🧄",
                        "name": "🍓 STRAWBERRY X GMO 🧄",
                        "farm": "BACKPACK SÉLECTION 🎒",
                        "type": "STATIC-SIFT 🧤",
                        "image": "ProductSG.png",
                        "video": "VideoSG.mp4",
                        "description": `STATIC-SIFT 🧤`,
                        "tarifs": [
                            { weight: "5g", price: 100 },
                            { weight: "10g", price: 180 },
                            { weight: "25g", price: 400 },
                        ]
                    },
        {
                        "id": "🍌 BANANA HONEY 🍯",
                        "name": "🍌 BANANA HONEY 🍯",
                        "farm": "BACKPACK SÉLECTION 🎒",
                        "type": "PLASMA-STATIC ⚡️",
                        "image": "ProductBH.png",
                        "video": "VideoBH.mp4",
                        "description": `PLASMA-STATIC ⚡️`,
                        "tarifs": [
                            { weight: "5g", price: 80 },
                            { weight: "10g", price: 160 },
                            { weight: "25g", price: 370 },
                        ]
                    },
         {
                        "id": "🍊 ORANGE TANGIE 🥭",
                        "name": "🍊 ORANGE TANGIE 🥭",
                        "farm": "BACKPACK SÉLECTION 🎒",
                        "type": "DRY-SIFT 🥁",
                        "image": "ProductOT.png",
                        "video": "VideoOT.mp4",
                        "description": `DRY-SIFT 🥁`,
                        "tarifs": [
                            { weight: "5g", price: 40 },
                            { weight: "10g", price: 70 },
                            { weight: "25g", price: 150 },
                        ]
                    },
         {
                        "id": "🧄 GARLIC JUICE🥤",
                        "name": "🧄 GARLIC JUICE🥤",
                        "farm": "BACKPACK SÉLECTION 🎒",
                        "type": "FROZEN-SIFT ❄️",
                        "image": "ProductGJ.png",
                        "video": "VideoGJ.mp4",
                        "description": `FROZEN-SIFT ❄️`,
                        "tarifs": [
                            { weight: "5g", price: 70 },
                            { weight: "10g", price: 130 },
                            { weight: "25g", price: 270 },
                        ]
                    }, 
      ]
    }, */
   {
      id:'doja-pak', name:'DOJA PAK 🇺🇸', image:'DojaPak.png',
      tag:'FARM 06 / EXCLUSIVE EDIT', description:'Une identité unique. Découvre la sélection Doja Pak.',
      glow:'#5d2351', products:[
         {
                        "id": "SUGAR ROCKET",
                        "name": "🍬 SUGAR ROCKET 🚀",
                        "farm": "DOJA PAK 🗽",
                        "type": "CALI TOPSHELF",
                        "image": "ProductSR.jpg",
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
      id:'hightower', name:'HIGHTOWER 🇺🇸', image:'HighTower.png',
      tag:'FARM 07 / EXCLUSIVE EDIT', description:'L’univers Hightower et sa sélection.',
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
      id:'popey-static-grower', name:'POPEY STATIC GROWER 🇺🇸', image:'PopeyStatic.png',
      tag:'FARM 08 / EXCLUSIVE EDIT', description:'Une ambiance à part. Découvre la sélection Popey.',
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
    {name:'Instagram', url:'https://www.instagram.com/back_packstash?igsh=NDRhZjA2MzJrbWh0',cls:'instagram',icon:'◎'},
    {name:'ShowRoom Instagram', url:'https://www.instagram.com/showroom.backpack?psln=MXdjM2dpYzAzM2Y5aQ==',cls:'instagram',icon:'◎'}
  ];
  // Codes d'origine conservés ; seuls les articles promoEligible en bénéficient.
  const validPromoCodes = {
    ACTUPLUG33:{type:'fixed',value:10,appliesTo:'eligible',cumulative:false},
    BACKPACK10:{type:'fixed',value:10,appliesTo:'eligible',cumulative:false}
  };
  let activeFarm = null;
  let activeType = null; // Pour les farms organisées par type (Clean Sift et Backpack).
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
  // Les noms des types sont lus DIRECTEMENT dans product.type :
  // l'ajout d'un produit d'un nouveau type crée automatiquement sa catégorie.
  // Ajouter ici l'ID d'une farm pour lui activer la sélection par type.
  const typedFarmLabels = {
    'backPackSelect': 'BACKPACK',
    'CleanSift': 'CLEAN SIFT'
  };
  const hasTypeSelection = farm => Boolean(farm && Object.prototype.hasOwnProperty.call(typedFarmLabels, farm.id));
  const normalizeType = product => String(product.type || 'AUTRES').trim() || 'AUTRES';
  function typeIcon(type) {
    const label = type.toUpperCase();
    if (label.includes('WHOLE PLANT') || label.includes('FRESH FROZEN')) return '🧊';
    if (label.includes('PLASMA')) return '⚡';
    if (label.includes('FROZEN')) return '❄️';
    if (label.includes('DRY')) return '🥁';
    if (label.includes('STATIC')) return '🧤';
    return '✦';
  }

  function renderFarmCollection() {
    const farm = activeFarm;
    if (!farm) return;
    const container = $('product-list');
    const usesTypes = hasTypeSelection(farm);
    const typeBrand = typedFarmLabels[farm.id] || '';
    const showingTypes = usesTypes && activeType === null;
    const nav = $('farm-type-nav');
    nav.hidden = !usesTypes || showingTypes;
    $('farm-type-indicator').textContent = usesTypes && activeType ? activeType : '';
    $('farm-section-eyebrow').textContent = showingTypes ? `${typeBrand} / COLLECTIONS` : 'LA COLLECTION';
    $('farm-section-title').innerHTML = showingTypes ? 'CHOISIS TON <strong>TYPE.</strong>' : 'LA <strong>SÉLECTION.</strong>';
    const hint = $('farm-section-hint');
    hint.hidden = !showingTypes;
    hint.textContent = showingTypes ? 'Sélectionne un type pour découvrir ses produits.' : '';

    if (showingTypes && farm.products.length) {
      const types = [...new Set(farm.products.map(normalizeType))];
      container.className = 'type-grid';
      container.innerHTML = types.map((type, index) => {
        const count = farm.products.filter(p => normalizeType(p) === type).length;
        return `<button type="button" class="type-card" data-product-type="${safe(type)}" aria-label="Voir les produits ${safe(type)}">
            <span class="type-card-mark" aria-hidden="true">${typeIcon(type)}</span>
            <span class="type-card-copy">
              <span class="type-card-kicker">${safe(typeBrand)} • COLLECTION ${String(index + 1).padStart(2,'0')}</span>
              <span class="type-card-name">${safe(type)}</span>
              <span class="type-card-bottom">${count} produit${count > 1 ? 's' : ''} disponible${count > 1 ? 's' : ''}</span>
            </span><span class="type-card-arrow" aria-hidden="true">↗</span>
          </button>`;
      }).join('');
      return;
    }

    container.className = 'product-grid-inner';
    const products = usesTypes && activeType !== null
      ? farm.products.filter(product => normalizeType(product) === activeType)
      : farm.products;

    if (!products.length) {
      container.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">✦</div><span class="line-tag">COLLECTION</span><h3>La sélection arrive bientôt.</h3><p>Aucune référence n'est encore publiée pour cette collection. Les produits s'afficheront ici dès qu'ils auront été ajoutés à <code>script.js</code>.</p><button type="button" class="btn btn-quiet" id="empty-back">← Voir les autres farms</button></div>`;
      return;
    }
    container.innerHTML = products.map(product => {
      const first = product.tarifs?.[0];
      return `<button class="product-card" data-product-id="${safe(product.id)}"><img src="${safe(product.image || 'LogoReel.png')}" alt="${safe(product.name)}" loading="lazy"><div class="product-card-info"><h3>${safe(product.name)}</h3><p>${safe(usesTypes ? normalizeType(product) : farm.name)}</p><strong>${first ? 'Dès '+money(first.price) : 'Découvrir'}</strong></div></button>`;
    }).join('');
  }

  function openFarm(id) {
    activeFarm = farms.find(farm => farm.id === id);
    if (!activeFarm) return;
    activeType = null; // Afficher les types à chaque ouverture de Clean Sift ou Backpack.
    const farm = activeFarm;
    $('farm-feature').style.setProperty('--farm-glow', farm.glow);
    $('farm-feature').innerHTML = `<img src="${safe(farm.image)}" alt="Logo ${safe(farm.name)}"><div><span class="eyebrow">${safe(farm.tag)}</span><h1>${safe(farm.name)}</h1><p>${safe(farm.description)}</p></div>`;
    renderFarmCollection();
    navigate('page-farm');
  }
  // Galerie d'images autonome : aucune modification à faire dans index.html.
  // La propriété "image" reste la photo principale, "images" contient les suivantes.
  const galleryCss = document.createElement('style');
  galleryCss.id = 'backpack-product-gallery-css';
  galleryCss.textContent = `
    .bp-gallery{position:relative;width:100%;overflow:hidden;border-radius:18px;background:#09090b;border:1px solid #ffffff24}
    .bp-gallery-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;scrollbar-width:none}
    .bp-gallery-track::-webkit-scrollbar{display:none}
    .bp-gallery-slide{flex:0 0 100%;min-width:0;aspect-ratio:1/1;scroll-snap-align:center;display:flex;align-items:center;justify-content:center}
    .bp-gallery-slide img{width:100%;height:100%;max-height:490px;object-fit:contain;display:block;user-select:none;-webkit-user-drag:none}
    .bp-gallery-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:2;width:39px;height:42px;border-radius:12px;border:1px solid #ffffff65;background:#111116d9;color:#fff;font-size:28px;display:grid;place-items:center;cursor:pointer;box-shadow:0 3px 14px #0007;line-height:1}
    .bp-gallery-arrow.prev{left:10px}.bp-gallery-arrow.next{right:10px}
    .bp-gallery-arrow:focus-visible,.bp-gallery-dot:focus-visible{outline:3px solid #ff9090;outline-offset:3px}
    .bp-gallery-footer{display:flex;align-items:center;justify-content:center;gap:14px;padding:10px 12px 12px;background:#17171b}
    .bp-gallery-dots{display:flex;align-items:center;justify-content:center;gap:8px}
    .bp-gallery-dot{width:9px;height:9px;padding:0;border:0;border-radius:50%;background:#77727d;cursor:pointer;transition:background .2s,transform .2s}
    .bp-gallery-dot.active{background:#f0222e;transform:scale(1.25)}
    .bp-gallery-count{font-size:11px;font-weight:800;letter-spacing:.08em;color:#ded8dd;font-variant-numeric:tabular-nums}
    @media (prefers-reduced-motion:reduce){.bp-gallery-track{scroll-behavior:auto}.bp-gallery-dot{transition:none}}
  `;
  document.head.appendChild(galleryCss);

  function getProductImages(product) {
    // On accepte les photos supplémentaires dans un tableau, sans doublons.
    return [...new Set([product.image, ...(Array.isArray(product.images) ? product.images : [])]
      .filter(path => typeof path === 'string' && path.trim()).map(path => path.trim()))];
  }

  function renderProductMedia(product) {
    // Les vidéos des autres références restent inchangées.
    if (product.video) {
      return `<video controls playsinline preload="metadata" poster="${safe(product.image || 'LogoReel.png')}" src="${safe(product.video)}"></video>`;
    }
    const photos = getProductImages(product);
    if (photos.length <= 1) {
      return `<img class="product-image" src="${safe(photos[0] || 'LogoReel.png')}" alt="${safe(product.name)}">`;
    }
    return `<div class="bp-gallery" role="region" aria-label="Photos de ${safe(product.name)}">
      <div class="bp-gallery-track" tabindex="0" aria-label="Faire défiler les photos">
        ${photos.map((photo, i) => `<div class="bp-gallery-slide"><img src="${safe(photo)}" alt="${safe(product.name)} — photo ${i+1} sur ${photos.length}" loading="${i === 0 ? 'eager' : 'lazy'}" draggable="false"></div>`).join('')}
      </div>
      <button type="button" class="bp-gallery-arrow prev" data-gallery-move="-1" aria-label="Photo précédente">‹</button>
      <button type="button" class="bp-gallery-arrow next" data-gallery-move="1" aria-label="Photo suivante">›</button>
      <div class="bp-gallery-footer">
        <div class="bp-gallery-dots">${photos.map((_, i) => `<button type="button" class="bp-gallery-dot${i === 0 ? ' active' : ''}" data-gallery-go="${i}" aria-label="Voir la photo ${i+1}" aria-pressed="${i === 0}"></button>`).join('')}</div>
        <span class="bp-gallery-count" aria-live="polite">1 / ${photos.length}</span>
      </div>
    </div>`;
  }

  function setGalleryIndex(gallery, desiredIndex) {
    if (!gallery) return;
    const track = gallery.querySelector('.bp-gallery-track');
    const count = gallery.querySelectorAll('.bp-gallery-slide').length;
    if (!track || count < 2) return;
    const currentIndex = Math.round(track.scrollLeft / (track.clientWidth || 1));
    const index = Math.max(0, Math.min(count - 1, Number.isFinite(desiredIndex) ? desiredIndex : currentIndex));
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
    syncGalleryIndicators(gallery, index);
  }

  function syncGalleryIndicators(gallery, index) {
    const dots = gallery.querySelectorAll('.bp-gallery-dot');
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
    const counter = gallery.querySelector('.bp-gallery-count');
    if (counter) counter.textContent = `${index + 1} / ${dots.length}`;
  }

  function openProduct(id) {
    const product = findProduct(id);
    if (!product) return;
    activeProduct = product;
    const media = renderProductMedia(product);
    $('product-detail').innerHTML = `<div class="media-card">${media}</div><div class="panel" style="margin-top:15px"><div class="product-farm-name">${safe(activeFarm?.name || '')}</div><h1 class="product-name">${safe(product.name)}</h1>${product.description ? `<p class="product-description">${safe(product.description)}</p>` : ''}<div class="checkout-title">Tarifs disponibles</div>${(product.tarifs || []).map(t => `<div class="tarif-row"><span>${safe(t.weight)}</span><strong>${money(t.price)}</strong><button class="btn btn-red" data-add-id="${safe(product.id)}" data-add-weight="${safe(t.weight)}">+ Panier</button></div>`).join('') || `<p class="small-note">Tarifs à venir.</p>`}</div>`;
    const gallery = $('product-detail').querySelector('.bp-gallery');
    const track = gallery?.querySelector('.bp-gallery-track');
    // Met à jour les points et le compteur après un glissement au doigt.
    if (track) track.addEventListener('scroll', () => {
      const index = Math.max(0, Math.min(track.children.length - 1, Math.round(track.scrollLeft / (track.clientWidth || 1))));
      syncGalleryIndicators(gallery, index);
    }, { passive:true });
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
  function sendTatoOrder() {
    if (!cart.length) { notify('Ton panier est vide.'); return; }
    const message = formatOrderMessage();

    // TatoTalk : pas de paramètre officiel de préremplissage confirmé pour un profil.
    // On copie donc la commande AVANT d'ouvrir le profil TatoTalk.
    // execCommand reste utile dans certaines WebViews mobiles, car il est synchrone.
    let copied = false;
    const textarea = document.createElement('textarea');
    textarea.value = message;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none';
    document.body.appendChild(textarea);
    try {
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      copied = document.execCommand('copy');
    } catch (_) { /* Copier manuellement reste possible. */ }
    textarea.remove();

    // Repli sur l'API moderne si la copie synchrone n'a pas fonctionné.
    if (!copied && navigator.clipboard?.writeText) {
      try {
        navigator.clipboard.writeText(message)
          .then(() => notify('Commande copiée ! Colle-la dans TatoTalk puis envoie.'))
          .catch(() => notify('Copie bloquée : utilise « Copier le récapitulatif ».'));
      } catch (_) { notify('Utilise « Copier le récapitulatif ».'); }
    } else if (copied) {
      notify('Commande copiée ! Colle-la dans TatoTalk puis envoie.');
    } else {
      notify('Utilise « Copier le récapitulatif » si nécessaire.');
    }

    // Lien web de profil TatoTalk ; ouverture externe depuis la Mini App Telegram.
    // Si ce profil n’est pas accessible, rechercher @BPCOMMANDE dans TatoTalk.
    try {
      if (tg?.openLink) tg.openLink(ORDER_TATO_URL);
      else window.location.href = ORDER_TATO_URL;
    } catch (_) {
      window.location.href = ORDER_TATO_URL;
    }
  }

  // Actualise les textes de la confirmation sans imposer de modifier index.html.
  function setupTatoCheckoutUI() {
    const button = $('confirm-order-button');
    if (!button) return;
    button.innerHTML = '<svg style="width:18px;height:18px"><use href="#i-send"></use></svg> Copier et ouvrir TatoTalk';
    const info = button.closest('.actions-stack')?.previousElementSibling;
    if (info?.classList.contains('small-note')) {
      info.textContent = `Le récapitulatif sera copié, puis TatoTalk ouvrira @${ORDER_TATO_USERNAME}. Colle la commande dans la conversation et appuie sur Envoyer. Si le profil ne s’ouvre pas, recherche cet identifiant dans TatoTalk.`;
    }
    const intro = document.querySelector('#page-confirmation .page-heading p');
    if (intro) intro.textContent = 'Vérifie les détails avant de copier ta commande vers TatoTalk.';
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
    // Galerie produit : flèches + points (le swipe fonctionne aussi directement).
    const galleryArrow = closest('[data-gallery-move]');
    if (galleryArrow) {
      const gallery = galleryArrow.closest('.bp-gallery');
      const track = gallery?.querySelector('.bp-gallery-track');
      const current = Math.round((track?.scrollLeft || 0) / (track?.clientWidth || 1));
      setGalleryIndex(gallery, current + Number(galleryArrow.dataset.galleryMove));
      return;
    }
    const galleryDot = closest('[data-gallery-go]');
    if (galleryDot) {
      setGalleryIndex(galleryDot.closest('.bp-gallery'), Number(galleryDot.dataset.galleryGo));
      return;
    }
    const pageBtn=closest('.nav-item');
    if(pageBtn){const page=pageBtn.dataset.page;if(page==='page-home')navigate('page-home');else navigate(page);return;}
    if(closest('#brand-home') || closest('#back-to-farms') || closest('#empty-back') || closest('#empty-cart-back') || closest('#cart-continue-shopping')){navigate('page-home');return;}
    if(closest('#go-farms')){document.getElementById('farms-section')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
    if(closest('#home-cart-button')){cartPage();return;}
    const farmCard=closest('[data-farm-id]');if(farmCard){openFarm(farmCard.dataset.farmId);return;}
    const typeCard=closest('[data-product-type]');
    if(typeCard && hasTypeSelection(activeFarm)){
      activeType=typeCard.dataset.productType;
      renderFarmCollection();
      $('farm-collection-section')?.scrollIntoView({behavior:'smooth',block:'start'});
      return;
    }
    if(closest('#back-to-types') && hasTypeSelection(activeFarm)){
      activeType=null;
      renderFarmCollection();
      $('farm-collection-section')?.scrollIntoView({behavior:'smooth',block:'start'});
      return;
    }
    const productCard=closest('[data-product-id]');if(productCard){openProduct(productCard.dataset.productId);return;}
    if(closest('#back-to-products')){if(activeFarm){renderFarmCollection();navigate('page-farm');}else navigate('page-home');return;}
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
    if(closest('#confirm-order-button')){sendTatoOrder();return;}
    if(closest('#copy-order-btn')){copyText(formatOrderMessage());return;}
    const acc=closest('.accordion-header');if(acc){const row=acc.closest('.info-item');const open=!row.classList.contains('active');document.querySelectorAll('.info-item').forEach(el=>{el.classList.remove('active');el.querySelector('.accordion-header')?.setAttribute('aria-expanded','false');});row.classList.toggle('active',open);acc.setAttribute('aria-expanded',String(open));return;}
    if(closest('.close-modal') || closest('#image-modal') && !closest('#img-in-modal')){$('image-modal').classList.remove('show');$('image-modal').setAttribute('aria-hidden','true');return;}
  });
  document.addEventListener('keydown', event => {
    if (!event.target.matches?.('.bp-gallery-track')) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const track = event.target;
    const index = Math.round(track.scrollLeft / (track.clientWidth || 1));
    setGalleryIndex(track.closest('.bp-gallery'), index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){$('image-modal').classList.remove('show');$('image-modal').setAttribute('aria-hidden','true');}});
  try {tg?.ready();tg?.expand();tg?.setHeaderColor('#1b0d12');tg?.setBackgroundColor('#100c0f');}catch(_){}
  setupTatoCheckoutUI();
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
