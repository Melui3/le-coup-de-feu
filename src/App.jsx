import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Flame, Menu, X } from 'lucide-react'

const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`
const dishes = [
  { name: 'Le Wellington. Point final.', category: 'plats', price: 42, image: 'wellington.webp', tag: 'La signature du chef', description: 'Bœuf rosé, duxelles de champignons, feuilletage doré et jus au vin rouge.', verdict: 'La cuisson ne se négocie pas.' },
  { name: 'Saint-Jacques, sans appel.', category: 'entrees', price: 24, image: 'scallops.webp', tag: 'Trois pièces. Zéro excuse.', description: 'Saint-Jacques saisies, crème de chou-fleur et beurre noisette.', verdict: 'Dorées dehors. Nacrées dedans. Oui, chef.' },
  { name: 'La douceur après l’orage.', category: 'desserts', price: 14, image: 'toffee.webp', tag: 'Sticky toffee pudding', description: 'Gâteau moelleux aux dattes, caramel chaud et glace vanille.', verdict: 'Enfin quelqu’un qui fait baisser la pression.' },
  { name: 'Risotto sous haute surveillance', category: 'plats', price: 36, description: 'Riz carnaroli, homard, bisque et parmesan affiné.', verdict: 'Une minute de trop, et tout le monde le sait.' },
  { name: 'Betterave, tenue irréprochable', category: 'entrees', price: 17, description: 'Betterave rôtie, chèvre frais, noisettes et vinaigrette aux agrumes.', verdict: 'Même les légumes passent un entretien.' },
  { name: 'Citron, dernière mise au point', category: 'desserts', price: 13, description: 'Crémeux citron, sablé au beurre et meringue légèrement brûlée.', verdict: 'Acide. Précis. Le chef se reconnaît.' },
]
const tables = [
  { id: 'terrasse', name: 'La terrasse', max: 4, status: 'Disponible', note: 'Un peu d’air. Beaucoup de recul.' },
  { id: 'comptoir', name: 'Le passe du chef', max: 2, status: 'Disponible', note: 'Aux premières loges. Vous êtes prévenus.' },
  { id: 'salon', name: 'Le salon', max: 6, status: 'Disponible', note: 'Le calme avant le prochain bon.' },
  { id: 'cuisine', name: 'La cuisine ouverte', max: 4, status: 'En nettoyage', note: 'La brigade remet les compteurs à zéro.' },
]
const faqs = [
  ['C’est vraiment Hell’s Kitchen ?', 'Le Coup de Feu est un restaurant fictif et un hommage indépendant à l’énergie des concours culinaires. Il n’est affilié ni à Hell’s Kitchen ni à Gordon Ramsay.'],
  ['La réservation est-elle réelle ?', 'Non. Le ticket est une simulation affichée dans votre navigateur. Aucune réservation et aucune donnée du formulaire ne sont envoyées.'],
  ['Rouge ou bleue : qu’est-ce que ça change ?', 'Vous choisissez votre camp : l’ambiance visuelle, la réponse du chef et votre ticket suivent votre brigade. Dans l’assiette, même niveau d’exigence.'],
  ['Et les allergies ou régimes particuliers ?', 'La carte est fictive. Pour une véritable sortie au restaurant, les ingrédients et allergènes seraient à confirmer directement auprès de l’établissement.'],
]
const nav = [['menu', 'La carte'], ['brigades', 'Les brigades'], ['galerie', 'Les coulisses']]
const localDate = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` }

export default function App() {
  const [brigade, setBrigade] = useState('red')
  const [chosen, setChosen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [mobile, setMobile] = useState(false)
  const [incident, setIncident] = useState(false)
  const [faq, setFaq] = useState(null)
  const [booking, setBooking] = useState({ name: '', date: localDate(), time: '20:30', guests: '2', table: 'terrasse' })
  const [ticket, setTicket] = useState(null)
  const [showMap, setShowMap] = useState(false)
  const ticketRef = useRef(null)
  const filtered = useMemo(() => dishes.filter(d => filter === 'all' || d.category === filter), [filter])
  const selectedTable = tables.find(t => t.id === booking.table)
  const valid = booking.date >= localDate() && selectedTable?.status === 'Disponible' && Number(booking.guests) <= selectedTable.max
  useEffect(() => { if (ticket) ticketRef.current?.focus({ preventScroll: true }) }, [ticket])
  useEffect(() => {
    if (!mobile) return
    const escape = e => { if (e.key === 'Escape') setMobile(false) }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [mobile])
  function update(field, value) {
    setBooking(b => ({ ...b, [field]: value, ...(field === 'guests' && Number(value) > (tables.find(t => t.id === b.table)?.max || 0) ? { table: '' } : {}) }))
    setTicket(null)
  }
  function reserve(e) { e.preventDefault(); if (valid) setTicket({ ...booking, brigade, tableName: selectedTable.name }) }
  const teamName = brigade === 'red' ? 'rouge' : 'bleue'
  return (
    <div className={`site team-${brigade}`}>
      <a className="skip-link" href="#main">Aller au contenu</a>
      <header className="header">
        <a className="brand" href="#accueil" aria-label="Le Coup de Feu, accueil"><Flame /><span>LE COUP DE FEU<small>CUISINE SOUS PRESSION</small></span></a>
        <nav className="desktop-nav" aria-label="Navigation principale">{nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}<a className="nav-book" href="#reserver">À table <ArrowUpRight size={16}/></a></nav>
        <button className="mobile-toggle" aria-label={mobile ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={mobile} aria-controls="mobile-nav" onClick={() => setMobile(!mobile)}>{mobile ? <X/> : <Menu/>}</button>
        {mobile && <nav id="mobile-nav" className="mobile-nav" aria-label="Navigation mobile">{[...nav,['reserver','Réserver une table']].map(([id,label]) => <a key={id} href={`#${id}`} onClick={()=>setMobile(false)}>{label}<ArrowUpRight size={18}/></a>)}</nav>}
      </header>
      <main id="main">
        <section id="accueil" className="hero">
          <img className="hero-image" src={asset('service-v2.webp')} alt="Une brigade en plein service dresse les assiettes sous les lampes du passe" width="1672" height="941" fetchPriority="high"/>
          <div className="hero-shade"/>
          <div className="hero-content shell">
            <p className="eyebrow"><span className="signal"/> PARIS, BASTILLE · LE SERVICE VA COMMENCER</p>
            <h1>LA CUISSON<br/>EST PRÉCISE.<br/><span>L’AMBIANCE,</span><br/><em>MOINS.</em></h1>
            <p className="hero-intro">Des assiettes impeccables. Une brigade sous pression.<br className="desktop-break"/> Bienvenue au Coup de Feu.</p>
            <div className="actions"><a className="button primary" href="#reserver">Réserver une table <ArrowUpRight size={18}/></a><a className="text-link" href="#menu">Découvrir les plats <ArrowDown size={16}/></a></div>
          </div>
          <button className={`incident ${incident ? 'incident-active' : ''}`} onClick={()=>setIncident(!incident)} aria-label={incident ? 'Remettre le compteur à 120 jours' : 'Déclencher le gag du compteur incendie'}><span className="eyebrow">JOURS SANS INCENDIE</span><strong key={String(incident)}>{incident ? '000' : '120'}<Flame size={25}/></strong><span aria-live="polite">{incident ? 'On avait dit : pas de flambage.' : 'Ne touchez surtout pas à ce compteur.'}</span></button>
          <div className="hero-bottom"><span>01 / LE COUP DE FEU</span><span>LA PRESSION RESTE EN CUISINE. OU PRESQUE.</span><a href="#menu" aria-label="Découvrir la carte"><ArrowDown size={19}/></a></div>
        </section>
        <div className="service-strip" aria-label="Notre philosophie"><span>DU FEU.</span><span>DU GOÛT.</span><Flame aria-hidden="true"/><span>ZÉRO EXCUSE.</span><span className="strip-aside">OUI, CHEF.</span></div>
        <section id="menu" className="menu-section shell section">
          <div className="section-heading"><div><p className="eyebrow accent">01 — VALIDÉ AU PASSE</p><h2>Le goût du risque.<br/><span>La maîtrise en plus.</span></h2></div><p>Le spectacle est en cuisine.<br/>Dans votre assiette, on reste très sérieux.</p></div>
          <div className="filters" role="group" aria-label="Filtrer la carte">{[['all','Toute la carte'],['entrees','Entrées'],['plats','Plats'],['desserts','Desserts']].map(([id,label])=><button key={id} aria-pressed={filter===id} className={filter===id?'active':''} onClick={()=>setFilter(id)}>{label}</button>)}</div>
          <div className="dish-grid">{filtered.filter(d=>d.image).map((dish)=><article className="dish" key={dish.name}><div className="dish-photo"><img src={asset(dish.image)} alt={dish.description} width="1000" height="750" loading="lazy"/><span className="dish-label">{dish.tag}</span></div><div className="dish-title"><h3>{dish.name}</h3><span>{dish.price} €</span></div><p>{dish.description}</p><div className="verdict"><Check size={14}/>{dish.verdict}</div></article>)}</div>
          <div className="menu-list">{filtered.filter(d=>!d.image).map(d=><article key={d.name}><div><h3>{d.name}</h3><p>{d.description}</p></div><span>{d.price} €</span></article>)}</div>
          <p className="menu-footnote">CARTE DE DÉMONSTRATION · PRIX FICTIFS · EXIGENCE BIEN RÉELLE</p>
        </section>
        <section id="brigades" className="brigade-section section"><div className="shell"><div className="section-heading"><div><p className="eyebrow accent">02 — CHOISISSEZ VOTRE CAMP</p><h2>Deux brigades.<br/>Une seule obsession.</h2></div><p>Rouge ou bleue ? Faites votre choix.<br/>Le chef attend votre réponse.</p></div><div className="team-grid">{[['red','01','ROUGE','Le feu sacré.','Instinct, audace et cuissons au cordeau.'],['blue','02','BLEUE','Le sang-froid.','Précision, maîtrise et nerfs d’acier.']].map(([id,number,name,title,copy])=><button className={`team-card ${id} ${brigade===id?'selected':''}`} key={id} aria-pressed={brigade===id} onClick={()=>{setBrigade(id);setChosen(true);setTicket(null)}}><span className="team-top">BRIGADE / {number}<span>{brigade===id ? <Check size={20}/> : <ArrowUpRight size={20}/>}</span></span><strong>{name}</strong><h3>{title}</h3><p>{copy}</p><span className="team-bottom">{brigade===id?'VOUS ÊTES DANS LA BRIGADE':'REJOINDRE LA BRIGADE'} <ArrowUpRight size={17}/></span></button>)}</div><p className="chef-reply" aria-live="polite" key={`${brigade}-${chosen}`}><span>LE CHEF</span> {chosen ? (brigade==='red'?'« De l’audace ? Très bien. Maintenant, envoyez ! »':'« Du sang-froid ? Parfait. Je veux un service impeccable. »') : '« Choisissez une couleur. L’exigence reste la même. »'}</p></div></section>
        <section id="reserver" className="section booking-section shell"><div className="booking-intro"><p className="eyebrow accent">03 — LE PROCHAIN SERVICE</p><h2>Votre table.<br/>Leur pression.</h2><p>Une place au cœur de l’action ou un peu de distance avec le passe ? À vous de choisir.</p><div className="service-note"><Flame/><div><strong>Brigade {teamName}</strong><p>Votre camp est choisi. Votre appétit fera le reste.</p></div></div><p className="simulation-note">Expérience fictive : ce formulaire génère un ticket de démonstration, sans envoi de données.</p></div>
          <form className="booking-form" onSubmit={reserve}><div className="form-heading"><span>BON DE RÉSERVATION</span><span>N° 001</span></div><div className="form-grid"><label>Votre nom<input autoComplete="name" value={booking.name} onChange={e=>update('name',e.target.value)} placeholder="Invité courageux" maxLength={80}/></label><label>Date du service<input type="date" required min={localDate()} value={booking.date} onChange={e=>update('date',e.target.value)}/></label><label>Horaire<select value={booking.time} onChange={e=>update('time',e.target.value)}>{['19:00','19:30','20:00','20:30','21:00','21:30'].map(t=><option key={t}>{t}</option>)}</select></label><label>Convives<select value={booking.guests} onChange={e=>update('guests',e.target.value)}>{[1,2,3,4,5,6].map(n=><option value={n} key={n}>{n} personne{n>1?'s':''}</option>)}</select></label></div><fieldset><legend>Votre place dans le service</legend><div className="table-grid">{tables.map(t=>{const unavailable=t.status!=='Disponible'||Number(booking.guests)>t.max;return <button key={t.id} type="button" disabled={unavailable} aria-pressed={booking.table===t.id} className={`table-choice ${booking.table===t.id?'selected':''}`} onClick={()=>update('table',t.id)}><strong>{t.name}</strong><span>{t.note}</span><small><i className={unavailable?'unavailable':''}/>{t.status!=='Disponible'?t.status:Number(booking.guests)>t.max?'Capacité insuffisante':`1–${t.max} personnes`}</small></button>})}</div></fieldset>{!valid&&<p className="form-help" role="status">Choisissez une date à venir et une table adaptée à votre groupe.</p>}<button className="button primary book-submit" disabled={!valid}>Envoyer au passe <ArrowUpRight size={18}/></button>{ticket&&<div ref={ticketRef} tabIndex={-1} className="ticket" role="status"><div className="ticket-top">LE COUP DE FEU <Flame size={18}/></div><span className="ticket-stamp">OUI, CHEF !</span><h3>Votre place est au passe.</h3><p>{ticket.name.trim()||'Invité courageux'}</p><dl><div><dt>Service</dt><dd>{new Date(`${ticket.date}T12:00:00`).toLocaleDateString('fr-FR')} · {ticket.time}</dd></div><div><dt>Table</dt><dd>{ticket.tableName}</dd></div><div><dt>Couverts</dt><dd>{ticket.guests}</dd></div><div><dt>Brigade</dt><dd>{ticket.brigade==='red'?'Rouge':'Bleue'}</dd></div></dl><small>TICKET DE DÉMONSTRATION · AUCUNE RÉSERVATION RÉELLE</small></div>}</form>
        </section>
        <section id="galerie" className="backstage"><img src={asset('service-v2.webp')} width="1672" height="941" alt="Les gestes précis de la brigade pendant le coup de feu" loading="lazy"/><div className="shell backstage-copy"><p className="eyebrow">04 — DE L’AUTRE CÔTÉ DU PASSE</p><h2>Ça s’agite.<br/>Ça s’applique.<br/><em>Ça envoie.</em></h2><p>Des gestes précis, des bons qui s’accumulent.<br/>Et ce silence, juste avant « Service ! ».</p></div></section>
        <section className="section shell after-service"><div className="terrace"><img src={asset('terrace.webp')} alt="La terrasse aux banquettes rouges et aux lumières tamisées" width="900" height="900" loading="lazy"/><span>LA TERRASSE · LE CALME APRÈS LE FEU</span></div><div id="avis"><p className="eyebrow accent">PAROLES DE SURVIVANTS</p><h2>Ils ont goûté.<br/>Ils s’en souviennent.</h2><blockquote>« Le Wellington était parfait. J’ai quand même dit “oui, chef” en payant. »<cite>MÉLANIE D. — AVIS FICTIF</cite></blockquote><blockquote>« Une brigade sous pression. Un dessert qui remet tout le monde d’accord. »<cite>SAMIR L. — AVIS FICTIF</cite></blockquote></div></section>
        <section className="faq-section section shell" id="faq"><div><p className="eyebrow accent">AVANT DE PASSER À TABLE</p><h2>Une dernière<br/>question ?</h2></div><div>{faqs.map(([question,answer],i)=><article className="faq" key={question}><h3><button onClick={()=>setFaq(faq===i?null:i)} aria-expanded={faq===i} aria-controls={`answer-${i}`}>{question}<ChevronDown className={faq===i?'rotate':''} size={18}/></button></h3><div id={`answer-${i}`} hidden={faq!==i}><p>{answer}</p></div></article>)}</div></section>
        <section id="adresse" className="address shell"><div><p className="eyebrow accent">LE POINT DE RENDEZ-VOUS</p><h2>Bastille.<br/>Forcément.</h2><p>12 rue de Lappe, Paris 11e<br/><small>Adresse de démonstration — restaurant fictif</small></p><dl className="hours"><div><dt>Mardi — jeudi</dt><dd>19 h — 23 h</dd></div><div><dt>Vendredi — samedi</dt><dd>19 h — 00 h 30</dd></div><div><dt>Dimanche</dt><dd>Brunch · 11 h 30 — 15 h</dd></div><div><dt>Lundi</dt><dd>Repos de la brigade</dd></div></dl><a className="text-link" href="https://www.openstreetmap.org/?mlat=48.8537&mlon=2.3725#map=17/48.8537/2.3725" target="_blank" rel="noreferrer">Ouvrir la carte <ArrowUpRight size={16}/></a></div><div className="map-panel">{showMap ? <iframe title="Quartier de Bastille, adresse fictive du restaurant" src="https://www.openstreetmap.org/export/embed.html?bbox=2.3669%2C48.8508%2C2.3781%2C48.8566&layer=mapnik&marker=48.8537%2C2.3725" loading="lazy" referrerPolicy="no-referrer"/> : <div className="map-placeholder"><span className="map-mark"><Flame size={34}/></span><p className="eyebrow">PARIS XI · BASTILLE</p><h3>Le feu a son adresse.</h3><p>12 rue de Lappe<br/>Adresse fictive de démonstration</p><button type="button" className="button primary" onClick={()=>setShowMap(true)}>Afficher la carte <ArrowUpRight size={16}/></button><small>Carte interactive fournie par OpenStreetMap.</small></div>}</div></section>
      </main>
      <footer className="footer shell"><a href="#accueil" className="brand"><Flame/><span>LE COUP DE FEU<small>LE CHEF NE LIT PAS LES PETITES LIGNES.</small></span></a><p>Restaurant fictif · Hommage indépendant à Hell’s Kitchen.<br/>Sans affiliation à l’émission ou à Gordon Ramsay. Visuels générés par IA.</p><div><span>© 2026 LE COUP DE FEU</span><a href="#faq">À propos de cette expérience <ArrowUpRight size={14}/></a></div></footer>
    </div>
  )
}
