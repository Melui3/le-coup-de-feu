import { useMemo, useState } from 'react'
import {
  Armchair,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChefHat,
  ChevronDown,
  Clock3,
  ExternalLink,
  Flame,
  HelpCircle,
  Mail,
  MapPin,
  Menu as MenuIcon,
  Phone,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Star,
  Utensils,
  Users,
  Wine,
  X,
} from 'lucide-react'

const navLinks = ['Menu', 'Réserver', 'Avis', 'Galerie', 'FAQ', 'Adresse']

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`

const filters = [
  { id: 'all', label: 'Tout', icon: Utensils },
  { id: 'entrees', label: 'Entrées', icon: Sparkles },
  { id: 'plats', label: 'Plats', icon: ChefHat },
  { id: 'desserts', label: 'Desserts', icon: Flame },
]

const menuItems = [
  {
    category: 'entrees',
    name: 'Carpaccio de betterave intimidée',
    description: "Dressé à la pince, jugé à voix basse, servi avec une vinaigrette qui refuse de s'excuser.",
    price: '17',
    verdict: 'Le chef a cligné des yeux. C’est notre meilleure note.',
  },
  {
    category: 'entrees',
    name: 'Ravioli solitaire sous cloche',
    description: 'Un unique ravioli fumant, posé comme une décision de justice sur porcelaine dorée.',
    price: '19',
    verdict: 'Portion idéale pour repartir fâché mais léger.',
  },
  {
    category: 'plats',
    name: 'Risotto al dente de la panique',
    description: 'Riz nacré, parmesan, champignons, minuteur agressif et soupçon de traumatisme collectif.',
    price: '31',
    verdict: 'Gordon est passé, le risotto a nié toute implication.',
  },
  {
    category: 'plats',
    name: 'Volaille basse température, humeur haute pression',
    description: 'Poulet fondant, jus corsé, légumes carbonisés avec une précision presque administrative.',
    price: '34',
    verdict: 'Cuit à 64°C, crié à 120 décibels.',
  },
  {
    category: 'plats',
    name: 'Saint-Jacques sauvées de justesse',
    description: 'Snackées, retournées, re-retournées, puis confiées à une assiette qui tremble encore.',
    price: '38',
    verdict: 'Le dressage survit, pas forcément l’équipe.',
  },
  {
    category: 'desserts',
    name: 'Soufflé effondré façon grand soir',
    description: 'Chocolat noir, flamme contrôlée et illusion de hauteur perdue au service.',
    price: '14',
    verdict: 'Il est tombé, mais avec du panache.',
  },
  {
    category: 'desserts',
    name: 'Tarte citron “mise au point”',
    description: 'Acide, nette, trop honnête. Elle vous dit ce que vos proches n’osent pas formuler.',
    price: '13',
    verdict: 'Le sucre est optionnel, la remise en question non.',
  },
]

const tables = [
  {
    id: 'terrasse-4',
    zone: 'Terrasse',
    label: 'Table 4',
    seats: '2-4',
    status: 'available',
    note: 'Vue sur les passants qui se demandent pourquoi ça crie.',
  },
  {
    id: 'cuisine-1',
    zone: 'Cuisine ouverte',
    label: 'Comptoir 1',
    seats: '2',
    status: 'cleaning',
    note: 'Encore 12 minutes de nettoyage et de négociation.',
  },
  {
    id: 'salon-8',
    zone: 'Salon rouge',
    label: 'Table 8',
    seats: '4-6',
    status: 'available',
    note: 'La plus calme, tant que personne ne commande le risotto.',
  },
  {
    id: 'chef-0',
    zone: 'Passe du chef',
    label: 'Table 0',
    seats: '2',
    status: 'closed',
    note: 'Fermée après un lancer d’assiette. Assurance en cours.',
  },
]

const statusCopy = {
  available: {
    label: 'Disponible',
    dot: 'bg-emerald-400',
    ring: 'border-emerald-400/55',
    text: 'text-emerald-200',
  },
  cleaning: {
    label: 'En cours de nettoyage',
    dot: 'bg-amber-400',
    ring: 'border-amber-400/55',
    text: 'text-amber-200',
  },
  closed: {
    label: 'Fermée après un lancer d’assiette',
    dot: 'bg-red-500',
    ring: 'border-red-500/55',
    text: 'text-red-200',
  },
}

const gallery = [
  {
    src: 'images/smoked-ravioli.png',
    title: 'Le ravioli qui a tout vu',
    caption: 'Une entrée, une cloche, beaucoup trop de fumée pour une seule bouchée.',
  },
  {
    src: 'images/terrace-tables.png',
    title: 'Terrasse sous surveillance',
    caption: 'Lampes de statut, velours rouge, murmures dorés et nappes qui savent.',
  },
  {
    src: 'images/collapsed-dessert.png',
    title: 'Soufflé post-traumatique',
    caption: 'Il devait monter. Il a choisi la sincérité.',
  },
]

const reviews = [
  {
    name: 'Mélanie D.',
    rating: 1,
    text: 'J’ai demandé une table tranquille. On m’a placée face à une audition de carottes.',
  },
  {
    name: 'Samir L.',
    rating: 1,
    text: 'Excellent dressage. Mon estime personnelle, elle, est repartie en cuisine.',
  },
  {
    name: 'Zoé P.',
    rating: 2,
    text: 'Le dessert était en feu, mais le serveur a dit que c’était “conceptuel”.',
  },
]

const faqs = [
  {
    question: 'Le chef est-il vraiment de bonne humeur ?',
    answer: 'Nous pouvons confirmer la présence du chef. Pour son humeur, notre service juridique préfère rester en retrait.',
  },
  {
    question: 'Les recettes troll sont-elles comestibles ?',
    answer: 'Oui, mais certaines sont surtout conçues pour tester votre relation au silence après la première bouchée.',
  },
  {
    question: 'Puis-je réserver la cuisine ouverte ?',
    answer: 'Oui, si vous acceptez les projections de vocabulaire, les minuteurs agressifs et les regards en diagonale.',
  },
  {
    question: 'Que signifient les couleurs de disponibilité ?',
    answer: 'Vert : disponible. Orange : nettoyage en cours. Rouge : fermée après incident de vaisselle à haute énergie.',
  },
]

const location = {
  address: '12 Rue de Lappe, 75011 Paris',
  note: 'Adresse de démonstration, restaurant 100% fictif',
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=2.3669%2C48.8508%2C2.3781%2C48.8566&layer=mapnik&marker=48.8537%2C2.3725',
  mapLink: 'https://www.openstreetmap.org/?mlat=48.8537&mlon=2.3725#map=17/48.8537/2.3725',
}

const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10)

function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [reservation, setReservation] = useState({
    date: today,
    time: '20:30',
    guests: '2',
    tableId: 'terrasse-4',
    name: '',
  })
  const [confirmation, setConfirmation] = useState(null)
  const [openFaq, setOpenFaq] = useState(faqs[0].question)

  const filteredMenu = useMemo(() => {
    if (activeFilter === 'all') return menuItems
    return menuItems.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  const selectedTable = tables.find((table) => table.id === reservation.tableId)
  const selectedStatus = selectedTable ? statusCopy[selectedTable.status] : null
  const canReserve = reservation.date && reservation.time && reservation.tableId && selectedTable?.status !== 'closed'

  function updateReservation(field, value) {
    setReservation((current) => ({ ...current, [field]: value }))
    setConfirmation(null)
  }

  function submitReservation(event) {
    event.preventDefault()
    if (!canReserve) return

    setConfirmation({
      table: selectedTable,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      name: reservation.name.trim() || 'Invité courageux',
    })
  }

  return (
    <div className="min-h-screen overflow-hidden bg-charcoal text-cream">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/10 bg-charcoal/82 backdrop-blur-xl">
        <nav className="section-shell flex min-h-16 flex-wrap items-center gap-3 py-3">
          <a href="#accueil" className="flex items-center gap-3 text-sm font-semibold">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-gold/60 bg-gold/10 text-gold">
              <Flame className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-xl">Le Coup de Feu</span>
          </a>
          <button
            type="button"
            title={mobileNavOpen ? 'Fermer la navigation' : 'Ouvrir la navigation'}
            aria-label={mobileNavOpen ? 'Fermer la navigation' : 'Ouvrir la navigation'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((open) => !open)}
            className="ml-auto grid h-10 w-10 place-items-center rounded-md border border-cream/12 bg-cream/5 text-cream transition hover:border-gold/60 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70 md:hidden"
          >
            {mobileNavOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <MenuIcon className="h-5 w-5" aria-hidden="true" />}
          </button>
          <div className="ml-auto hidden justify-end gap-2 text-sm text-cream/76 md:flex">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace('é', 'e')}`}
                className="rounded-md px-3 py-2 transition hover:bg-cream/8 hover:text-cream focus:outline-none focus:ring-2 focus:ring-gold/70"
              >
                {item}
              </a>
            ))}
          </div>
          {mobileNavOpen && (
            <div className="grid w-full grid-cols-2 gap-2 pb-1 text-sm text-cream/76 md:hidden">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace('é', 'e')}`}
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-md border border-cream/10 px-3 py-2 text-center transition hover:border-gold/60 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main id="accueil">
        <section className="relative isolate flex min-h-[76svh] items-center overflow-hidden pt-20 md:min-h-[82svh] md:pt-24">
          <img
            src={assetPath('images/hero-kitchen.png')}
            alt="Cuisine ouverte sombre avec flammes, cuivre et chef de dos"
            className="absolute inset-0 -z-20 h-full w-full object-cover motion-safe:animate-slow-pan"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/76 to-charcoal/26" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-charcoal to-transparent" />

          <div className="section-shell grid gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-3xl animate-fade-up">
              <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-gold/50 bg-charcoal/70 px-3 py-2 text-sm text-gold">
                <ChefHat className="h-4 w-4" aria-hidden="true" />
                Gastronomie sous pression, ego servi à part
              </p>
              <h1 className="font-display text-5xl leading-none text-cream md:text-7xl">Le Coup de Feu</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/82">
                Une salle noire charbon, des accents dorés, des recettes franchement troll et un chef
                qui promet une expérience mémorable, sans promettre qu’elle sera reposante.
              </p>
              <div className="mt-6 flex max-w-sm items-center gap-4 rounded-lg border border-gold/35 bg-charcoal/72 p-4 md:hidden">
                <Flame className="h-6 w-6 shrink-0 animate-ember text-flare" aria-hidden="true" />
                <div>
                  <p className="text-sm text-cream/70">Jours sans incendie en cuisine</p>
                  <p className="font-display text-4xl leading-none text-gold">120</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#reserver"
                  className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 font-semibold text-charcoal shadow-gold transition hover:-translate-y-0.5 hover:bg-cream focus:outline-none focus:ring-2 focus:ring-gold/70"
                >
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  Réserver une table
                </a>
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 rounded-md border border-cream/22 bg-charcoal/68 px-5 py-3 font-semibold text-cream transition hover:-translate-y-0.5 hover:border-gold/70 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70"
                >
                  <Utensils className="h-5 w-5" aria-hidden="true" />
                  Voir le menu
                </a>
              </div>
            </div>

            <div className="glass-panel hidden animate-fade-up rounded-lg p-5 shadow-glow [animation-delay:160ms] md:block">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm uppercase text-cream/58">Compteur officiel</p>
                <Flame className="h-5 w-5 animate-ember text-flare" aria-hidden="true" />
              </div>
              <p className="mt-4 text-sm text-cream/72">Jours sans incendie en cuisine</p>
              <div className="mt-3 flex gap-2 font-display text-6xl leading-none text-gold">
                {'120'.split('').map((digit, index) => (
                  <span
                    key={`${digit}-${index}`}
                    className="grid h-20 w-14 place-items-center rounded-md border border-gold/35 bg-black/34"
                  >
                    {digit}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-cream/66">Le dernier zéro est sous surveillance rapprochée.</p>
            </div>
          </div>
        </section>

        <section id="menu" className="border-y border-cream/10 bg-black/18 py-20">
          <div className="section-shell">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm text-gold">
                  <Utensils className="h-4 w-4" aria-hidden="true" />
                  Menu filtrable
                </p>
                <h2 className="font-display text-4xl md:text-5xl">Assiettes à haut risque</h2>
              </div>
              <div className="flex flex-wrap gap-2" aria-label="Filtrer le menu">
                {filters.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveFilter(id)}
                    className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-gold/70 ${
                      activeFilter === id
                        ? 'border-gold bg-gold text-charcoal'
                        : 'border-cream/14 bg-cream/5 text-cream/78 hover:border-gold/60 hover:text-gold'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {filteredMenu.map((item) => (
                <article
                  key={item.name}
                  className="rounded-lg border border-cream/10 bg-cream/[0.035] p-5 transition hover:-translate-y-1 hover:border-gold/42 hover:bg-cream/[0.055]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase text-gold">{filters.find((filter) => filter.id === item.category)?.label}</p>
                      <h3 className="mt-2 text-xl font-semibold text-cream">{item.name}</h3>
                    </div>
                    <p className="rounded-md border border-gold/38 bg-gold/10 px-3 py-1 font-display text-2xl text-gold">
                      {item.price}€
                    </p>
                  </div>
                  <p className="mt-4 leading-7 text-cream/76">{item.description}</p>
                  <p className="mt-4 border-l-2 border-flare/70 pl-3 text-sm text-cream/66">{item.verdict}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reserver" className="py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm text-gold">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Réservation avec calendrier
              </p>
              <h2 className="font-display text-4xl md:text-5xl">Choisissez votre niveau de turbulence</h2>
              <p className="mt-5 leading-8 text-cream/74">
                Terrasse, salon rouge, cuisine ouverte ou passe du chef : chaque table possède son statut,
                sa petite tension et son risque narratif.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {Object.entries(statusCopy).map(([key, status]) => (
                  <div key={key} className={`rounded-lg border ${status.ring} bg-cream/[0.035] p-4`}>
                    <span className={`mb-3 block h-3 w-3 rounded-full ${status.dot}`} />
                    <p className={`text-sm font-semibold ${status.text}`}>{status.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={submitReservation} className="glass-panel rounded-lg p-5 shadow-glow sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-cream/72">
                    <Users className="h-4 w-4 text-gold" aria-hidden="true" />
                    Nom
                  </span>
                  <input
                    value={reservation.name}
                    onChange={(event) => updateReservation('name', event.target.value)}
                    placeholder="Invité courageux"
                    className="w-full rounded-md border border-cream/12 bg-black/32 px-4 py-3 text-cream outline-none transition placeholder:text-cream/36 focus:border-gold"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-cream/72">
                    <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
                    Date
                  </span>
                  <input
                    type="date"
                    min={today}
                    value={reservation.date}
                    onChange={(event) => updateReservation('date', event.target.value)}
                    className="w-full rounded-md border border-cream/12 bg-black/32 px-4 py-3 text-cream outline-none transition focus:border-gold"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-cream/72">
                    <Clock3 className="h-4 w-4 text-gold" aria-hidden="true" />
                    Horaire
                  </span>
                  <select
                    value={reservation.time}
                    onChange={(event) => updateReservation('time', event.target.value)}
                    className="w-full rounded-md border border-cream/12 bg-black/32 px-4 py-3 text-cream outline-none transition focus:border-gold"
                  >
                    {['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map((time) => (
                      <option key={time}>{time}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-cream/72">
                    <Wine className="h-4 w-4 text-gold" aria-hidden="true" />
                    Convives
                  </span>
                  <select
                    value={reservation.guests}
                    onChange={(event) => updateReservation('guests', event.target.value)}
                    className="w-full rounded-md border border-cream/12 bg-black/32 px-4 py-3 text-cream outline-none transition focus:border-gold"
                  >
                    {['1', '2', '3', '4', '5', '6'].map((count) => (
                      <option key={count}>{count}</option>
                    ))}
                  </select>
                </label>
              </div>

              <fieldset className="mt-6">
                <legend className="mb-3 flex items-center gap-2 text-sm text-cream/72">
                  <Armchair className="h-4 w-4 text-gold" aria-hidden="true" />
                  Choix de la table
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {tables.map((table) => {
                    const status = statusCopy[table.status]
                    const selected = table.id === reservation.tableId
                    return (
                      <button
                        key={table.id}
                        type="button"
                        disabled={table.status === 'closed'}
                        onClick={() => updateReservation('tableId', table.id)}
                        className={`min-h-36 rounded-lg border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-gold/70 disabled:cursor-not-allowed disabled:opacity-58 ${
                          selected
                            ? 'border-gold bg-gold/12 shadow-gold'
                            : 'border-cream/12 bg-cream/[0.035] hover:border-gold/52'
                        }`}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span>
                            <span className="block text-xs uppercase text-gold">{table.zone}</span>
                            <span className="mt-1 block text-lg font-semibold text-cream">{table.label}</span>
                          </span>
                          <span className={`h-3 w-3 rounded-full ${status.dot}`} />
                        </span>
                        <span className={`mt-3 block text-sm font-semibold ${status.text}`}>{status.label}</span>
                        <span className="mt-2 block text-sm leading-6 text-cream/62">{table.seats} pers. · {table.note}</span>
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={!canReserve}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-flare px-5 py-3 font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-ember focus:outline-none focus:ring-2 focus:ring-gold/70 disabled:cursor-not-allowed disabled:bg-cream/12 disabled:text-cream/44"
              >
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                Confirmer la réservation
              </button>

              {confirmation && (
                <div className="mt-5 rounded-lg border border-emerald-400/45 bg-emerald-400/10 p-4 text-emerald-50">
                  <p className="font-semibold">✅ Votre réservation est confirmée.</p>
                  <p className="mt-2 text-sm leading-6">
                    {confirmation.name}, {confirmation.guests} couvert(s), {confirmation.table.zone} le {confirmation.date} à{' '}
                    {confirmation.time}. Nous ne pouvons cependant pas garantir que le chef sera de bonne humeur.
                  </p>
                  {confirmation.table.status === 'cleaning' && (
                    <p className="mt-2 text-sm text-amber-100">La table est en nettoyage : arrivée conseillée avec 12 minutes de retard stratégique.</p>
                  )}
                </div>
              )}

              {selectedStatus && !confirmation && (
                <p className={`mt-4 text-sm ${selectedStatus.text}`}>
                  Statut sélectionné : {selectedStatus.label}
                </p>
              )}
            </form>
          </div>
        </section>

        <section id="avis" className="border-y border-cream/10 bg-cream/[0.035] py-20">
          <div className="section-shell">
            <div className="max-w-2xl">
              <p className="mb-3 flex items-center gap-2 text-sm text-gold">
                <Star className="h-4 w-4" aria-hidden="true" />
                Avis clients catastrophiques
              </p>
              <h2 className="font-display text-4xl md:text-5xl">Ils sont venus. Ils ont commenté.</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <article key={review.name} className="rounded-lg border border-cream/10 bg-charcoal/72 p-5">
                  <div className="flex gap-1 text-gold" aria-label={`${review.rating} étoiles sur 5`}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`${review.name}-${index}`}
                        className={`h-4 w-4 ${index < review.rating ? 'fill-gold' : 'opacity-24'}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="mt-5 min-h-24 leading-7 text-cream/78">“{review.text}”</p>
                  <p className="mt-4 text-sm font-semibold text-cream">{review.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="galerie" className="py-20">
          <div className="section-shell">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm text-gold">
                  <Camera className="h-4 w-4" aria-hidden="true" />
                  Galerie
                </p>
                <h2 className="font-display text-4xl md:text-5xl">Preuves visuelles du service</h2>
              </div>
              <p className="max-w-md leading-7 text-cream/68">
                Photos originales générées pour l’ambiance : aucun logo, aucune copie, juste la tension.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {gallery.map((item) => (
                <figure key={item.title} className="group overflow-hidden rounded-lg border border-cream/10 bg-cream/[0.035]">
                  <img
                    src={assetPath(item.src)}
                    alt={item.title}
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                  />
                  <figcaption className="p-4">
                    <p className="font-semibold text-cream">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-cream/66">{item.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="border-y border-cream/10 bg-black/18 py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm text-gold">
                <HelpCircle className="h-4 w-4" aria-hidden="true" />
                FAQ
              </p>
              <h2 className="font-display text-4xl md:text-5xl">Questions avant de s’asseoir</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.question
                return (
                  <article key={faq.question} className="rounded-lg border border-cream/10 bg-cream/[0.035]">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? '' : faq.question)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-cream focus:outline-none focus:ring-2 focus:ring-gold/70"
                    >
                      {faq.question}
                      <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {isOpen && <p className="px-5 pb-5 leading-7 text-cream/70">{faq.answer}</p>}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="adresse" className="py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="overflow-hidden rounded-lg border border-cream/10 bg-black/28 shadow-glow">
              <div className="relative min-h-96">
                <iframe
                  title="Carte OpenStreetMap de l'adresse fictive du Coup de Feu"
                  src={location.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[18%] saturate-[0.78]"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-charcoal/62 to-transparent" />
              </div>
              <div className="flex flex-col gap-4 border-t border-cream/10 bg-charcoal/92 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="flex items-center gap-2 font-semibold text-cream">
                    <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
                    {location.address}
                  </p>
                  <p className="mt-1 text-sm text-cream/58">{location.note}</p>
                </div>
                <a
                  href={location.mapLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/50 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/70"
                >
                  Ouvrir la carte
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <p className="mb-3 flex items-center gap-2 text-sm text-gold">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Localisation et horaires
              </p>
              <h2 className="font-display text-4xl md:text-5xl">Ouvert quand la cuisine accepte</h2>
              <p className="mt-5 leading-8 text-cream/74">
                Nous sommes théoriquement posés près de Bastille. En pratique, toute réservation reste une simulation :
                personne ne vous attendra avec un siphon et un regard sévère.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  ['Mardi - Jeudi', '19:00 - 23:00'],
                  ['Vendredi - Samedi', '19:00 - 00:30'],
                  ['Dimanche', 'Brunch de récupération · 11:30 - 15:00'],
                  ['Lundi', 'Fermé, thérapie de brigade'],
                ].map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between gap-4 border-b border-cream/10 py-3">
                    <span className="text-cream/72">{day}</span>
                    <span className="text-right font-semibold text-cream">{hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-lg border border-gold/32 bg-gold/10 p-5">
                <p className="font-semibold text-gold">Chef du service : Gordon, évidemment.</p>
                <p className="mt-2 leading-7 text-cream/72">
                  Présence textuelle, pas de sosie, pas de logo : juste le niveau d’exigence qui regarde votre cuisson.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-cream/10 bg-black/42">
        <div className="section-shell py-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.9fr_0.8fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-gold/60 bg-gold/10 text-gold">
                  <Flame className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-2xl">Le Coup de Feu</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-6 text-cream/64">
                Restaurant gastronomique fictif, expérience web réelle. Les assiettes sont inventées,
                les réservations restent dans le navigateur, le chef ne lit heureusement pas ce footer.
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase text-gold">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Contact
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-cream/68">
                <li>{location.address}</li>
                <li className="text-cream/50">{location.note}</li>
                <li>
                  <a className="inline-flex items-center gap-2 transition hover:text-gold" href="tel:+33100000012">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    +33 1 00 00 00 12
                  </a>
                </li>
                <li>
                  <a className="inline-flex items-center gap-2 transition hover:text-gold" href="mailto:reservation@lecoupdefeu.example">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    reservation@lecoupdefeu.example
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase text-gold">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                Service
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-cream/68">
                <li>Mardi - Jeudi · 19:00 - 23:00</li>
                <li>Vendredi - Samedi · 19:00 - 00:30</li>
                <li>Dimanche · 11:30 - 15:00</li>
                <li>Lundi · brigade indisponible émotionnellement</li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase text-gold">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Légal et RGPD
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-cream/68">
                <li className="flex gap-2">
                  <ReceiptText className="mt-0.5 h-4 w-4 shrink-0 text-cream/44" aria-hidden="true" />
                  SIRET 000 000 000 00000, société délibérément fictive.
                </li>
                <li>TVA FR00-FEU-DEMO-00, valable uniquement dans une assiette imaginaire.</li>
                <li>Aucun cookie de suivi. Aucune donnée envoyée. Aucune brigade réellement prévenue.</li>
                <li>DPO : dpo-qui-soupire@lecoupdefeu.example</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-cream/10 pt-6 text-sm text-cream/52 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Le Coup de Feu. Site vitrine fictif, conformité dramatique incluse.</p>
            <div className="flex flex-wrap gap-2">
              {['Mentions légales factices', 'Confidentialité locale', 'Cookies inexistants', 'Plan de salle à risque'].map((link) => (
                <a
                  key={link}
                  href="#accueil"
                  className="rounded-md border border-cream/10 px-3 py-2 transition hover:border-gold/60 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
