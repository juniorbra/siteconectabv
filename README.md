# Conecta Botvance - Site

Site do Conecta Botvance, um SaaS gratuito que oferece conectores inteligentes para fluxos do n8n.

## Implantação

Este projeto pode ser implantado de várias maneiras, dependendo do seu ambiente.

### Pré-requisitos

- Docker instalado
- Docker Hub conta (para publicar a imagem)
- Docker Swarm (para implantação em produção)
- Traefik (para roteamento e SSL)

### Publicação da Imagem no Docker Hub

1. Clone este repositório:
   ```
   git clone https://github.com/seu-usuario/siteconectabv.git
   cd siteconectabv
   ```

2. Faça login no Docker Hub:
   ```
   docker login
   ```

3. Use o script de publicação para construir e enviar a imagem:
   ```
   ./publish.sh
   ```
   
   Você também pode especificar uma tag:
   ```
   ./publish.sh v1.0
   ```

### Implantação com Docker Swarm e Traefik

Este projeto está configurado para ser implantado em um cluster Docker Swarm com Traefik como proxy reverso.

1. Certifique-se de que seu cluster Swarm está configurado e Traefik está em execução

2. Implante o stack:
   ```
   docker stack deploy -c docker-compose.yml conectabotvance
   ```

3. O site estará disponível no domínio configurado (conecta.botvance.com.br)

### Implantação Local para Desenvolvimento

Para desenvolvimento local, você pode usar:

```
docker-compose up -d
```

E acessar o site em `http://localhost:80`

## Estrutura do Projeto

- `index.html`: Página principal do site
- `css/`: Arquivos de estilo CSS
- `js/`: Arquivos JavaScript
- `images/`: Imagens do site
- `Dockerfile`: Configuração para criar a imagem Docker
- `docker-compose.yml`: Configuração para orquestrar o contêiner

## Personalização e Atualização

Para personalizar o site, edite os arquivos HTML, CSS e JavaScript conforme necessário. Após fazer alterações, você precisará reconstruir a imagem Docker e reiniciar o contêiner:

```
docker-compose build
docker-compose up -d
```

## Otimizações

Este projeto inclui várias otimizações para melhorar o desempenho:

1. **Compressão Gzip**: Arquivos são comprimidos antes de serem enviados ao navegador
2. **Cache de Arquivos Estáticos**: Imagens, CSS e JavaScript são configurados com cabeçalhos de cache apropriados
3. **Configuração Nginx Otimizada**: O arquivo nginx.conf personalizado inclui várias otimizações para servir arquivos estáticos

## Implantação em Produção

Para implantar em um servidor de produção:

1. Transfira todos os arquivos para o servidor
2. Certifique-se de que Docker e Docker Compose estão instalados
3. Execute `docker-compose up -d`
4. Configure seu domínio para apontar para o servidor

Para usar HTTPS, você pode adicionar um proxy reverso como Traefik ou modificar o docker-compose.yml para incluir certificados SSL.
