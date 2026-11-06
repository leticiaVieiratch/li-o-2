import { useMemo, useState } from 'react'
import './App.css'

type Cafe = {
  id: number
  name: string
  neighborhood: string
  description: string
  image: string
  rating: string
  price: string
  tags: string[]
  category: string[]
}

const cafes: Cafe[] = [
  {
    id: 1,
    name: 'Floresta Café',
    neighborhood: 'Pinheiros',
    description: 'Um jardim secreto no meio da cidade. Vai sem pressa.',
    image:
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=85',
    rating: '4,9',
    price: '$$',
    tags: ['🌿 Ao ar livre', '🐾 Pet friendly'],
    category: ['Ao ar livre', 'Com pets'],
  },
  {
    id: 2,
    name: 'Pingo de Luz',
    neighborhood: 'Vila Madalena',
    description: 'Café coado, bolo quentinho e luz bonita de manhã.',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
    rating: '4,8',
    price: '$$',
    tags: ['☀️ Luz natural', '💻 Pra trabalhar'],
    category: ['Pra trabalhar'],
  },
  {
    id: 3,
    name: 'Casa Amora',
    neighborhood: 'Jardins',
    description: 'Pequeno, aconchegante e com um cheesecake dos sonhos.',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85',
    rating: '4,9',
    price: '$$$',
    tags: ['🍰 Doces incríveis', '🪴 Aconchegante'],
    category: [],
  },
  {
    id: 4,
    name: 'Grão de Rua',
    neighborhood: 'Centro',
    description: 'Café especial e gente interessante entrando e saindo.',
    image:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=85',
    rating: '4,7',
    price: '$',
    tags: ['💻 Pra trabalhar', '☕ Café especial'],
    category: ['Pra trabalhar'],
  },
  {
    id: 5,
    name: 'Quintal do Sol',
    neighborhood: 'Perdizes',
    description: 'Mesinhas no quintal, sombra fresca e pão de queijo.',
    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85',
    rating: '4,8',
    price: '$$',
    tags: ['🌿 Ao ar livre', '🐾 Pet friendly'],
    category: ['Ao ar livre', 'Com pets'],
  },
  {
    id: 6,
    name: 'Nuvem Baixa',
    neighborhood: 'Pinheiros',
    description: 'Um cantinho tranquilo para colocar as ideias no lugar.',
    image:
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=85',
    rating: '4,9',
    price: '$$',
    tags: ['🤫 Bem quietinho', '💻 Pra trabalhar'],
    category: ['Pra trabalhar'],
  },
]

const filters = ['Todos', 'Pra trabalhar', 'Com pets', 'Ao ar livre']

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [surprise, setSurprise] = useState<number | null>(null)

  const visibleCafes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
    return cafes.filter((cafe) => {
      const matchesQuery =
        !normalizedQuery ||
        `${cafe.name} ${cafe.neighborhood} ${cafe.description} ${cafe.tags.join(' ')}`
          .toLocaleLowerCase('pt-BR')
          .includes(normalizedQuery)
      const matchesFilter =
        activeFilter === 'Todos' || cafe.category.includes(activeFilter)
      const matchesFavorites = !showFavorites || favorites.includes(cafe.id)
      return matchesQuery && matchesFilter && matchesFavorites
    })
  }, [activeFilter, favorites, query, showFavorites])

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favorite) => favorite !== id)
        : [...current, id],
    )
  }

  function pickSurprise() {
    const options = visibleCafes.length > 0 ? visibleCafes : cafes
    const pick = options[Math.floor(Math.random() * options.length)]
    setSurprise(pick.id)
    document.getElementById(`cafe-${pick.id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#" aria-label="Pausa, início">
          <span className="brand-mark">p.</span>
          <span>pausa</span>
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#lugares">Descobrir</a>
          <a href="#sobre">Nossa ideia</a>
        </nav>
        <button
          className={`saved-link ${showFavorites ? 'is-active' : ''}`}
          onClick={() => {
            setShowFavorites((current) => !current)
            document.getElementById('lugares')?.scrollIntoView({ behavior: 'smooth' })
          }}
          type="button"
          aria-pressed={showFavorites}
        >
          <span aria-hidden="true">♡</span>
          <span>{showFavorites ? 'Ver todos' : 'Salvos'}</span>
          {favorites.length > 0 && <span className="saved-count">{favorites.length}</span>}
        </button>
      </header>

      <section className="hero">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-content">
          <span className="eyebrow"><span className="eyebrow-dot" /> SEU GUIA DE CAFÉS EM SP</span>
          <h1>Um café bom<br />muda o <em>dia.</em></h1>
          <p>Achados especiais pra tomar um café, respirar<br className="desktop-break" /> fundo e curtir o caminho.</p>
          <a href="#lugares" className="hero-button">
            Encontrar meu próximo café <span aria-hidden="true">↘</span>
          </a>
          <span className="hero-note">Feito com carinho, um cafezinho por vez ☕</span>
        </div>
        <div className="hero-sticker" aria-label="Um bom dia começa com café">
          <span>UM BOM DIA</span>
          <span>COMEÇA COM</span>
          <strong>café ☕</strong>
        </div>
        <div className="hero-caption"><span /> PINHEIROS, SÃO PAULO</div>
      </section>

      <section className="discovery" id="lugares">
        <div className="section-heading">
          <div>
            <span className="eyebrow section-eyebrow">A GENTE JÁ FOI POR VOCÊ</span>
            <h2>{showFavorites ? 'Seus lugares salvos' : 'Cafés que dão vontade de ficar'}</h2>
            <p className="section-description">
              {showFavorites
                ? 'Seus cantinhos favoritos, todos juntinhos.'
                : 'Sem pressa, sem lista infinita. Só lugares que valem a pausa.'}
            </p>
          </div>
          <button className="surprise-button" onClick={pickSurprise} type="button">
            <span aria-hidden="true">✳</span> Me surpreenda
          </button>
        </div>

        <div className="explore-tools">
          <label className="search-box">
            <SearchIcon />
            <input
              aria-label="Buscar café ou bairro"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por café ou bairro..."
              value={query}
            />
            <span className="search-shortcut">⌘ K</span>
          </label>
          <div className="filter-list" aria-label="Filtrar cafés">
            {filters.map((filter) => (
              <button
                className={`filter-chip ${activeFilter === filter ? 'selected' : ''}`}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
                aria-pressed={activeFilter === filter}
              >
                {filter === 'Pra trabalhar' && '💻 '}
                {filter === 'Com pets' && '🐾 '}
                {filter === 'Ao ar livre' && '🌿 '}
                {filter}
              </button>
            ))}
          </div>
        </div>

        {visibleCafes.length > 0 ? (
          <div className="cafe-grid">
            {visibleCafes.map((cafe) => {
              const isFavorite = favorites.includes(cafe.id)
              return (
                <article
                  className={`cafe-card ${surprise === cafe.id ? 'surprise-card' : ''}`}
                  id={`cafe-${cafe.id}`}
                  key={cafe.id}
                >
                  <div className="card-image-wrap">
                    <img src={cafe.image} alt={`Interior acolhedor do ${cafe.name}`} />
                    <span className="neighborhood">{cafe.neighborhood}</span>
                    <button
                      aria-label={isFavorite ? `Remover ${cafe.name} dos salvos` : `Salvar ${cafe.name}`}
                      aria-pressed={isFavorite}
                      className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite(cafe.id)}
                      type="button"
                    >
                      {isFavorite ? '♥' : '♡'}
                    </button>
                    {surprise === cafe.id && <span className="surprise-label">✨ Seu próximo café</span>}
                  </div>
                  <div className="card-content">
                    <div className="card-title-row">
                      <h3>{cafe.name}</h3>
                      <span className="rating"><span>★</span> {cafe.rating}</span>
                    </div>
                    <p className="card-description">{cafe.description}</p>
                    <div className="card-footer">
                      <div className="tag-list">
                        {cafe.tags.map((tag) => <span className="cafe-tag" key={tag}>{tag}</span>)}
                      </div>
                      <span className="price">{cafe.price}</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="empty-state">
            <span>☕</span>
            <h3>{showFavorites && favorites.length === 0 ? 'Ainda não tem nenhum salvo' : 'Nenhum café por aqui'}</h3>
            <p>
              {showFavorites && favorites.length === 0
                ? 'Toque no coração de um café para guardar pra depois.'
                : 'Tente outra busca ou escolha um filtro diferente.'}
            </p>
            {showFavorites && favorites.length === 0 && (
              <button type="button" onClick={() => setShowFavorites(false)}>Descobrir cafés</button>
            )}
          </div>
        )}
      </section>

      <section className="closing-note" id="sobre">
        <span className="closing-icon">☕</span>
        <p>Às vezes, tudo o que a gente precisa é de<br /><em>uma mesa na janela e mais cinco minutinhos.</em></p>
        <span className="closing-signature">Com carinho, pausa.</span>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark">p.</span><span>pausa</span></a>
        <span>Um guia feito pra desacelerar.</span>
        <span>São Paulo, com ☕ e carinho.</span>
      </footer>
    </main>
  )
}

export default App
