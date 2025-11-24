import React, { useState, useEffect } from 'react';
import {
  MapPin, Calendar, Briefcase, Newspaper, LogIn,
  Menu, X, Search, ChevronRight, Trash2, Plus,
  Edit, User, CheckCircle, AlertCircle, LogOut
} from 'lucide-react';

// --- CONFIGURAÇÃO DA API ---
const API_BASE_URL = "https://api-fundacao-guia-1.onrender.com";

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

// --- PÁGINAS PÚBLICAS ---

const Home = ({ setPage }) => (
  <div className="space-y-8 animate-fade-in">
    <section className="relative h-96 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-600 flex items-center justify-center overflow-hidden text-white shadow-xl">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-center p-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Fundação Guia</h1>
        <p className="text-lg md:text-xl mb-8 text-emerald-50">Excelência em saúde e cuidado humanizado.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => setPage('vagas')} variant="secondary">Ver Vagas</Button>
          <Button onClick={() => setPage('localizacao')} variant="primary" className="bg-white text-emerald-800 hover:bg-gray-100">
            <MapPin size={18} /> Localizar Setor
          </Button>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div onClick={() => setPage('noticias')} className="cursor-pointer group">
        <Card className="h-full p-6 border-t-4 border-t-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Newspaper size={24} />
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Últimas Notícias</h3>
          <p className="text-gray-500">Fique por dentro das novidades, conquistas e comunicados da Fundação.</p>
        </Card>
      </div>

      <div onClick={() => setPage('eventos')} className="cursor-pointer group">
        <Card className="h-full p-6 border-t-4 border-t-purple-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Calendar size={24} />
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-purple-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Agenda de Eventos</h3>
          <p className="text-gray-500">Confira nossa programação de eventos, palestras e campanhas de saúde.</p>
        </Card>
      </div>

      <div onClick={() => setPage('vagas')} className="cursor-pointer group">
        <Card className="h-full p-6 border-t-4 border-t-orange-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-100 rounded-lg text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Briefcase size={24} />
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-orange-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Trabalhe Conosco</h3>
          <p className="text-gray-500">Veja as vagas disponíveis e faça parte da nossa equipe.</p>
        </Card>
      </div>
    </div>
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
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Notícias Recentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item, idx) => (
          <Card key={item.id || idx} className="flex flex-col h-full">
            {item.imagens && item.imagens.includes("http") && (
               <div className="h-48 bg-gray-200 overflow-hidden">
                 <img
                    src={item.imagens.includes('[') ? JSON.parse(item.imagens)[0] : item.imagens}
                    alt={item.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.style.display = 'none'}
                 />
               </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <div className="mb-2 text-sm text-gray-500">
                {/* Verifica se é timestamp (num) ou string e formata */}
                {item.data_publicacao
                  ? new Date(Number(item.data_publicacao)).toLocaleDateString()
                  : 'Data não informada'}
              </div>
              <h3 className="text-xl font-bold mb-2 text-emerald-900">{item.titulo}</h3>
              <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">{item.resumo}</p>
              <div className="mt-auto">
                {item.tags && <div className="flex flex-wrap gap-2">
                  {item.tags.replace(/"|\[|\]/g, '').split(',').map((tag, i) => (
                    <Badge key={i} color="blue">{tag.replace(/\\/g, '')}</Badge>
                  ))}
                </div>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
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
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Vagas Disponíveis</h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Filtrar por cargo..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {loading ? <p>Carregando vagas...</p> : (
        <div className="grid gap-4">
          {filteredJobs.map((vaga, idx) => (
            <Card key={vaga.id || idx} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-emerald-800">{vaga.cargo}</h3>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><MapPin size={14}/> {vaga.cidade}</span>
                  <span className="flex items-center gap-1"><Briefcase size={14}/> {vaga.modalidade}</span>
                  <span className="flex items-center gap-1"><User size={14}/> {vaga.quantidade} vaga(s)</span>
                  {vaga.data_publicacao && (
                    <span className="flex items-center gap-1 opacity-75">
                      <Calendar size={14}/> {new Date(Number(vaga.data_publicacao)).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <a
                href={vaga.como_se_inscrever}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium whitespace-nowrap"
              >
                Candidatar-se
              </a>
            </Card>
          ))}
          {filteredJobs.length === 0 && <p className="text-gray-500">Nenhuma vaga encontrada.</p>}
        </div>
      )}
    </div>
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
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Próximos Eventos</h2>
      {loading ? <p>Carregando eventos...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt, idx) => (
            <Card key={evt.id || idx} className="p-0">
              <div className="bg-purple-600 p-4 text-white">
                <div className="text-sm opacity-80 mb-1">{evt.status?.toUpperCase()}</div>
                <h3 className="text-xl font-bold">{evt.titulo}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{evt.descricao}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Início:</span>
                    <span className="font-medium text-gray-800">
                        {/* Trata timestamp */}
                        {evt.data_inicio ? new Date(Number(evt.data_inicio)).toLocaleDateString() : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fim:</span>
                    <span className="font-medium text-gray-800">
                        {evt.data_fim ? new Date(Number(evt.data_fim)).toLocaleDateString() : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Público:</span>
                    <span className="font-medium text-gray-800">{evt.publico_alvo}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
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
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Localização</h2>
        <p className="text-gray-500">Encontre setores, blocos ou onde realizar seus exames.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="p-2 border rounded-lg bg-gray-50 outline-none focus:border-emerald-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="setor">Setor</option>
            <option value="bloco">Bloco</option>
            <option value="exame">Exame</option>
          </select>
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg outline-none focus:border-emerald-500"
            placeholder={`Digite o nome do ${type}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Buscando...' : <><Search size={18}/> Buscar</>}
          </Button>
        </div>
      </Card>

      {results && (
        <div className="space-y-4 animate-fade-in">
          {/* Renderiza Exames */}
          {(results.exames && (Array.isArray(results.exames) ? results.exames : [results.exames])).map((exame, i) => (
             <Card key={`ex-${i}`} className="p-4 border-l-4 border-l-blue-500">
                <h4 className="font-bold text-blue-800">Exame: {exame.nome}</h4>
                <p className="text-sm text-gray-600">{exame.descricao}</p>
                <p className="text-xs mt-2 text-gray-400">Local ID: {exame.local_id}</p>
             </Card>
          ))}

          {/* Renderiza Setores */}
          {(results.setor && (Array.isArray(results.setor) ? results.setor : [results.setor])).map((setor, i) => (
             <Card key={`st-${i}`} className="p-4 border-l-4 border-l-emerald-500">
                <h4 className="font-bold text-emerald-800">Setor: {setor.nome}</h4>
                <div className="text-sm mt-1">
                  <p><strong>Andar:</strong> {setor.andar}</p>
                  <p className="text-gray-600">{setor.descricao}</p>
                </div>
             </Card>
          ))}

           {/* Renderiza Blocos */}
           {(results.bloco && (Array.isArray(results.bloco) ? results.bloco : [results.bloco])).map((bloco, i) => (
             <Card key={`bl-${i}`} className="p-4 border-l-4 border-l-orange-500">
                <h4 className="font-bold text-orange-800">Bloco: {bloco.nome}</h4>
                <p className="text-sm text-gray-600">{bloco.descricao}</p>
             </Card>
          ))}

          {Object.keys(results).length === 0 && <p className="text-center text-gray-500">Nenhum resultado encontrado.</p>}
        </div>
      )}
    </div>
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

  const endpoints = {
    noticias: { get: '/noticias?recentes=100', delete: '/adminAcao/noticias', post: '/adminAcao/noticias', key: 'noticias' },
    vagas: { get: '/vagas', delete: '/adminAcao/vagas', post: '/adminAcao/vagas', key: 'vagas' },
    eventos: { get: '/eventos', delete: '/adminAcao/eventos', post: '/adminAcao/eventos', key: 'eventos' },
    exames: { get: '/localizacao?exame=todos', delete: '/adminAcao/exame', post: '/adminAcao/exame', key: 'exames' }
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
    const payload = { ...formData };

    // Campos que são datas (formato string 'YYYY-MM-DD') e devem virar Timestamp (número)
    const dateFields = ['data_publicacao', 'data_inicio', 'data_fim'];

    dateFields.forEach(field => {
        if (payload[field]) {
            // Cria uma data ao meio-dia para evitar problemas de timezone retornando o dia anterior
            const dateObj = new Date(payload[field] + 'T12:00:00');
            if (!isNaN(dateObj.getTime())) {
                payload[field] = dateObj.getTime();
            }
        }
    });

    try {
      const res = await fetch(`${API_BASE_URL}${config.post}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Falha na requisição');

      setShowForm(false);
      fetchItems();
    } catch (err) {
      alert("Erro ao salvar. Verifique os campos.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const renderForm = () => {
    switch(activeTab) {
      case 'noticias':
        return (
          <>
            <Input name="titulo" label="Título" onChange={handleInputChange} required />
            <Input name="resumo" label="Resumo" onChange={handleInputChange} />
            <div className="mb-3"><label className="block text-sm mb-1">Conteúdo</label><textarea name="conteudo" className="w-full border p-2 rounded" rows={4} onChange={handleInputChange}></textarea></div>
            {/* Campo agora obrigatório */}
            <Input name="noticia_id_fundacao" label="ID Legado" onChange={handleInputChange} required />
            {/* Input de data que será convertido em timestamp */}
            <Input name="data_publicacao" type="date" label="Data de Publicação" onChange={handleInputChange} />
            <Input name="tags" label="Tags (separadas por vírgula)" onChange={handleInputChange} />
            <Input name="imagens" label="URL Imagem (Principal)" onChange={handleInputChange} />
          </>
        );
      case 'vagas':
        return (
          <>
            <Input name="cargo" label="Cargo" onChange={handleInputChange} required />
            <Input name="cidade" label="Cidade" onChange={handleInputChange} required />
            <Input name="modalidade" label="Modalidade (Presencial/Remoto)" onChange={handleInputChange} />
            <Input name="quantidade" type="number" label="Qtd Vagas" onChange={handleInputChange} required />
            <Input name="data_publicacao" type="date" label="Data de Publicação" onChange={handleInputChange} required/>
            <Input name="requisitos" label="Requisitos" onChange={handleInputChange} />
            <Input name="como_se_inscrever" label="Link/Email Inscrição" onChange={handleInputChange} />
          </>
        );
      case 'eventos':
        return (
          <>
            <Input name="titulo" label="Título" onChange={handleInputChange} required />
            <Input name="descricao" label="Descrição" onChange={handleInputChange} />
            <Input name="data_inicio" type="date" label="Data Início" onChange={handleInputChange} required />
            <Input name="data_fim" type="date" label="Data Fim" onChange={handleInputChange} required />
            <Input name="status" label="Status (ex: programado)" onChange={handleInputChange} required />
            <Input name="publico_alvo" label="Público Alvo" onChange={handleInputChange} />
            <Input name="quantidade" type="number" label="Quantidade" onChange={handleInputChange} />
          </>
        );
      case 'exames':
        return (
          <>
            <Input name="nome" label="Nome do Exame" onChange={handleInputChange} required />
            <Input name="descricao" label="Descrição" onChange={handleInputChange} />
            <Input name="local_id" label="ID do Local (loc-xxx)" onChange={handleInputChange} required />
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
            <Button onClick={() => setShowForm(true)}><Plus size={18}/> Novo Item</Button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-lg p-6 relative bg-white overflow-y-auto max-h-[90vh]">
                <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24}/></button>
                <h3 className="text-lg font-bold mb-4 capitalize">Novo {activeTab.slice(0, -1)}</h3>
                <form onSubmit={handleSave}>
                  {renderForm()}
                  <div className="mt-6 flex gap-2">
                    <Button type="submit" className="flex-1 justify-center">Salvar</Button>
                    <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
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
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Fundação Guia</h3>
              <p className="text-sm">Excelência, carinho e inovação no tratamento de saúde.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setPage('vagas')} className="hover:text-white">Trabalhe Conosco</button></li>
                <li><button onClick={() => setPage('localizacao')} className="hover:text-white">Onde Estamos</button></li>
                <li><button onClick={() => setPage('login')} className="hover:text-white">Área do Colaborador</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Contato</h4>
              <p className="text-sm">Muriaé - MG</p>
              <p className="text-sm mt-2">contato@fundacaoguia.org.br</p>
            </div>
            <div>
              <div className="p-4 bg-gray-800 rounded-lg text-xs">
                <p>"Não quero ser morto caso você chegue à super inteligência."</p>
                <p className="mt-2 text-gray-500">- Luiz (Usuário VIP)</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
