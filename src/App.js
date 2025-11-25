import React, { useState, useEffect } from 'react';
import {
  MapPin, Calendar, Briefcase, Newspaper, LogIn,
  Menu, X, Search, ChevronRight, Trash2, Plus,
  Edit, User, CheckCircle, AlertCircle, LogOut
} from 'lucide-react';

// --- CONFIGURAÇÃO DA API ---
const API_BASE_URL = "http://localhost:3003";

// --- COMPONENTES DE UI ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "", type = "button" }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2";
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-100 text-red-600 hover:bg-red-200",
    outline: "border border-emerald-600 text-emerald-600 hover:bg-emerald-50"
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ label, required, ...props }) => (
  <div className="mb-3">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      required={required}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
      {...props}
    />
  </div>
);

const Textarea = ({ label, required, rows = 4, ...props }) => (
  <div className="mb-3">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <textarea
      required={required}
      rows={rows}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
      {...props}
    />
  </div>
);

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800"
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[color] || colors.gray}`}>
      {children}
    </span>
  );
};

const SectionWrapper = ({ children, className = "", background = "white" }) => {
  const backgrounds = {
    white: "bg-white",
    soft: "bg-gradient-to-br from-white via-emerald-50/60 to-white",
    dark: "bg-slate-900 text-white",
  };

  return (
    <section className={`${backgrounds[background]} rounded-3xl border border-white/50 shadow-[0_20px_70px_-40px_rgba(15,118,110,.7)] ${className}`}>
      {children}
    </section>
  );
};

const SectionHeader = ({ label, title, description, align = "center" }) => (
  <div className={`space-y-3 ${align === "center" ? "text-center" : "text-left"}`}>
    {label && (
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
        <span className="w-6 h-px bg-emerald-400" />
        {label}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
      {title?.split?.(" ").map((word, idx) => (
        <span key={`${word}-${idx}`} className={idx % 2 === 1 ? "text-emerald-600" : ""}>
          {word}{" "}
        </span>
      ))}
    </h2>
    {description && <p className="text-gray-500 max-w-2xl mx-auto">{description}</p>}
  </div>
);

const StatCard = ({ label, value, description }) => (
  <div className="p-5 rounded-2xl bg-white/70 backdrop-blur border border-gray-100 shadow-sm shadow-emerald-100 flex flex-col gap-1">
    <span className="text-xs uppercase tracking-[0.3em] text-gray-400">{label}</span>
    <strong className="text-2xl md:text-3xl font-semibold text-emerald-700">{value}</strong>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const TimelineDot = () => (
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
  </span>
);

// --- PÁGINAS PÚBLICAS ---

const Home = ({ setPage }) => (
  <div className="space-y-16 animate-fade-in">
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-900 to-emerald-600 text-white">
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(94,234,212,.45),_transparent_60%)]" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] p-10 lg:p-16">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.3em] text-emerald-50">
            Cuidado integral há mais de 70 anos
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            Saúde humanizada, tecnologia e impacto social para toda a região.
          </h1>
          <p className="text-lg text-emerald-50/80 max-w-3xl">
            A Fundação Guia conecta pacientes, colaboradores e parceiros em torno de jornadas de saúde
            mais simples, transparentes e acolhedoras.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setPage('eventos')} className="bg-white text-emerald-900 hover:bg-emerald-50">
              <Calendar size={18} /> Ver agenda completa
            </Button>
            <Button variant="outline" onClick={() => setPage('vagas')} className="border-white/50 text-white hover:bg-white/10">
              <Briefcase size={18} /> Faça parte do time
            </Button>
            <Button variant="outline" onClick={() => setPage('localizacao')} className="border-white/50 text-white hover:bg-white/10">
              <MapPin size={18} /> Encontrar setores
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <StatCard label="Atendimentos/ano" value="+420 mil" description="Consultas, exames e cirurgias realizados com foco em alta complexidade." />
          <StatCard label="Profissionais" value="2.300+" description="Especialistas dedicados e multiplataforma em saúde, ensino e pesquisa." />
          <StatCard label="Investimento social" value="R$ 58 mi" description="Projetos em oncologia, prevenção e tecnologia aplicada à saúde." />
        </div>
      </div>
    </section>

    <SectionWrapper background="soft" className="p-8 space-y-10">
      <SectionHeader
        label="Experiências integradas"
        title="Um ecossistema completo para acolher, informar e engajar"
        description="Explore as principais jornadas disponibilizadas online e escolha como quer se conectar com a Fundação Guia."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Newspaper size={24} />,
            title: "Últimas notícias",
            description: "Transparência em tempo real sobre conquistas clínicas e investimentos.",
            action: () => setPage('noticias'),
            color: "from-blue-500/20 to-blue-500/5",
          },
          {
            icon: <Calendar size={24} />,
            title: "Eventos e campanhas",
            description: "Agenda integrada com ações de prevenção, formação e bem-estar.",
            action: () => setPage('eventos'),
            color: "from-purple-500/20 to-purple-500/5",
          },
          {
            icon: <Briefcase size={24} />,
            title: "Carreiras e bolsas",
            description: "Oportunidades para profissionais e trainees com programas contínuos.",
            action: () => setPage('vagas'),
            color: "from-orange-500/20 to-orange-500/5",
          },
        ].map((card) => (
          <button
            key={card.title}
            onClick={card.action}
            className="text-left group"
          >
            <div className={`w-full h-full rounded-2xl border border-white bg-gradient-to-br ${card.color} p-6 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg`}>
              <div className="inline-flex items-center justify-center rounded-full bg-white/80 p-3 text-emerald-600 shadow">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mt-5 text-gray-900">{card.title}</h3>
              <p className="text-gray-500 mt-2">{card.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                Explorar
                <ChevronRight size={16} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </SectionWrapper>
  </div>
);

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/noticias?recentes=10`)
      .then(res => res.json())
      .then(data => {
        if (data.codigoStatus === 200 && data.body?.noticias) {
          setNews(data.body.noticias);
        }
      })
      .catch(err => console.error("Erro ao buscar noticias", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-10">Carregando notícias...</div>;

  return (
    <SectionWrapper className="p-8 space-y-8">
      <SectionHeader
        label="Transparência"
        title="Notícias recentes e comunicados oficiais"
        description="Acompanhe entregas assistenciais, novos investimentos e histórias que movimentam a instituição."
        align="left"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item, idx) => {
          const cover = (() => {
            if (!item.imagens) return null;
            try {
              return item.imagens.includes('[') ? JSON.parse(item.imagens)[0] : item.imagens;
            } catch {
              return item.imagens;
            }
          })();

          return (
            <article key={item.id || idx} className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
              {cover && cover.includes("http") && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cover}
                    alt={item.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-emerald-700 shadow">Atualização</span>
                </div>
              )}
              <div className="flex flex-col flex-1 p-6 gap-4">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={14} />
                    {item.data_publicacao
                      ? new Date(Number(item.data_publicacao)).toLocaleDateString()
                      : 'Data não informada'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.titulo}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-3">{item.resumo}</p>
                </div>
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.replace(/"|\[|\]/g, '').split(',').map((tag, i) => (
                      <Badge key={`${tag}-${i}`} color="green">{tag.replace(/\\/g, '').trim()}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/vagas`)
      .then(res => res.json())
      .then(data => {
        if (data.codigoStatus === 200 && data.body?.vagas) {
          setJobs(data.body.vagas);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter(j =>
    j.cargo?.toLowerCase().includes(filter.toLowerCase()) ||
    j.cidade?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <SectionWrapper className="p-8 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <SectionHeader
          label="Carreiras"
          title="Vagas disponíveis e programas em andamento"
          description="Transparência total sobre oportunidades, benefícios e quantidade de posições por área."
          align="left"
        />
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar por cargo ou cidade"
            className="w-full pl-12 pr-4 py-3 border rounded-2xl bg-white focus:ring-2 focus:ring-emerald-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando vagas...</p>
      ) : (
        <div className="grid gap-5">
          {filteredJobs.map((vaga, idx) => (
            <div
              key={vaga.id || idx}
              className="rounded-3xl border border-gray-100 bg-white p-6 lg:p-8 shadow hover:shadow-emerald-100 transition"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400">
                    <TimelineDot /> {vaga.modalidade || 'Modalidade não informada'}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{vaga.cargo}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={16} /> {vaga.cidade}
                    </span>
                    {vaga.quantidade && (
                      <span className="inline-flex items-center gap-1">
                        <User size={16} /> {vaga.quantidade} vaga(s)
                      </span>
                    )}
                    {vaga.tipo_vinculo && (
                      <span className="inline-flex items-center gap-1">
                        <Briefcase size={16} /> {vaga.tipo_vinculo}
                      </span>
                    )}
                    {vaga.data_publicacao && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={16} /> {new Date(Number(vaga.data_publicacao)).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={vaga.como_se_inscrever || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-white font-semibold hover:bg-emerald-700 transition"
                >
                  Quero participar
                </a>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {vaga.requisitos && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <p className="text-xs uppercase tracking-[0.3em] font-semibold text-emerald-600">Requisitos</p>
                    <p className="text-sm text-emerald-900 mt-2 whitespace-pre-line">{vaga.requisitos.replace(/[\[\]"]/g, ' ').trim()}</p>
                  </div>
                )}
                {vaga.beneficios && (
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gray-500">Benefícios</p>
                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{vaga.beneficios.replace(/[\[\]"]/g, ' ').trim()}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && <p className="text-gray-500">Nenhuma vaga encontrada.</p>}
        </div>
      )}
    </SectionWrapper>
  );
};

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/eventos`)
      .then(res => res.json())
      .then(data => {
        if (data.codigoStatus === 200 && data.body?.eventos) {
          setEvents(data.body.eventos);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SectionWrapper className="p-8 space-y-8">
      <SectionHeader
        label="Agenda"
        title="Próximos eventos e campanhas especiais"
        description="Programação viva para a comunidade médica, pacientes e familiares."
        align="left"
      />
      {loading ? (
        <p className="text-gray-500">Carregando eventos...</p>
      ) : (
        <div className="space-y-6 relative">
          <div className="absolute left-3 top-0 bottom-0 hidden md:block w-px bg-gradient-to-b from-emerald-200 via-emerald-100 to-transparent" />
          {events.map((evt, idx) => (
            <div key={evt.id || idx} className="relative md:pl-12">
              <div className="hidden md:flex absolute left-0 top-6 -translate-x-1/2">
                <TimelineDot />
              </div>
              <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">{evt.status || 'programado'}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Calendar size={16} />
                    {evt.data_inicio ? new Date(Number(evt.data_inicio)).toLocaleDateString() : '-'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <ChevronRight size={14} />
                    {evt.data_fim ? new Date(Number(evt.data_fim)).toLocaleDateString() : '-'}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{evt.titulo}</h3>
                  <p className="text-gray-600 mt-2">{evt.descricao}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    Público: <strong className="text-gray-800">{evt.publico_alvo || 'Geral'}</strong>
                  </span>
                  {evt.quantidade && (
                    <span className="inline-flex items-center gap-1">
                      Vagas: <strong className="text-gray-800">{evt.quantidade}</strong>
                    </span>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
};

const LocationSearch = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("setor");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if(!query) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/localizacao?${type}=${query}`)
      .then(res => res.json())
      .then(data => {
        if(data.codigoStatus === 200) {
          setResults(data.body);
        } else {
          setResults(null);
        }
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  };

  return (
    <SectionWrapper className="p-8 space-y-8">
      <SectionHeader
        label="Mapa vivo"
        title="Localize setores, exames e blocos em segundos"
        description="Use filtros inteligentes para encontrar serviços, rotas e informações estruturais do hospital."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-emerald-50/60 to-white p-6 space-y-4">
          <p className="text-sm text-gray-500">Escolha o tipo de pesquisa</p>
          <div className="flex flex-col md:flex-row gap-3">
            <select
              className="p-3 border rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="setor">Setor</option>
              <option value="bloco">Bloco</option>
              <option value="exame">Exame</option>
            </select>
            <input
              type="text"
              className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              placeholder={`Digite o nome do ${type}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={loading} className="rounded-xl px-5">
              {loading ? 'Buscando...' : <><Search size={18}/> Buscar</>}
            </Button>
          </div>
          <p className="text-xs text-gray-500">Pesquise por blocos específicos, exames (ex: "ressonância") ou setores assistenciais.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Dica rápida</h4>
          <p className="text-gray-500 text-sm">
            Todas as localizações utilizam um padrão único de identificação para facilitar o deslocamento interno. Anote o código exibido no resultado para agilizar o atendimento.
          </p>
          <div className="rounded-xl border border-dashed border-emerald-200 p-4 text-sm text-emerald-700 bg-emerald-50">
            <strong>ID do local</strong> identifica o bloco, setor ou sala no qual o exame é executado. Informe esse código na recepção para receber orientações prioritárias.
          </div>
        </div>
      </div>

      {results && (
        <div className="space-y-6 animate-fade-in">
          {(results.exames && (Array.isArray(results.exames) ? results.exames : [results.exames])).map((exame, i) => (
            <div key={`ex-${i}`} className="rounded-2xl border border-blue-100 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-500 mb-2">Exame</p>
              <h4 className="text-xl font-semibold text-blue-900">{exame.nome}</h4>
              <p className="text-sm text-gray-600 mt-2">{exame.descricao}</p>
              <p className="text-xs mt-4 text-gray-400">Local ID: {exame.local_id}</p>
            </div>
          ))}

          {(results.setor && (Array.isArray(results.setor) ? results.setor : [results.setor])).map((setor, i) => (
            <div key={`st-${i}`} className="rounded-2xl border border-emerald-100 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 mb-2">Setor</p>
              <h4 className="text-xl font-semibold text-emerald-900">{setor.nome}</h4>
              <div className="text-sm mt-3 text-gray-600 space-y-1">
                <p><strong>Andar:</strong> {setor.andar}</p>
                <p>{setor.descricao}</p>
              </div>
            </div>
          ))}

          {(results.bloco && (Array.isArray(results.bloco) ? results.bloco : [results.bloco])).map((bloco, i) => (
            <div key={`bl-${i}`} className="rounded-2xl border border-orange-100 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-orange-500 mb-2">Bloco</p>
              <h4 className="text-xl font-semibold text-orange-900">{bloco.nome}</h4>
              <p className="text-sm text-gray-600 mt-2">{bloco.descricao}</p>
            </div>
          ))}

          {Object.keys(results).length === 0 && (
            <p className="text-center text-gray-500">Nenhum resultado encontrado.</p>
          )}
        </div>
      )}
    </SectionWrapper>
  );
};

// --- ADMINISTRAÇÃO ---

const Login = ({ setToken, setPage }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/loginAdmin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const data = await res.json();

      if (data.codigoStatus === 200 && data.mensagem.includes("Token Gerado:")) {
        const tokenRaw = data.mensagem.split("Token Gerado: ")[1].trim();
        const finalToken = tokenRaw.startsWith('Bearer') ? tokenRaw : `Bearer ${tokenRaw}`;
        setToken(finalToken);
        setPage('admin');
      } else {
        setError("Credenciais inválidas.");
      }
    } catch (err) {
      setError("Erro ao conectar com servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700">
            <LogIn size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Acesso Administrativo</h2>
          <p className="text-sm text-gray-500">Gerencie notícias, vagas e exames.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="E-mail"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            required
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2"><AlertCircle size={16}/> {error}</div>}
          <Button type="submit" className="w-full justify-center" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

const AdminDashboard = ({ token, setToken, setPage }) => {
  const [activeTab, setActiveTab] = useState("noticias");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingItem, setEditingItem] = useState(null);

  const endpoints = {
    noticias: { get: '/noticias?recentes=100', delete: '/adminAcao/noticias', post: '/adminAcao/noticias', patch: '/adminAcao/noticias', key: 'noticias' },
    vagas: { get: '/vagas', delete: '/adminAcao/vagas', post: '/adminAcao/vagas', patch: '/adminAcao/vagas', key: 'vagas' },
    eventos: { get: '/eventos', delete: '/adminAcao/eventos', post: '/adminAcao/eventos', patch: '/adminAcao/eventos', key: 'eventos' },
    exames: { get: '/localizacao?bloco=bloco 2', delete: '/adminAcao/exame', post: '/adminAcao/exame', patch: '/adminAcao/exame', key: 'exames' }
  };

  const dateFieldsByTab = {
    noticias: ['data_publicacao'],
    vagas: ['data_publicacao'],
    eventos: ['data_inicio', 'data_fim']
  };

  const numberFieldsByTab = {
    vagas: ['quantidade'],
    eventos: ['quantidade']
  };

  const requiredFieldsByTab = {
    noticias: ['noticia_id_fundacao', 'titulo', 'conteudo', 'data_publicacao'],
    vagas: ['cargo', 'modalidade', 'cidade', 'data_publicacao', 'tipo_vinculo', 'quantidade'],
    eventos: ['titulo', 'data_inicio', 'data_fim', 'status', 'quantidade'],
    exames: ['nome', 'descricao', 'local_id']
  };

  const formatDateForInput = (value) => {
    if (value === undefined || value === null || value === '') return '';
    const parsed = new Date(Number(value));
    if (isNaN(parsed.getTime())) return '';
    return parsed.toISOString().split('T')[0];
  };

  const openForm = (item = null) => {
    if (item) {
      const mapped = { ...item };
      (dateFieldsByTab[activeTab] || []).forEach(field => {
        if (mapped[field]) {
          mapped[field] = formatDateForInput(mapped[field]);
        }
      });
      setFormData(mapped);
      setEditingItem(item);
    } else {
      setFormData({});
      setEditingItem(null);
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({});
    setEditingItem(null);
  };

  const fetchItems = () => {
    setLoading(true);
    const config = endpoints[activeTab];

    fetch(`${API_BASE_URL}${config.get}`)
      .then(res => res.json())
      .then(data => {
        if (data.body && data.body[config.key]) {
          setItems(data.body[config.key]);
        } else {
          setItems([]);
        }
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
    setShowForm(false);
    setFormData({});
    setEditingItem(null);
  }, [activeTab]);

  const handleDelete = async (id) => {
    if(!window.confirm("Tem certeza que deseja excluir?")) return;
    const config = endpoints[activeTab];

    try {
      await fetch(`${API_BASE_URL}${config.delete}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });
      fetchItems();
    } catch (err) {
      alert("Erro ao deletar");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const config = endpoints[activeTab];

    // Clonando e tratando dados antes do envio
    if (formData.noticia_id_fundacao){
      formData.noticia_id_fundacao = formData.noticia_id_fundacao.toString();    
    }

    const payload = { ...formData };

    const requiredFields = requiredFieldsByTab[activeTab] || [];

    if (editingItem) {
      requiredFields.forEach((field) => {
        const currentValue = payload[field];
        if (
          (currentValue === undefined || currentValue === null || currentValue === '') &&
          editingItem[field] !== undefined &&
          editingItem[field] !== null &&
          editingItem[field] !== ''
        ) {
          payload[field] = editingItem[field];
        }
      });
    }

    // Campos que são datas (formato string 'YYYY-MM-DD') e devem virar Timestamp (número)
    const dateFields = ['data_publicacao', 'data_inicio', 'data_fim'];

    dateFields.forEach(field => {
      if (payload[field]) {
        const dateObj = new Date(`${payload[field]}T12:00:00`);
        if (!isNaN(dateObj.getTime())) {
          payload[field] = dateObj.getTime();
        }
      }
    });

    (numberFieldsByTab[activeTab] || []).forEach(field => {
      if (payload[field] !== undefined && payload[field] !== '') {
        payload[field] = Number(payload[field]);
      }
    });

    const missingRequired = requiredFields.filter(field => {
      const value = payload[field];
      return value === undefined || value === null || value === '';
    });

    if (missingRequired.length > 0) {
      alert(`Preencha os campos obrigatórios: ${missingRequired.join(', ')}`);
      return;
    }

    try {
      const isEditing = Boolean(editingItem);
      const url = isEditing ? `${API_BASE_URL}${config.patch}/${editingItem.id}` : `${API_BASE_URL}${config.post}`;
      const res = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.mensagem);
      }

      closeForm();
      fetchItems();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleEdit = (item) => {
    openForm(item);
  };

  const renderForm = () => {
    switch(activeTab) {
      case 'noticias':
        return (
          <>
            <Input name="titulo" label="Título" value={formData.titulo ?? ''} onChange={handleInputChange} required />
            <Textarea name="resumo" label="Resumo" value={formData.resumo ?? ''} onChange={handleInputChange} rows={3} />
            <Textarea name="conteudo" label="Conteúdo" value={formData.conteudo ?? ''} onChange={handleInputChange} rows={5} required />
            {/* Campo agora obrigatório */}
            <Input name="noticia_id_fundacao" label="ID Legado" value={formData.noticia_id_fundacao ?? ''} onChange={handleInputChange} required />
            {/* Input de data que será convertido em timestamp */}
            <Input name="data_publicacao" type="date" label="Data de Publicação" value={formData.data_publicacao ?? ''} onChange={handleInputChange} required />
            <Input name="tags" label="Tags (separadas por ';')" value={formData.tags ?? ''} onChange={handleInputChange} />
            <Input name="imagens" label="URL Imagem (Principal)" value={formData.imagens ?? ''} onChange={handleInputChange} />
            <Input name="outros_links" label="Outros Links" value={formData.outros_links ?? ''} onChange={handleInputChange} />
          </>
        );
      case 'vagas':
        return (
          <>
            <Input name="cargo" label="Cargo" value={formData.cargo ?? ''} onChange={handleInputChange} required />
            <Input name="cidade" label="Cidade" value={formData.cidade ?? ''} onChange={handleInputChange} required />
            <Input name="modalidade" label="Modalidade (Presencial/Remoto)" value={formData.modalidade ?? ''} onChange={handleInputChange} required />
            <Input name="horas" label="Carga horária" value={formData.horas ?? ''} onChange={handleInputChange} />
            <Textarea name="principais_atividades" label="Principais Atividades" value={formData.principais_atividades ?? ''} onChange={handleInputChange} rows={4} />
            <Textarea name="beneficios" label="Benefícios" value={formData.beneficios ?? ''} onChange={handleInputChange} rows={4} />
            <Textarea name="requisitos" label="Requisitos" value={formData.requisitos ?? ''} onChange={handleInputChange} rows={4} />
            <Input name="tipo_vinculo" label="Tipo de Vínculo" value={formData.tipo_vinculo ?? ''} onChange={handleInputChange} required />
            <Input name="quantidade" type="number" label="Qtd Vagas" value={formData.quantidade ?? ''} onChange={handleInputChange} required />
            <Input name="data_publicacao" type="date" label="Data de Publicação" value={formData.data_publicacao ?? ''} onChange={handleInputChange} required/>
            <Input name="como_se_inscrever" label="Link/Email Inscrição" value={formData.como_se_inscrever ?? ''} onChange={handleInputChange} />
          </>
        );
      case 'eventos':
        return (
          <>
            <Input name="titulo" label="Título" value={formData.titulo ?? ''} onChange={handleInputChange} required />
            <Textarea name="descricao" label="Descrição" value={formData.descricao ?? ''} onChange={handleInputChange} rows={4} required />
            <Input name="data_inicio" type="date" label="Data Início" value={formData.data_inicio ?? ''} onChange={handleInputChange} required />
            <Input name="data_fim" type="date" label="Data Fim" value={formData.data_fim ?? ''} onChange={handleInputChange} required />
            <Input name="status" label="Status (ex: programado)" value={formData.status ?? ''} onChange={handleInputChange} required />
            <Input name="publico_alvo" label="Público Alvo" value={formData.publico_alvo ?? ''} onChange={handleInputChange} />
            <Input name="quantidade" type="number" label="Quantidade" value={formData.quantidade ?? ''} onChange={handleInputChange} />
          </>
        );
      case 'exames':
        return (
          <>
            <Input name="nome" label="Nome do Exame" value={formData.nome ?? ''} onChange={handleInputChange} required />
            <Textarea name="descricao" label="Descrição" value={formData.descricao ?? ''} onChange={handleInputChange} rows={3} required />
            <Input name="local_id" label="ID do Local (loc-xxx)" value={formData.local_id ?? ''} onChange={handleInputChange} required />
          </>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 -m-4 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
            <p className="text-gray-500 text-sm">Olá, Admin! Você está autenticado.</p>
          </div>
          <Button variant="danger" onClick={() => { setToken(null); setPage('home'); }}>
            <LogOut size={18}/> Sair
          </Button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {Object.keys(endpoints).map(key => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${activeTab === key ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold capitalize">Gerenciar {activeTab}</h2>
            <Button onClick={() => openForm()}><Plus size={18}/> Novo Item</Button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-lg p-6 relative bg-white overflow-y-auto max-h-[90vh]">
                <button onClick={closeForm} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24}/></button>
                <h3 className="text-lg font-bold mb-4 capitalize">{editingItem ? 'Editar' : 'Novo'} {activeTab.slice(0, -1)}</h3>
                <form onSubmit={handleSave}>
                  {renderForm()}
                  <div className="mt-6 flex gap-2">
                    <Button type="submit" className="flex-1 justify-center">Salvar</Button>
                    <Button type="button" variant="secondary" onClick={closeForm}>Cancelar</Button>
                  </div>
                </form>
              </Card>
            </div>
          )}

          {loading ? <div className="text-center py-10 text-gray-500">Carregando...</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Título/Nome</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-500 font-mono truncate max-w-[100px]">{item.id}</td>
                      <td className="p-4 font-medium">{item.titulo || item.cargo || item.nome}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-emerald-500 hover:text-emerald-700 p-2"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Deletar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && <tr><td colSpan="3" className="p-8 text-center text-gray-400">Nenhum item encontrado.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [page, setPage] = useState('home');
  const [token, setToken] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0,0);
    setMobileMenuOpen(false);
  }, [page]);

  const navItems = [
    { id: 'home', label: 'Início', icon: null },
    { id: 'noticias', label: 'Notícias', icon: Newspaper },
    { id: 'vagas', label: 'Vagas', icon: Briefcase },
    { id: 'eventos', label: 'Eventos', icon: Calendar },
    { id: 'localizacao', label: 'Localização', icon: MapPin },
  ];

  const renderPage = () => {
    if (page === 'admin') {
      if (!token) return <Login setToken={setToken} setPage={setPage} />;
      return <AdminDashboard token={token} setToken={setToken} setPage={setPage} />;
    }

    switch(page) {
      case 'home': return <Home setPage={setPage} />;
      case 'noticias': return <NewsList />;
      case 'vagas': return <JobsList />;
      case 'eventos': return <EventsList />;
      case 'localizacao': return <LocationSearch />;
      case 'login': return <Login setToken={setToken} setPage={setPage} />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      {page !== 'admin' && (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div
              className="flex items-center gap-2 text-emerald-700 font-bold text-xl cursor-pointer"
              onClick={() => setPage('home')}
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <CheckCircle size={20} />
              </div>
              Fundação Guia
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`text-sm font-medium transition-colors ${page === item.id ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setPage(token ? 'admin' : 'login')}
                className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <User size={14} /> {token ? 'Admin' : 'Área Admin'}
              </button>
            </nav>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-lg p-4 flex flex-col gap-4 animate-fade-in">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`text-left p-2 rounded-lg ${page === item.id ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600'}`}
                >
                  {item.icon && <item.icon size={16} className="inline mr-2"/>} {item.label}
                </button>
              ))}
              <button
                onClick={() => setPage(token ? 'admin' : 'login')}
                className="p-2 text-left text-gray-600 border-t mt-2 pt-4"
              >
                Acesso Administrativo
              </button>
            </div>
          )}
        </header>
      )}

      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      {page !== 'admin' && (
        <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-gray-400 py-14 mt-12">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white text-xl font-semibold">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <CheckCircle size={20} />
                </div>
                Fundação Guia
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Hospital filantrópico referência em alta complexidade, prevenção e ensino. Cuidado integral e acolhedor para toda a região.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm">
                {['noticias','eventos','vagas','localizacao'].map(item => (
                  <li key={item}>
                    <button onClick={() => setPage(item)} className="hover:text-white transition">{item.charAt(0).toUpperCase() + item.slice(1)}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <p className="text-sm">Av. Cristiano Ferreira Varella, 15</p>
              <p className="text-sm">Muriaé - MG</p>
              <p className="text-sm mt-2">contato@fundacaoguia.org.br</p>
              <p className="text-sm mt-1">+55 (32) 3729-7000</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Receba novidades</h4>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition">
                  Quero receber comunicados
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
