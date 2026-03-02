// background.js - Updated instructions
const systemPrompt = `Você é um assistente de autocompletar e geração de código (LLM atuando como OmniMonaco) especializado em auxiliar desenvolvedores dentro de editores online baseados em Monaco Editor.

### REGRAS DE OURO:
1. RETORNE APENAS CÓDIGO. NUNCA inclua saudações, explicações, markdown (\`\`\`javascript), backticks ou textos extras.
2. NÃO EXPLIQUE O CÓDIGO.
3. MANTENHA A INDENTAÇÃO E CONTEXTO, mas **comece o bloco sempre na coluna 0** (sem espaços no início das linhas iniciais que não sejam parte da estrutura do código). Isso evita o efeito de "escada" nos editores.
4. **NUNCA** adicione recuo (indentação) extra ao bloco inteiro.

### CONHECIMENTO ESPECÍFICO: Mad.Builder Framework (REST API)
Ao gerar código PHP para APIs, siga estas diretrizes:
- Rotas: Registre em 'app/routes/api.php' usando 'Router::get()', 'Router::post()', etc.
- Parâmetros: Use 'Request::get($chave)' ou capture via '{nome}' na rota.
- CRUD: Utilize 'ApiResourceController' definindo '$model' e '$database'.
- Respostas: Retorne JSON via '(new Response())->json([...])'.
- Configuração do Controller: Use '$primaryKey', '$perPage', '$indexFields', '$showFields', '$hiddenFields', '$sortable', '$filterable', e '$requiredFields'.
- Mestre-Detalhe: Configure '$detailModel', '$detailForeignKey' e '$detailProperty'.
- Middlewares: Use 'BasicAuthMiddleware' ou 'BearerAuthMiddleware' para autenticação.
- Transformers: Use para formatar dados antes do retorno.
- Hooks: Use para lógica customizada em momentos do ciclo de vida.`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'generate_code') {
        handleGenerateCode(request.prompt)
            .then(result => sendResponse(result))
            .catch(error => sendResponse({ success: false, error: error.message }));

        return true; // Keep message channel open for async response
    }
});

async function handleGenerateCode(userPrompt) {
    const settings = await new Promise((resolve) => {
        chrome.storage.sync.get({
            enabled: true,
            apiUrl: '',
            model: 'openai/gpt-4.1-mini',
            apiKey: '',
            temperature: '0.1'
        }, resolve);
    });

    if (!settings.enabled) throw new Error("A extensão OmniMonaco está desativada.");
    if (!settings.apiUrl) throw new Error("URL da API não configurada.");

    const payload = {
        model: settings.model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        temperature: parseFloat(settings.temperature) || 0.1,
        max_tokens: 1500,
        stream: false // Explicitly disable streaming
    };

    const headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
    };

    if (settings.apiKey) {
        headers["Authorization"] = `Bearer ${settings.apiKey}`;
    }

    try {
        const response = await fetch(settings.apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Erro na API (${response.status}): ${errText}`);
        }

        const data = await response.json();

        let generatedCode = "";
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            generatedCode = data.choices[0].message.content;
        } else {
            generatedCode = data.text || data.content || JSON.stringify(data);
        }

        // Clean up markdown markers
        generatedCode = generatedCode.replace(/^```[\w]*\s*/g, '').replace(/\s*```$/g, '');

        return { success: true, code: generatedCode };

    } catch (error) {
        console.error("OmniMonaco Fetch Error:", error);
        return { success: false, error: error.message };
    }
}
