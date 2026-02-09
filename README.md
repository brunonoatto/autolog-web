# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Icons

- https://fonts.google.com/icons

## CommitLint

- chore: Atualização de tarefas que não ocasionam alteração no código de produção, mas mudanças de ferramentas, mudanças de configuração e bibliotecas.
- feat: São adições de novas funcionalidades ou de quaisquer outras novas implantações ao código.
- fix: Essencialmente definem o tratamento de correções de bugs.
- refactor: Utilizado em quaisquer mudanças que sejam executados no código, porém não alterem a funcionalidade final da tarefa impactada.
- docs: Inclusão ou alteração somente de arquivos de documentação.
- perf: Uma alteração de código que melhora o desempenho.
- style: Alterações referentes a formatações na apresentação do código que não afetam o significado do código, como por exemplo: espaço em branco, formatação, ponto e vírgula ausente etc.
- test: Adicionando testes ausentes ou corrigindo testes existentes nos processos de testes automatizados (TDD).
- build: Alterações que afetam o sistema de construção ou dependências externas (escopos de exemplo: gulp, broccoli, npm).
- ci: Mudanças em nossos arquivos e scripts de configuração de CI (exemplo de escopos: Travis, Circle, BrowserStack, SauceLabs).
- env: Utilizado na descrição de modificações ou adições em arquivos de configuração em processos e métodos de integração contínua (CI), como parâmetros em arquivos de configuração de containers.

## 🚀 Fluxo de Deploy (CI/CD)

A aplicação utiliza um pipeline de integração e entrega contínua (CI/CD) automatizado via **GitHub Actions** e **AWS**, garantindo que o código em produção esteja sempre sincronizado com a branch principal de forma performática.

### Arquitetura de Implantação

O fluxo de atualização automática é estruturado da seguinte forma:

1.  **Gatilho (Trigger)**: Sempre que um `push` ou `merge` é realizado na branch `main`, o GitHub Actions inicia o workflow.
2.  **Build de Produção**: O ambiente é preparado com Node.js para instalar dependências e executar o comando de build. Esta etapa gera os arquivos estáticos otimizados (HTML, CSS e JS).
3.  **Distribuição (Amazon S3)**: Os arquivos resultantes são enviados para um bucket no **Amazon S3**. O processo utiliza o comando `sync`, que compara os arquivos locais com os remotos e atualiza apenas o que foi alterado, economizando tempo e banda.
4.  **Invalidação de Cache (Amazon CloudFront)**: Após o upload, o pipeline dispara uma invalidação de cache global (`/*`). Isso garante que o usuário final receba a nova versão imediatamente, ignorando os arquivos antigos armazenados nos servidores de borda (Edge Locations) da AWS.

### Tecnologias e Serviços

- **GitHub Actions**: Orquestrador do pipeline de CI/CD.
- **Amazon S3**: Hospedagem de objetos e site estático.
- **Amazon CloudFront**: CDN (Content Delivery Network) para baixa latência e HTTPS.
- **Node.js**: Engine para processamento e build do frontend.

---

## 🛠 Manutenção e Diagnóstico

Caso precise intervir manualmente ou validar o estado do deploy, siga as instruções abaixo:

### Invalidação Manual via CLI

Se os arquivos foram atualizados mas o navegador ainda exibe a versão antiga, force uma invalidação:

```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```
