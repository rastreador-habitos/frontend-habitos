const BASE_URL = 'http://localhost:8082';

// Pega o token salvo no login
function getToken() {
    return localStorage.getItem('token');
}

// Monta os headers padrão com token
function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': getToken()
    };
}

// Função central — todos os requests passam por aqui
async function request(method, path, body = null, auth = true) {
    const options = {
        method,
        headers: auth ? authHeaders() : { 'Content-Type': 'application/json' }
    };

    if (body) options.body = JSON.stringify(body);

    const res = await fetch(BASE_URL + path, options);

    if (!res.ok) {
        const erro = await res.text();
        throw new Error(erro || `Erro ${res.status}`);
    }

    const text = await res.text();
    if (!text) return null;

    try {
        return JSON.parse(text);
    } catch {
        return text; // token do login chega como string pura
    }
}

// ─── Usuário ────────────────────────────────────────────────

export async function login(email, senha) {
    const token = await request('POST', '/usuario/login', { email, senha }, false);
    localStorage.setItem('token', token);
}

export async function cadastrarUsuario(nome, email, senha) {
    await request('POST', '/usuario', { nome, email, senha }, false);
    await login(email, senha);
}

// ─── Hábitos ────────────────────────────────────────────────

// Retorna: [{ habitosID, nome, descricao, status }]
export async function listarHabitos() {
    return request('GET', '/habitos/listar');
}

export async function cadastrarHabito(nome, descricao) {
    return request('POST', '/habitos', { nome, descricao });
}

export async function alterarHabito(id, nome, descricao) {
    return request('PUT', `/habitos/${id}`, { nome, descricao });
}

export async function deletarHabito(id) {
    return request('DELETE', `/habitos/${id}`);
}

// ativo = true para ativar, false para desativar
export async function alterarStatus(id, ativo) {
    return request('PATCH', `/habitos/${id}?ativo=${ativo}`);
}

// Retorna o streak atual como número
export async function efetuarCheckin(id) {
    return request('POST', `/habitos/checkin?id=${id}`);
}

export async function buscarStreak(id) {
    return request('GET', `/habitos/streak?habitoId=${id}`);
}