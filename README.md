# OmniMonaco

**OmniMonaco** é uma extensão para navegador (Chrome/Edge/Brave) que atua como um copiloto inteligente, gerando código diretamente em editores online baseados no **Monaco Editor**.

Diferente de outros copilotos, o OmniMonaco é flexível: você pode configurar sua própria URL de API (OpenAI, Anthropic, OpenRouter, ou sua própria infraestrutura) e modelo preferido.

![Dashboard](https://raw.githubusercontent.com/placeholder/omnimonaco.png) _(Adicione um screenshot aqui)_

## ✨ Funcionalidades

- 🚀 **Injeção Direta:** Gera código e o insere diretamente na posição do cursor.
- 🛠️ **Configuração Flexível:** Suporte para múltiplos modelos e APIs compatíveis com o padrão OpenAI.
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
1. Insira a **URL da API** (ex: `https://api.openai.com/v1/chat/completions`).
2. Escolha ou digite o **Modelo** (ex: `gpt-4o-mini`).
3. Insira sua **API Key**.
4. Defina a **Temperatura** (recomendado: 0.1 para código).

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido com ❤️ para agilizar o desenvolvimento web.
