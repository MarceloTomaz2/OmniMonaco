# OmniMonaco

**OmniMonaco** é uma extensão para navegador (Chrome/Edge/Brave) que atua como um copiloto inteligente, gerando código diretamente em editores online baseados no **Monaco Editor**.

Diferente de outros copilotos fechados, o OmniMonaco é universal: ele foi projetado para trabalhar em perfeita sintonia com o **[OmniRoute](https://github.com/diegosouzapw/OmniRoute)** (um gateway de IA de código aberto que fornece um endpoint único compatível com OpenAI para mais de 36 provedores).

Além disso, o OmniMonaco suporta **qualquer serviço de LLM** compatível com a API da OpenAI (como OpenAI, Anthropic via proxy, OpenRouter, Groq ou sua própria infraestrutura local como Ollama ou vLLM).

![Dashboard](https://raw.githubusercontent.com/placeholder/omnimonaco.png) _(Adicione um screenshot aqui)_

## ✨ Funcionalidades

- 🚀 **Injeção Direta:** Gera código e o insere diretamente na posição do cursor.
- 🛠️ **Configuração Universal:** Funciona com qualquer API que siga o padrão OpenAI.
- 🔗 **Integração com OmniRoute:** Use o OmniRoute como gateway para centralizar múltiplos modelos e roteamento inteligente.
- 🎨 **Minimalista:** UI flutuante que não interfere no seu fluxo de trabalho.
- 🧠 **Context Awareness:** Otimizado para entender e respeitar a indentação do editor.
- 📦 **Pronto para Frameworks:** Já vem com diretrizes específicas para o framework **Mad.Builder** (REST APIs).

## ⌨️ Atalhos

- **Ctrl + U**: Abre a interface flutuante do OmniMonaco sobre o editor.
- **Enter**: Envia a instrução.
- **Esc**: Fecha a interface.

## 🚀 Instalação (Desenvolvedor)

Como esta extensão ainda não está na Web Store, você pode instalá-la localmente:

1. Faça o download ou clone este repositório.
2. Abra o Chrome e vá para `chrome://extensions/`.
3. Ative o **Modo do Desenvolvedor** (canto superior direito).
4. Clique em **Carregar sem compactação** (Load unpacked).
5. Selecione a pasta deste projeto.

## ⚙️ Configuração

Após instalar, clique no ícone da extensão e vá em **Configurações**:

1. **URL da API**:
   - Para usar com **OmniRoute**: `http://localhost:20128/v1/chat/completions` (ou sua URL hospedada).
   - Para outros serviços: Insira o endpoint compatível com OpenAI (ex: `https://api.openai.com/v1/chat/completions`).
2. **Modelo**: Escolha o modelo desejado (ex: `gpt-4o-mini`, `claude-3-5-sonnet`, `llama-3.1-405b`).
3. **API Key**: Sua chave de acesso.
4. **Temperatura**: Recomendado `0.1` para maior precisão em código.

## 🙏 Agradecimentos

Um agradecimento especial ao projeto **OmniRoute**, de **[@diegosouzapw](https://github.com/diegosouzapw)** — o projeto original que inspirou este desenvolvimento. O OmniMonaco se baseia nessa fundação para trazer agilidade e inteligência artificial diretamente para editores baseados no Monaco Editor.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido com ❤️ para agilizar o desenvolvimento web.
